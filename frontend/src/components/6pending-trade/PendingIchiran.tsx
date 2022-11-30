import React from 'react';
import { BaseLayout } from 'layouts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector, useQuery } from 'utils/hooks';
import {
  //showallTradePost,
  ShowAllTradePostRequest,
  showoneTradePost,
  getOtherUser,
} from 'store/thunks/trade_post';
import { useHistory } from 'react-router-dom';
import Ichiran from 'templates/ichiran/Ichiran';
import { pendingTradePost } from 'store/thunks/trade_post2';

const ConfirmedIchiran = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userId = localStorage.getItem('userId');
  const query = { page: useQuery().get('page') || '' };
  const posts = useAppSelector((state) => state.tradePost.data);
  const count = useAppSelector((state) => state.tradePost.meta.last_page);
  const myUser = useAppSelector((state) => state.auth.user);
  const currentPage = useAppSelector(
    (state) => state.tradePost.meta.current_page
  );
  useEffect(() => {
    const request: ShowAllTradePostRequest = {
      userId: userId,
      page: query.page,
    };
    dispatch(pendingTradePost(request));
  }, [dispatch, query.page, userId]);

  //戻る
  const onClickBack = () => {
    history.push(`/users/${userId}/top`);
  };

  //ページネーション
  const handleChange = (_e: React.ChangeEvent<unknown>, page: number) =>
    history.push(`?page=${String(page)}`);

  //「詳細」ボタン押下時に投稿に紐づく画像をとってから、遷移する。
  const onGetPhotos = async (index: number, id: string, userId: string) => {
    await dispatch(showoneTradePost(id)); //画像
    await dispatch(getOtherUser(userId));
    history.push(`/pending-detail/${id}`);
  };

  //アイコン押下時
  const onClickIcon = async (id: string) => {
    await dispatch(getOtherUser(id));
    history.push(`/other-user/${id}`);
  };

  return (
    <BaseLayout subtitle="Album">
      <Ichiran
        posts={posts}
        other_user={myUser}
        title2={'参加申請中のトレード'}
        count={count}
        currentPage={currentPage}
        onClickIcon={onClickIcon}
        onGetPhotos={onGetPhotos}
        handleChange={handleChange}
        onClickBack={onClickBack}
      />
    </BaseLayout>
  );
};

export default ConfirmedIchiran;

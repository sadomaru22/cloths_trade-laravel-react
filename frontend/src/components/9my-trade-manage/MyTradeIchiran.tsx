import React from 'react'
import Ichiran from 'templates/ichiran/Ichiran'
import { useEffect, useState } from "react";
import {
   useAppDispatch,
   useAppSelector,
 } from 'utils/hooks';
import { useParams } from 'react-router-dom';
import { showallTradePost, ShowAllTradePostRequest } from 'store/thunks/trade_post';

//一覧画面
const MyTradeIchiran = () => {
   const dispatch = useAppDispatch();
   //const params = useParams<{ userId: string }>();
   const params = useParams();
   const userId = useAppSelector((state) => state.auth.user?.id);
   const data = useAppSelector((state) => state.tradePost.data);  //ここからmapなどで展開、かずぶん。
   useEffect(() =>{
      const request: ShowAllTradePostRequest = {userId}
      dispatch(showallTradePost(request));
   }, []);
   return (
      <Ichiran 
      url={"mytrade-detail"}
      pageDescription={"自分が開催予定のトレード一覧"}
      />
   )
}

export default MyTradeIchiran

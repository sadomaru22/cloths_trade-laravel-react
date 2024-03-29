import { Fragment } from 'react';

import { useHistory } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  Folder as FolderIcon,
  ExitToApp as ExitToAppIcon,
  PersonAdd as PersonAddIcon,
  PersonAddOutlined as PersonAddOutlinedIcon,
  LockOpen as LockOpenIcon,
  AccountCircle as AccountCircleIcon,
} from '@material-ui/icons';

import { GUEST_EMAIL, GUEST_PASSWORD } from 'config/app';
import { makeEmail } from 'utils/generator';
import { useAppSelector, useAppDispatch } from 'utils/hooks';
import { createUser, signInWithEmail, signOutFromAPI } from 'store/thunks/auth';

const SideMenu = () => {
  const history = useHistory();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const dispatch = useAppDispatch();

  //userIdある(=ログイン状態)であればTOPページとログアウト
  const menuItem = userId
    ? ({
        boards: 'TOPページに戻る',
        logout: 'ログアウト',
      } as const)
    : ({
        register: '登録',
        login: 'ログイン',
        guestRegister: 'ゲストとして登録',
        guestLogin: 'ゲストログイン',
      } as const);

  const renderIcon = (key: keyof typeof menuItem) => {
    if (key === 'boards') return <FolderIcon />;
    if (key === 'logout') return <ExitToAppIcon />;

    if (key === 'register') return <PersonAddIcon />;
    if (key === 'login') return <LockOpenIcon />;
    if (key === 'guestRegister') return <PersonAddOutlinedIcon />;
    if (key === 'guestLogin') return <AccountCircleIcon />;
  };

  const handleClick = (key: keyof typeof menuItem) => () => {
    switch (key) {
      case 'boards':
        history.push(`/users/${userId}/top`);
        break;
      case 'logout':
        dispatch(signOutFromAPI());
        break;

      case 'register':
        history.push('register');
        break;
      case 'login':
        history.push('login');
        break;
      case 'guestRegister':
        history.push('/register'); // `EmailVerification`を表示するため
        dispatch(
          createUser({
            email: makeEmail(),
            password: GUEST_PASSWORD,
            password_confirmation: GUEST_PASSWORD,
          })
        );
        break;
      case 'guestLogin':
        dispatch(
          signInWithEmail({ email: GUEST_EMAIL, password: GUEST_PASSWORD })
        );
        break;
    }
  };

  return (
    <Fragment>
      {(Object.keys(menuItem) as (keyof typeof menuItem)[]).map((key) => (
        <ListItem key={key} button onClick={handleClick(key)}>
          <ListItemIcon>{renderIcon(key)}</ListItemIcon>
          <ListItemText primary={menuItem[key]} />
        </ListItem>
      ))}
    </Fragment>
  );
};

export default SideMenu;

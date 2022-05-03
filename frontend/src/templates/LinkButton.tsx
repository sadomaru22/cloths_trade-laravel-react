import { Link as RouterLink } from 'react-router-dom';

// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import { ButtonProps, ButtonTypeMap } from '@material-ui/core';
import React from 'react';
import {Button, ButtonProps, ButtonTypeMap, createStyles, makeStyles, Theme} from '@mui/material';
//import Button from '@material-ui/core';  //JSX 要素型 'Button' にはコンストラクトも呼び出しシグネチャも含まれていません。

import { styled } from "@mui/material/styles";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     contained: {
//       textDecoration: 'none',
//       '&:hover': { textDecoration: 'none' },
//     },
//     containedPrimary: {
//       '&:hover': { color: theme.palette.primary.contrastText },
//     },
//     containedSecondary: {
//       '&:hover': { color: theme.palette.secondary.contrastText },
//     },
//   })
// );

const CustomButton = styled(Button)(({ theme }) => ({
    contained: {
      textDecoration: 'none',
      '&:hover': { textDecoration: 'none' },
    },
    containedPrimary: {
      '&:hover': { color: theme.palette.primary.contrastText },
    },
    containedSecondary: {
      '&:hover': { color: theme.palette.secondary.contrastText },
    },
 }));

type LinkButtonProps = {
  to: string;
} & ButtonProps<ButtonTypeMap<{}, 'a'>['defaultComponent']>;

const LinkButton = (props: LinkButtonProps) => {
  const { to, classes, ...buttonProps } = props;
  const defaultClasses = CustomButton;

  return (
    <Button
      classes={{ ...defaultClasses, ...classes }}
      variant='contained'
      color='primary'
      component={RouterLink}
      to={to}
      {...buttonProps}
    />
  );
};

export default LinkButton;
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import {Button, ButtonProps, ButtonTypeMap } from '@mui/material';

import { styled } from "@mui/material/styles";

//Topや④他のユーザ画面で使う用の、文字が多くても幅を固定する用のLinkButton

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
  to: any;
} & ButtonProps<ButtonTypeMap<{}, 'a'>['defaultComponent']>;

const LinkButton2 = (props: LinkButtonProps) => {
  const { to, classes, ...buttonProps } = props;
  const defaultClasses = CustomButton;

  return (
    <Button
      sx={{ width: '19rem', height: '25rem' }}
      classes={{ ...defaultClasses, ...classes }}
      variant='contained'
      color='primary'
      component={RouterLink}
      to={to}
      {...buttonProps}
    />
  );
};

export default LinkButton2;
import { Fragment } from 'react';


import { APP_NAME } from 'config/app';
// import { Header, Footer } from 'layouts';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
//import { Helmet } from 'react-helmet-async';

type BaseLayoutProps = { subtitle: string; withoutHeaders?: boolean };

const BaseLayout: React.FC<BaseLayoutProps> = (props) => (
  <Fragment>
    
      <title>
        {props.subtitle ? `${props.subtitle} | ${APP_NAME}` : APP_NAME}
      </title>
      
    {!props.withoutHeaders && <Header />}
    {props.children}
    {!props.withoutHeaders && <Footer />}
  </Fragment>
);

export default BaseLayout;
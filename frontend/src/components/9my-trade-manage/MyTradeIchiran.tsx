import React from 'react'
import Ichiran from 'templates/ichiran/Ichiran'
import { useEffect, useState } from "react";
import {
   useAppDispatch,
   useAppSelector,
 } from 'utils/hooks';


const MyTradeIchiran = () => {
   const dispatch = useAppDispatch();
   const userId = useAppSelector((state) => state.auth.user?.id);
   const data = useAppSelector((state) => state.app.notFound);
   useEffect(() =>{
   
   }, []);
   return (
      <Ichiran 
      url={"mytrade-detail"}
      pageDescription={"自分が開催予定のトレード一覧"}
      />
   )
}

export default MyTradeIchiran

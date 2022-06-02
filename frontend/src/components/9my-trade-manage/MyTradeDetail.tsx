import { Grid, Typography } from '@mui/material'
import { BaseLayout } from 'layouts'
import React from 'react'
import { LinkButton } from 'templates'
import Detail from 'templates/detail/Detail'

const MyTradeDetail = () => {
   return (
      <BaseLayout subtitle="my-detail">
         <Typography sx={{ marginTop: 10 }}/>
         <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'center' }}>
         <Grid item><LinkButton size="large" to={"/sanka-ichiran"}>参加者一覧</LinkButton></Grid>
         <Grid item><LinkButton size="large" to={"/mytrade-juri"}>参加申請受理</LinkButton></Grid>
         <Grid item><LinkButton size="large" to={"/mytrade-edit"}>投稿の編集</LinkButton></Grid>
         </Grid>
         <Detail/>
      </BaseLayout>
   )
}

export default MyTradeDetail

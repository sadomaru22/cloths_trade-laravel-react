import { AppBar, Avatar, Container, Divider, Link, List, ListItem, ListItemAvatar, ListItemText, Pagination, Toolbar, Typography} from '@mui/material'
import React, { useState } from 'react'
import { BaseLayout } from 'layouts';

//このページはトレード詳細ページの一部でもいいかも

const SankaIchiran = () => {
   // const [isPage, setIsPage] = useState(true)
   // if (rows.length<=4) {
   //    setIsPage(false)    //このままだと無限レンダリングになるため、asyncawitの処理内だけでstateを更新するようにする。
   // }
   return (
      <BaseLayout subtitle="sankaichiran">
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
             「タイトル」の参加者一覧
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 15 }} maxWidth="md">
      <List>
      {rows.map(example => (
       <Link color="inherit" sx={{textDecoration: "none"}}>
        <ListItem button>
         <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{width: '6rem', height: '6rem'}} />
        </ListItemAvatar>
         <ListItemText 
         primary={example.name}        
         primaryTypographyProps={{
         fontSize: 30,
         variant: 'body2',
         ml: 8
       }}/>
        </ListItem>
        <Divider variant="inset" component="li" sx={{marginBottom: 3}} />
       </Link>
      ))}
     </List>
  <Pagination count={5} sx={{ display: 'flex', justifyContent: 'center', mt: 5 }} />

     </Container>
     </BaseLayout>
   )
}


let rows = [     //ユーザ(トレード情報.id=ユーザ.参加トレード情報id 紐付け
   {
      id: 1,
      profPhoto: "url",
      name: "あああ1",
   },
   {
      id: 2,
      profPhoto: "url",
      name: "あああ2",
   },
   {
      id: 3,
      profPhoto: "url",
      name: "あああ3",
   },
   {
      id: 3,
      profPhoto: "url",
      name: "あああ4",
   }
]

export default SankaIchiran

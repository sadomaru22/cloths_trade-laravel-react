import { AppBar, Avatar, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Link, List, ListItem, ListItemAvatar, ListItemText, Pagination, Slide, Toolbar, Typography} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import { BaseLayout } from 'layouts';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LinkButton } from 'templates';

const style = {
   ml: 7
}

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
     children: React.ReactElement<any, any>;
   },
   ref: React.Ref<unknown>,
 ) {
   return <Slide direction="up" ref={ref} {...props} />;
 });


const SankaJuri = () => {
   const history = useHistory();
   const {state} = useLocation();
   const [open, setOpen] = React.useState(false);
   const handleClickOpen = () => {
      setOpen(true);
    };

   const handleClose = () => {
      setOpen(false);
    }; 

    const handleJuri = () => {
       //🌟ここに受理の処理を書く
       history.push('/top');
    }

    const handleGo = () => {
       //🌟ここに却下の処理をかく
      history.push('/top');
    }

   return (
      <BaseLayout subtitle="sankaichiran">
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
             「タイトル」の参加申請受理
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 15 }} maxWidth="md">
      <List>
      {rows.map(example => (
      <div>
        <ListItem>
         <Link href="/other-user" sx={{textDecoration: "none"}}>
            <ListItemAvatar>
               <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{width: '5rem', height: '5rem'}} />
            </ListItemAvatar>
         </Link>
         <Grid container>
               <Grid item>            
                  <ListItemText     
                  primaryTypographyProps={{
                  fontSize: 20,
                  variant: 'body2',
                  ml: 8
                  }}>{example.name} から参加申請が来ています。</ListItemText>
               </Grid>  
               <Grid item>
                  <Button sx={style} variant="contained"　onClick={handleJuri}>受理</Button>
               </Grid>
               <Grid item>
                  <Button sx={style} variant="contained" onClick={handleClickOpen}>却下</Button>
               </Grid>
         </Grid>
        </ListItem>
        <Divider variant="inset" component="li" sx={{marginBottom: 3}} />
      </div>
      ))}
     </List>
  <Pagination count={5} sx={{ display: 'flex', justifyContent: 'center', mt: 5 }} />
     </Container>
     
     <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      >
         <DialogTitle>{`参加申請を却下します。よろしいですか?`}</DialogTitle>
         <DialogContent/>
         <DialogActions>
            <Button onClick={handleGo}>はい</Button>
            <Button onClick={handleClose}>いいえ</Button>
         </DialogActions>
      </Dialog>
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

export default SankaJuri


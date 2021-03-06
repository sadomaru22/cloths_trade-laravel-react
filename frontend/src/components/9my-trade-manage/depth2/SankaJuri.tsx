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
       //๐ใใใซๅ็ใฎๅฆ็ใๆธใ
       history.push('/top');
    }

    const handleGo = () => {
       //๐ใใใซๅดไธใฎๅฆ็ใใใ
      history.push('/top');
    }

   return (
      <BaseLayout subtitle="sankaichiran">
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
             ใใฟใคใใซใใฎๅๅ ็ณ่ซๅ็
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
                  }}>{example.name} ใใๅๅ ็ณ่ซใๆฅใฆใใพใใ</ListItemText>
               </Grid>  
               <Grid item>
                  <Button sx={style} variant="contained"ใonClick={handleJuri}>ๅ็</Button>
               </Grid>
               <Grid item>
                  <Button sx={style} variant="contained" onClick={handleClickOpen}>ๅดไธ</Button>
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
         <DialogTitle>{`ๅๅ ็ณ่ซใๅดไธใใพใใใใใใใงใใ?`}</DialogTitle>
         <DialogContent/>
         <DialogActions>
            <Button onClick={handleGo}>ใฏใ</Button>
            <Button onClick={handleClose}>ใใใ</Button>
         </DialogActions>
      </Dialog>
     </BaseLayout>
   )
}


let rows = [     //ใฆใผใถ(ใใฌใผใๆๅ ฑ.id=ใฆใผใถ.ๅๅ ใใฌใผใๆๅ ฑid ็ดไปใ
   {
      id: 1,
      profPhoto: "url",
      name: "ใใใ1",
   },
   {
      id: 2,
      profPhoto: "url",
      name: "ใใใ2",
   },
   {
      id: 3,
      profPhoto: "url",
      name: "ใใใ3",
   },
   {
      id: 3,
      profPhoto: "url",
      name: "ใใใ4",
   }
]

export default SankaJuri


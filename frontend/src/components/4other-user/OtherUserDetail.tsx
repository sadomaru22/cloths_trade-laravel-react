import React from 'react'
import { BaseLayout } from 'layouts'
import Detail from 'templates/detail/Detail'
import { Button, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory, useLocation } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
     children: React.ReactElement<any, any>;
   },
   ref: React.Ref<unknown>,
 ) {
   return <Slide direction="up" ref={ref} {...props} />;
 });

const OtherUserDetail = () => {
   const history = useHistory();
   const {state} = useLocation();
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleGo = () => {
      history.push('/top');
    }
   
   return (
      <BaseLayout subtitle="other-user-detail">
      <Detail/>
      <Button variant="outlined" sx={{ display: 'flex', justifyContent: 'center' }} onClick={handleClickOpen}>参加申請</Button>

      <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      >
         <DialogTitle>{`参加申請を${state}さんに送ります。よろしいですか?`}</DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
               参加申請を送信すると、主催者に通知が行きます。主催者が申請を受理すると、参加が確定となります。
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>やっぱりやめる</Button>
            <Button onClick={handleGo}>申請する</Button>
         </DialogActions>
      </Dialog>
      </BaseLayout>

   )
}

export default OtherUserDetail

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

export default function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, open, onAgree } = props;

    const handleClose = () => {
        onClose();
    };
    const handleAgree = () => {
        onAgree();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{props.namePerson} is requesting to share video</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleAgree} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}

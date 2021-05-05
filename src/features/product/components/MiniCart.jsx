import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        position: 'absolute',
        top: '110%',
        right: '1%',
        width: '300px',
        padding: theme.spacing(2, 0),
        height: '60px',
        boxShadow: 'rgb(179 179 179) 1px 1px 15px',
        borderRadius: '6px', 
        alignItems: 'center',

        '&::before': {
            content: '',
            position: 'absolute',
            borderWidth: '20px 30px',
            borderStyle: 'solid',
            borderColor: 'transparent transparent rgb(255, 255, 255)',
            top: '-40px',
            right: 0
        },
    },

    message: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        color: 'rgb(51, 51, 51)',
        fontSize: '13px'
    },

    btn: {
        marginTop: theme.spacing(1),
        backgroundColor: 'rgb(255, 57, 69)',
        color: 'rgb(255, 255, 255)',
        justifyContent: 'center'
    }


}))

function MiniCart(props) {
    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <Box className={classes.message}>
                <CheckCircleOutline style={{color: 'rgb(76, 175, 80)'}} />
                <Typography>Thêm vào giỏ hàng thành công</Typography>
            </Box>
            <Button className={classes.btn}>Xem giỏ hàng và thanh toán</Button>
        </Paper>
    );
}

export default MiniCart;
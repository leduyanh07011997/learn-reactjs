import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import { removeCartItems } from './cartSlice';
import { useRouteMatch } from 'react-router';
import useProductDetail from 'features/product/hooks/useProductDetail';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
    }, 

    cartProduct: {
        display: 'flex',
        flexFlow: 'row nowrap',
        width: '100%'
    },

    cartProductImg: {
        width: '130px',
        marginRight: '20px'
    },

    cartProductContent: {
        display: 'flex',
        flexFlow: 'row nowrap',
        width: 'calc(100% - 150px)',
        justifyContent: 'space-between',
    },

    cartProductInfo: {
        width: '60%'
    },

    productName: {
        color: 'rgb(36, 36, 36)',
        fontWeight: 400,
        display: 'inline-block',
        textDecoration: 'none',
        '&:hover': {
            color: 'rgb(13, 92, 182)'
        }
    },

    shortDescription: {

    },

    removeItemBtn: {
        color: 'rgb(13, 92, 182)',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    },

    cartProductDetail: {
        display: 'flex',
        flexFlow: 'row nowrap',
    },

    cartProductPrice: {

    },

    cartProductQuantity: {

    }

}))


function CartInfo(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.cartItems)
    console.log(cartItems);

    const handleRemoveItem = (id) => {
        // const action = removeCartItems({
        //     idNeedToRemove
        // })
        // dispatch(action)
        console.log(id)
    }

    return (
        <Box className={classes.root}>
            <Grid container>
                {cartItems.map(item => (
                    <Grid item key={item.id} className={classes.cartProduct}>
                        <Box component="a">
                            <img
                                src={item.product.thumbnail ? `${STATIC_HOST}${item.product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER}
                                alt={item.name}
                                className={classes.cartProductImg}
                            >
                            </img>
                        </Box>
                        <Box className={classes.cartProductContent}>
                            <Box className={classes.cartProductInfo}>
                                <a href={`/products/${item.id}`} className={classes.productName}>{item.product.name}</a>
                                <p className={classes.shortDescription}>{item.product.shortDescription}</p>
                                <Button className={classes.removeItemBtn} onClick={handleRemoveItem(item.id)}>Xoá</Button>
                            </Box>
                            <Box className={classes.cartProductDetail}>
                                <Box className={classes.cartProductPrice}>Price</Box>
                                <Box className={classes.cartProductQuantity}>Quantity</Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default CartInfo;
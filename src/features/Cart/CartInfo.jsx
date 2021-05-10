import { Box, Grid, makeStyles } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import formatPrice from 'utils/common';
import { removeCartItems } from './cartSlice';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
    }, 

    cartProduct: {
        display: 'flex',
        flexFlow: 'row nowrap',
        width: '100%',
        padding: '20px 20px 10px',
        boxSizing: 'border-box',
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
        fontSize: '16px',
        fontWeight: '400',
        color: 'rgb(119, 119, 119)',
        lineHeight: '18px',
        height: '54px',
        display: 'block',
        display: '-webkit-box',
        overflow: 'hidden',
        "-webkit-box-orient": 'vertical',
        "-webkit-line-clamp": 3
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
        textAlign: 'right',
        marginRight: '25px'
    },

    productSalePrice: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '500',
        display: 'inline-block'
    },

    productOriginalPrice: {
        display: 'flex',
        fontSize: '14px',
        color: 'rgb(162, 162, 162)',
        '& > p': {
            margin: 0,
            textDecoration: 'line-through',
        }
    },

    promotionPercent: {
        marginLeft: '16px',
        paddingLeft: '10px',
        fontWeight: '500',
        color: 'rgb(36, 36, 36)',
        borderLeft: '1px solid rgb(36, 36, 36)'
    },

    cartProductQuantity: {

    },

    

}))


function CartInfo(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.cartItems)
    console.log(cartItems);

    const handleRemoveItem = (idNeedToRemove) => {
        const action = removeCartItems({
            idNeedToRemove
        })
        dispatch(action)
    }

    return (
        <Box className={classes.root}>
            <Grid container>
                {cartItems.length > 0 && cartItems.map(item => (
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
                                <span className={classes.removeItemBtn} onClick={() => handleRemoveItem(item.id)}>Xoá</span>
                            </Box>
                            <Box className={classes.cartProductDetail}>
                                <Box className={classes.cartProductPrice}>
                                    <p className={classes.productSalePrice}>{formatPrice(item.product.salePrice)}</p>
                                    {item.product.promotionPercent > 0 && (
                                        <p className={classes.productOriginalPrice}>
                                            <p>{formatPrice(item.product.originalPrice)}</p>
                                            <span className={classes.promotionPercent}>{`-${item.product.promotionPercent}%`}</span>
                                        </p>
                                    )}
                                </Box>
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
import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductDetail from '../components/ProductDetail';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ThumbnailProduct from '../components/ThumbnailProduct';
import useProductDetail from '../hooks/useProductDetail';
import { addToCart } from 'features/Cart/cartSlice'
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        paddingBottom: theme.spacing(3)
    },
    
    left: {
        padding: theme.spacing(1.5),
        width: '400px',
        borderRight: `1px solid ${theme.palette.grey[300]}` 
    },

    right: {
        padding: theme.spacing(1.5),
        flex: '1 1 0'
    },

    loading: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%'
    }
}))

function DetailPage(props) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const {
        params : {productId},
        url
    } = useRouteMatch()

    const {product, loading} = useProductDetail(productId)

    const handleAddToCartSubmit = ({quantity}) => {
        const action = addToCart({
            id: productId,
            product,
            quantity
        })
        dispatch(action)
    }

    return (
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            {loading 
                            ? <Box className={classes.loading}>
                                <LinearProgress />
                            </Box> 
                            : <ThumbnailProduct product={product} />}
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductDetail product={product} />
                            <AddToCartForm onSubmit={handleAddToCartSubmit} />
                        </Grid>
                    </Grid>
                </Paper>

                <ProductMenu />
                <Switch>
                    <Route exact  path={url}>
                        <ProductDescription product={product} />
                    </Route>
                    <Route exact  path={`${url}/additional`}>
                        <ProductAdditional product={product} />
                    </Route>
                    <Route exact  path={`${url}/reviews`}>
                        <ProductReviews product={product} />
                    </Route>
                </Switch>
            </Container>
        </Box>
    );
}

export default DetailPage;
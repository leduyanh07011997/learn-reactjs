import { Box, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {
    
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        listStyle: 'none',
        justifyContent: 'center',

        '& > li': {
            padding: theme.spacing(4,2),
            '& > a': {
                color: theme.palette.grey[700]
            },
            '& > a.active': {
                color: theme.palette.primary.main,
                textDecoration: 'underline'
            }
        },

    }
}))

function ProductMenu(props) {
    const classes = useStyles()
    const {url} = useRouteMatch()

    return (
        <Box component="ul" className={classes.root}>
            <li>
                <Link component={NavLink} to={url} exact>Description</Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/additional`} exact>Additional Information</Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/reviews`} exact>Reviews</Link>
            </li>
        </Box>
    );
}

export default ProductMenu;
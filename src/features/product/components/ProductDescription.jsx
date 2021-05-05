import React from 'react';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';

ProductDescription.propTypes = {
    product: PropTypes.object,
};

function ProductDescription({product = {}}) {
    const safeDescription = DOMPurify.sanitize(product.description)
    return (
        <Paper elevation={0} style={{padding: '15px'}}>
            <div dangerouslySetInnerHTML={{ __html: safeDescription}}>
            </div>
        </Paper>
    );
}

export default ProductDescription;

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles } from '@material-ui/core';
import QuantityField from 'components/form-control/QuantityField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
    submit: {
        marginTop: theme.spacing(1),
        width: '250px'
    }
}))

function AddToCartForm({onSubmit = null}) {
    const classes = useStyles()

    const schema = yup.object().shape({
        quantity: yup.number()
            .required('Please enter quantity.')
            .min(1,'Minimum is 1.')
            .typeError('Please enter a number'),
      });
    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        reValidateMode: 'onSubmit',
        resolver: yupResolver(schema)
    })
    const handleSubmit = async (values) => {
        if (onSubmit) {
          await onSubmit(values);  
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField name="quantity" label="Quantity" form={form} />

            <Button
                type="submit"
                className={classes.submit}
                variant="contained"
                color="primary"
                fullWidth
                size="large"
            >
                Add to cart
            </Button>
        </form>
    );
}

export default AddToCartForm;
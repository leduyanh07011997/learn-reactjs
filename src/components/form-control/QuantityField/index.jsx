import { Box, FormHelperText, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
    root: {},

    box: {
        display: 'flex',
        flexFlow: 'row nowrap',
        maxWidth: '200px',
        alignItems: 'center'
    }
}))

function QuantityField(props) {
    const classes = useStyles()
    const {form, name, label} = props;
    const {control, setValue} = form;


    return (
        <div>
            <Controller
                name={name}
                control={control}
                
                render={({field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, error }
                }) => (
                    <>
                        <FormControl error={isTouched && invalid} fullWidth size="small" margin="normal" variant="outlined">
                            <Typography>{label}</Typography>
                            <Box className={classes.box}>
                                <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}>
                                    <RemoveCircleOutline></RemoveCircleOutline>
                                </IconButton>
                                <OutlinedInput
                                    id={name}
                                    error={invalid}
                                    type="number"
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                                <IconButton>
                                    <AddCircleOutline onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}></AddCircleOutline>
                                </IconButton>
                            </Box>
                        </FormControl>
                        <FormHelperText error={invalid}>{error?.message}</FormHelperText>
                    </>
                )}  
            />
        </div>)
}

export default QuantityField;
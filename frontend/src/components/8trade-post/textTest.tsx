import { TextField } from '@material-ui/core';
import React from 'react'
import { ComponentPropsWithoutRef } from 'react';

type LabelProps = {
  id: string,
  label: string,
  helperText: any,
  error: any;
}

type ChildProps = ComponentPropsWithoutRef<'input'> & LabelProps;

const CustomTextField = React.forwardRef<HTMLInputElement, ChildProps>(
({ id, label, helperText, error, ...props }, ref) => {
  return (
    <TextField 
    variant='outlined'
    id={id}
    label={label}
    helperText={helperText}
    error={error}
    inputRef={ref}/>
  )
});

export default CustomTextField

import React from 'react'
import { Box, FormControl, FormHelperText, StandardTextFieldProps, TextField } from '@mui/material'
import { id } from 'date-fns/locale'
import { Control, Path, RegisterOptions, useController } from 'react-hook-form'

export const CustomTextField: React.VFC<CustomTextFieldProps> = (props) => {
   const { name, control, rules, ...textFieldProps } = props
   const {
     field: { ref, ...rest },
   } = useController({ name, control, rules })
 
   return (
     <TextField
       inputRef={ref}
       {...rest}
       {...textFieldProps}
     />
   )
 }
 
 interface CustomTextFieldProps extends StandardTextFieldProps {
   control: Control<any>
   name: Path<any>
   rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
 }

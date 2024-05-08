import { FormControl, TextField, TextFieldProps, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';



type Props = Omit<TextFieldProps, 'name' | 'label' | 'control'> & {
    name: string
    label: string
    control: any
    required?: boolean

}



const InputText = ({ required = true, name, label, control, ...other }: Props) => {
    return (
        <FormControl fullWidth>
            <Typography variant="body1" gutterBottom>{label}  {required && <span style={{ color: 'red' }}>*</span>}</Typography>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        id={`id-${name}`}
                        variant="outlined"
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        {...other}

                    />
                )}
            />
        </FormControl>
    )
}

export default InputText

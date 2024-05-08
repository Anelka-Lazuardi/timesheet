import { FormControl, FormHelperText, TextField, TextFieldProps, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';



type Props = Omit<TextFieldProps, 'name' | 'label' | 'control'> & {
    name: string
    label: string
    control: any
    required?: boolean


}



const InputDate = ({ required = true, name, label, control, ...other }: Props) => {
    return (
        <FormControl fullWidth >
            <Typography variant="body1" gutterBottom>{label} {required && <span style={{ color: 'red' }}>*</span>}  </Typography>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <DatePicker
                        format='DD MMM YYYY'
                        slotProps={{ textField: { placeholder: 'Pilih Tanggal', helperText: error?.message, error: !!error } }}
                        {...field}
                        value={field.value ? dayjs(field.value) : null}

                    />
                )}
            />

        </FormControl>
    )
}

export default InputDate

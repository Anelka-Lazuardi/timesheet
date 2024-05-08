import { FormControl, FormHelperText, TextField, TextFieldProps, Typography } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';



type Props = Omit<TextFieldProps, 'name' | 'label' | 'control'> & {
    name: string
    label: string
    control: any
    required?: boolean


}



const InputTime = ({ required = true, name, label, control, ...other }: Props) => {
    return (
        <FormControl fullWidth >
            <Typography variant="body1" gutterBottom>{label}  {required && <span style={{ color: 'red' }}>*</span>}</Typography>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TimePicker
                        ampm={false}
                        views={['hours', 'minutes']}
                        slotProps={{ textField: { placeholder: 'Pilih Waktu', helperText: error?.message, error: !!error } }}
                        {...field}
                        value={field.value ? dayjs(field.value) : null}

                    />
                )}
            />

        </FormControl>
    )
}

export default InputTime

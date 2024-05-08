import AddIcon from '@mui/icons-material/Add';
import { Box, Button, FormControl, FormHelperText, MenuItem, Select, SelectProps, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';


type Props = Omit<SelectProps, 'name' | 'label' | 'control'> & {
    name: string
    label: string
    control: any
    err: boolean,
    errMsg?: string
    options: { id: string, name: string }[]
    addNew?: boolean
    addNewCallback?: () => void
    labelNew?: string
    required?: boolean

}



const InputSelect = (props: Props) => {
    const { required = true, name, label, control, err, options, errMsg, addNew = false, addNewCallback = () => { }, labelNew = '', ...other } = props
    return (
        <FormControl sx={{ width: '100%' }} error={err}>
            <Typography variant="body1" gutterBottom>{label}    {required && <span style={{ color: 'red' }}>*</span>}
            </Typography>
            <Controller
                name="projectId"
                control={control}
                render={({ field }) =>
                    <Select
                        id={`id-${name}`}
                        fullWidth
                        {...field}
                        {...other}


                    >

                        {addNew &&
                            <MenuItem value={0} onClick={addNewCallback} >
                                <Box >
                                    <Button startIcon={<AddIcon />} fullWidth color='error' size='small' sx={{
                                        fontWeight: 600,
                                    }} >{labelNew}</Button>
                                </Box>

                            </MenuItem>
                        }
                        {
                            options.map((item) =>
                                <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                            )
                        }

                    </Select>
                }
            />

            <FormHelperText>{errMsg}</FormHelperText>

        </FormControl>

    )
}

export default InputSelect

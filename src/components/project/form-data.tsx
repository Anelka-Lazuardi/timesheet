import { Grid } from '@mui/material'
import InputText from '../form-input/InputText'

type Props = {
    control: any
    errors?: any

}

const FormaData = ({ control, errors }: Props) => {
    return (
        <Grid container spacing={5}>
            <Grid item md={12}>
                <InputText name="name" label="Nama Proyek" control={control} />
            </Grid>

        </Grid >
    )
}

export default FormaData
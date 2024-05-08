import { Box, Button, Card, CardActions, CardContent, CircularProgress, InputAdornment, Stack } from '@mui/material'
import React from 'react'
import { useRouter } from "next/navigation";
import InputText from '../form-input/InputText';

type Props = {
    control: any
    loading?: boolean
}

const FormData = ({ control, loading }: Props) => {
    const router = useRouter()
    return (
        <Card sx={{ width: 500, paddingY: 5, paddingX: 5 }}>
            <CardContent component={Stack} spacing={3} >
                <InputText name="name" label="Nama Karyawan" control={control} required={false} />

                <InputText name="rate" label="Rate" control={control} InputProps={{
                    startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                    endAdornment: <InputAdornment position="end" >/Jam</InputAdornment>,
                }}
                    type="number"
                    required={false}

                />



            </CardContent>
            <CardActions>
                {
                    loading ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "100%" }}>
                        <CircularProgress />
                    </Box> :
                        <>
                            <Button fullWidth variant='text' onClick={() => router.push('/')}>Batalkan</Button>
                            <Button variant='contained' fullWidth type='submit' disabled={loading}>Simpan</Button>
                        </>
                }



            </CardActions>
        </Card>
    )
}

export default FormData
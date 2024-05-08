import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
type Props = {
    open: boolean
    callback: () => void
    type?: 'success' | 'error'
    message: string
}

const GeneralDialog = ({ open, callback, type, message }: Props) => {

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={callback}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth={"sm"}
        >
            <DialogContent sx={{ paddingY: 5 }}>
                <Stack justifyContent={'center'} direction={'column'} alignItems={'center'} spacing={3}>
                    {
                        type === "success" ? <Stack sx={{ background: '#ccf2d9', borderRadius: '50%', padding: 2 }} >
                            <CheckIcon sx={{ color: 'white', fontSize: 100, background: '#33cc66', borderRadius: '50%', padding: 1 }} />
                        </Stack> : <Stack sx={{ background: '#fda8a8', borderRadius: '50%', padding: 2 }} >
                            <CloseIcon sx={{ color: 'white', fontSize: 100, background: '#F15858', borderRadius: '50%', padding: 1 }} />
                        </Stack>
                    }



                    <Typography variant='h5' fontWeight={'bold'} >{type === "success" ? "Berhasil" : "Gagal"}</Typography>
                    <Typography variant='body1'>{message}</Typography>
                </Stack>


            </DialogContent>

        </Dialog >
    )
}

export default GeneralDialog
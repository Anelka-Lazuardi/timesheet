'use client';
import { stateStore } from "@/app/store";
import GeneralDialog from "@/components/GeneralDialog";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography } from "@mui/material";
import { GridFilterListIcon } from "@mui/x-data-grid";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    FormComponent: React.ReactNode;
    onSubmit: SubmitHandler<any>
    activeDialog: string
    title?: string
}

const FormGeneralDialog = ({ title, FormComponent, onSubmit, activeDialog }: Props) => {
    const { loading, formState, setFormState, openDialog, setOpenDialog } = stateStore();

    const handleClose = () => {
        setFormState(false, "", formState.type)
    }

    const handleCloseDialog = () => {
        setOpenDialog("")
    }


    return (
        <>
            <Dialog
                open={openDialog === activeDialog}
                keepMounted
                onClose={handleCloseDialog}
                fullWidth
                maxWidth={"md"}
            >
                <DialogTitle>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography variant="h6" fontWeight={'bold'}>{title}</Typography>
                        <IconButton onClick={handleCloseDialog}>
                            <CloseIcon sx={{ color: 'black' }} />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <Divider />

                <form onSubmit={onSubmit} >
                    <DialogContent>
                        {FormComponent}
                    </DialogContent>
                    <Divider />
                    <DialogActions sx={{ padding: 2 }}>
                        {
                            loading ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "100%" }}>
                                <CircularProgress color="error" />
                            </Box> :
                                <>
                                    <Button onClick={handleCloseDialog} color='error'>Kembali</Button>
                                    <Button color='error' variant='contained' type='submit' >Simpan</Button>
                                </>
                        }

                    </DialogActions>
                </form>

            </Dialog >


            <GeneralDialog open={formState.open}
                callback={handleClose}
                type={formState?.type}
                message={formState.message} />

        </>
    )
}

export default FormGeneralDialog
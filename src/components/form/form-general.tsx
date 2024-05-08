'use client';
import { stateStore } from "@/app/store";
import GeneralDialog from "@/components/GeneralDialog";
import React from "react";
import { SubmitHandler } from "react-hook-form";


type Props = {
    FormComponent: React.ReactNode;
    onSubmit: SubmitHandler<any>
}

const FormGeneral = ({ FormComponent, onSubmit }: Props) => {
    const { formState, setFormState } = stateStore();

    const handleClose = () => {
        setFormState(false, "", formState.type)
    }


    return (
        <>
            <form onSubmit={onSubmit} >
                {FormComponent}
            </form>

            <GeneralDialog open={formState.open}
                callback={handleClose}
                type={formState?.type}
                message={formState.message} />

        </>
    )
}

export default FormGeneral
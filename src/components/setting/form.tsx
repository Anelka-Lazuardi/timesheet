'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup";
import FormGeneral from '../form/form-general';
import FormData from './form-data';
import { stateActivityStore, stateStore } from '@/app/store';

type Props = {}

interface IForm {
    id?: string
    name: string
    rate: number
}

const schema = yup.object({
    id: yup.string(),
    name: yup.string().required(),
    rate: yup.number().positive().integer().required(),
}).required()

const Form = (props: Props) => {
    const { loading, setLoading, setFormState } = stateStore();
    const { user, updateStateUser } = stateActivityStore()

    const { control, handleSubmit, reset } = useForm<IForm>({
        defaultValues: user, resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<IForm> = async (payload) => {
        setLoading(true)
        const config = {
            method: payload?.id ? 'put' : 'post',
            url: '/api/user',
            headers: {
                'Content-Type': 'application/json'
            },
            data: payload
        }
        try {
            const { data } = await axios(config)
            const { code, message, data: user } = data
            if (code === 200) {
                setFormState(true, message, 'success')
                reset(user)
                updateStateUser(user)
            }
            else {
                setFormState(true, message, 'error')
            }
        } catch (error) {
            setFormState(true, "Something went wrong ", 'error')
        }
        setLoading(false)
    }

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get("api/user")
            const { code, data: user } = data
            if (code === 200) {
                reset(user)
                updateStateUser(user)
            }

        }
        if (!user.id) getUser()


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <FormGeneral
            FormComponent={
                <FormData control={control} loading={loading} />
            }
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default Form
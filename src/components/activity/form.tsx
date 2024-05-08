'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup";
import FormGeneralDialog from '../form/form-general-dialog';
import FormData from './form-data';
import { stateActivityStore, stateFormStore, stateStore } from '@/app/store';
import dayjs from 'dayjs';

type Props = {}

interface IForm {
    id?: string
    title: string
    startDate: string
    endDate: string
    startTime: string
    endTime: string
    projectId: string
}
const schema = yup.object({
    id: yup.string(),
    title: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    startTime: yup.string().required(),
    endTime: yup.string().required(),
    projectId: yup.string().required(),
}).required()

const Form = (props: Props) => {
    const { setLoading, setFormState, setOpenDialog, openDialog } = stateStore();
    const { user, updateStateActivities } = stateActivityStore()
    const { activity, activityDefault, updateActivitiy } = stateFormStore()

    const { control, handleSubmit, reset, formState: { errors } } = useForm<IForm>({
        defaultValues: activity, resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<IForm> = async (payload) => {
        const data = {
            ...payload,
            startDate: dayjs(payload.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(payload.endDate).format('YYYY-MM-DD'),
            startTime: dayjs(payload.startTime).format('HH:mm:ss'),
            endTime: dayjs(payload.endTime).format('HH:mm:ss')
        }

        setLoading(true)
        const config = {
            method: payload?.id ? 'put' : 'post',
            url: '/api/activity',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                ...data,
                userId: user?.id
            }
        }
        try {
            const { data } = await axios(config)
            const { code, message, data: activities } = data
            if (code === 200) {
                setFormState(true, message, 'success')
                updateStateActivities(activities)
                setOpenDialog('')

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
        if (openDialog === '') {
            updateActivitiy(activityDefault)
            reset(activityDefault)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openDialog])

    useEffect(() => {
        if (activity) {
            reset(activity)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activity])

    return (
        <FormGeneralDialog
            FormComponent={
                <FormData control={control} errors={errors} />
            }
            onSubmit={handleSubmit(onSubmit)}
            activeDialog='activity'
            title={activity.id ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
        />
    )
}

export default Form
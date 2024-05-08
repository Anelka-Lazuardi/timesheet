'use client'
import { stateActivityStore, stateFormStore, stateStore } from '@/app/store';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import FormGeneralDialog from '../form/form-general-dialog';
import FormData from './form-data';
import { useEffect } from 'react';

type Props = {}

interface IForm {
    name: string
}
const schema = yup.object({
    id: yup.string(),
    name: yup.string().required(),

}).required()

const Form = (props: Props) => {
    const { setLoading, setFormState, setOpenDialog, openDialog } = stateStore();
    const { updateStateProjects } = stateActivityStore()
    const { project, projectDefault, updateProject } = stateFormStore()

    const { control, handleSubmit, reset, formState: { errors } } = useForm<IForm>({
        defaultValues: project, resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<IForm> = async (payload) => {
        setLoading(true)
        const config = {
            method: 'post',
            url: '/api/project',
            headers: {
                'Content-Type': 'application/json'
            },
            data: payload

        }
        try {
            const { data } = await axios(config)
            const { code, message, data: project } = data
            if (code === 200) {
                setFormState(true, message, 'success')
                updateStateProjects(project)
                setOpenDialog('')

                // updateProject(projectDefault)
                // reset(projectDefault)
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
            updateProject(projectDefault)
            reset(projectDefault)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openDialog])

    return (
        <FormGeneralDialog
            FormComponent={
                <FormData control={control} errors={errors} />
            }
            onSubmit={handleSubmit(onSubmit)}
            activeDialog='project'
            title={'Tambah Proyek Baru'}

        />
    )
}

export default Form
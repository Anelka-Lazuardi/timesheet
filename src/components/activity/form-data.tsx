import { stateActivityStore, stateStore } from '@/app/store'
import { Grid } from '@mui/material'
import InputDate from '../form-input/InputDate'
import InputSelect from '../form-input/InputSelect'
import InputText from '../form-input/InputText'
import InputTime from '../form-input/InputTime'

type Props = {
    control: any
    errors?: any

}

const FormaData = ({ control, errors }: Props) => {
    const { projects } = stateActivityStore()
    const { setOpenDialog } = stateStore();

    const addProject = () => {
        setOpenDialog('project')
    }

    return (
        <Grid container spacing={5}>
            <Grid item md={3}>
                <InputDate name="startDate" label="Tanggal Mulai" control={control} />

            </Grid>
            <Grid item md={3}>
                <InputDate name="endDate" label="Tanggal Berakhir" control={control} />
            </Grid>
            <Grid item md={3}>
                <InputTime name="startTime" label="Jam Mulai" control={control} />
            </Grid>
            <Grid item md={3}>
                <InputTime name="endTime" label="Jam Berakhir" control={control} />
            </Grid>

            <Grid item md={12}>
                <InputText name="title" label="Judul Kegiatan" control={control} />
            </Grid>

            <Grid item md={12}>
                <InputSelect
                    name="projectId" label="Nama Proyek"
                    control={control} options={projects} err={!!errors.projectId} errMsg={errors.projectId?.message}
                    addNew
                    addNewCallback={addProject}
                    labelNew='Tambah Proyek'
                />
            </Grid>

        </Grid >
    )
}

export default FormaData
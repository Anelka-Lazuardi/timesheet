import { stateActivityStore, stateFormStore, stateStore } from '@/app/store'
import { Box, Stack, Typography } from '@mui/material'
import { DataGrid, GridSlotsComponentsProps } from '@mui/x-data-grid'
import axios from 'axios'
import { columnsActivity } from '../acttion-grid'
import { calculateDuration } from '@/utils/helper'

type Props = {
}



declare module '@mui/x-data-grid' {
    interface FooterPropsOverrides {
        durasi: string;
        pendapatan: number
    }
}

const CustomFooter = (props: NonNullable<GridSlotsComponentsProps['footer']>) => {
    return (
        <Stack spacing={1} sx={{ padding: 2, backgroundColor: '#fbfbfb', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                <Typography color={'primary'} variant='body1'>Total Durasi</Typography>
                <Typography color={'primary'} variant='body1'>{props.durasi || '-'}</Typography>
            </Stack>
            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                <Typography color={'primary'} variant='h5' fontWeight={'bold'}>Total Pendapatan</Typography>
                <Typography color={'primary'} variant='h5' fontWeight={'bold'}>Rp {props.pendapatan?.toLocaleString('id-ID')}</Typography>
            </Stack>
        </Stack>
    )
}

const ActivityTable = ({ }: Props) => {
    const { setOpenDialog, setFormState } = stateStore();
    const { projects, activities, updateStateActivities, user } = stateActivityStore()
    const { updateActivitiy } = stateFormStore()

    const handleClickEdit = (id: string) => {
        const selected = activities.find((activity) => activity.id === id)
        if (selected) {
            updateActivitiy({
                id: selected?.id,
                title: selected?.title,
                startDate: selected?.startDate,
                startTime: selected?.startDate,
                endDate: selected?.endDate,
                endTime: selected?.endDate,
                duration: selected?.duration,
                userId: selected?.userId,
                projectId: selected?.projectId
            })
            setOpenDialog("activity")
        }
    }
    const handleClickDelete = async (id: string) => {
        const config = {
            method: 'delete',
            url: '/api/activity',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                id
            }
        }
        try {
            const { data } = await axios(config)
            const { code, message, data: activities } = data
            if (code === 200) {
                setFormState(true, message, 'success')
                updateStateActivities(activities)

            }
            else {
                setFormState(true, message, 'error')
            }
        } catch (error) {
            setFormState(true, "Something went wrong ", 'error')
        }


    }



    const {
        durationFormat, rate: pendapatan
    } = calculateDuration(activities, user.rate)

    return (
        <Box >
            <DataGrid rows={activities}
                sx={{

                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: '700',
                    },
                }}
                columns={columnsActivity(projects, handleClickEdit, handleClickDelete)}
                autoHeight
                disableColumnSelector
                disableRowSelectionOnClick
                // hideFooter
                showCellVerticalBorder
                localeText={{ noRowsLabel: "Belum ada kegiatan" }}
                slots={{
                    footer: CustomFooter,
                }}
                slotProps={{
                    footer: { durasi: durationFormat, pendapatan },
                }}

            />

        </Box>
    )
}

export default ActivityTable
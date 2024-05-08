import { formatDuration } from '@/utils/helper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton, Stack, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";



interface IProject {
    id: string;
    name: string;
}

type RowType = {
    id: string;
};

export const columnsActivity = (projects: IProject[], handleClickEdit: (id: string) => void, handleClicDelete: (id: string) => void) => {
    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Judul kegiatan', flex: 2, minWidth: 250, headerClassName: 'bold--header' },
        {
            field: 'col2', headerName: 'Nama Proyek', flex: 1, minWidth: 150,
            valueGetter: (value, row) => {
                return projects.find(project => project.id === row.projectId)?.name
            }
        },
        {
            field: 'startDate', headerName: 'Tanggal Mulai', width: 150,
            valueGetter: (value) => dayjs(value).format('D MMMM YYYY')
        },
        {
            field: 'endDate', headerName: 'Tanggal Berakhir', width: 150,
            valueGetter: (value) => dayjs(value).format('D MMMM YYYY')

        },
        {
            field: 'startTime', headerName: 'Waktu Mulai', width: 150,
            valueGetter: (value, row) => dayjs(row.startDate).format('HH:mm')
        },
        {
            field: 'endTime', headerName: 'Waktu Berakhir', width: 150,
            valueGetter: (value, row) => dayjs(row.endDate).format('HH:mm')
        },
        {
            field: 'duration', headerName: 'Durasi', width: 150,
            valueGetter: (value) => formatDuration(value)
        },
        {
            field: 'action', headerName: 'Aksi', width: 150, sortable: false,
            renderCell: (params) => {
                const rowId = params.row.id.toString()
                return <Stack direction={"row"} >
                    <Tooltip title="Edit" color="primary" >
                        <IconButton color="primary" sx={{ border: "2px solid #F8F9FA", borderRadius: 1.3 }} onClick={() => handleClickEdit(rowId)}>
                            <EditOutlinedIcon color="error" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton color="primary" sx={{ border: "2px solid #F8F9FA", borderRadius: 1.3 }} onClick={() => handleClicDelete(rowId)}>
                            <DeleteOutlineIcon color="error" />
                        </IconButton>
                    </Tooltip>

                </Stack>
            }
        }
    ];

    return columns
}


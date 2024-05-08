'use client';
import ActivityTable from '@/components/activity/activity-table';
import FilterDialog from '@/components/activity/filter-dialog';
import FormActivity from '@/components/activity/form';
import FormProject from '@/components/project/form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, CardContent, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { IActivity, stateActivityStore, stateStore } from './store';
import { exportToCsv, headerActivity } from '@/utils/helper';

type Props = {}



const FormMain = (props: Props) => {

  const router = useRouter()
  const { setOpenDialog } = stateStore();
  const { activities, filterData, user, updateStateUser, updateStateActivities, updateStateProjects, updateStateFilter } = stateActivityStore()
  const [openFilter, setOpenFilter] = useState<boolean>(false);




  const handleExport = () => {
    exportToCsv(activities, headerActivity, 'HH-Timesheet.csv');
  }

  useEffect(() => {
    const getDataPreparation = async () => {
      const { filterProject, filterTitle } = filterData
      const { data } = await axios.get(`api/activity?filterTitle=${filterTitle}&filterProject=${filterProject.join(",")}`)
      const { code, data: dataActivities } = data
      if (code === 200) {
        if (!dataActivities.user) {
          router.push("/setting")
          return
        }
        updateStateUser(dataActivities.user)
        updateStateActivities(dataActivities.activity)
        updateStateProjects(dataActivities.projects)
      }
      else {
        router.push("/setting")
      }

    }
    getDataPreparation()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);



  return (
    <>
      <Stack sx={{ flexGrow: 1, backgroundColor: '#F7F8FB', padding: 2 }} >
        <Card sx={{ flexGrow: 1 }}  >
          <CardContent>
            <Stack direction={"row"} spacing={5} justifyContent={"space-between"} alignItems={"center"}>
              <Stack direction={"row"} spacing={5}>
                <Box>
                  <Typography variant='caption'>Nama Karyawan</Typography>
                  <Typography variant='subtitle1'>{user.name}</Typography>
                </Box>
                <Box>
                  <Typography variant='caption'>Rate</Typography>
                  <Typography variant='subtitle1'>Rp {user.rate.toLocaleString('id-ID')} /jam</Typography>
                </Box>
              </Stack>
              <Box>
                <Button variant='contained' color='error' size='large' onClick={handleExport}>Export Laporan</Button>
              </Box>
            </Stack>



          </CardContent>
          <Divider />

          <CardContent>
            <Stack direction={"row"} justifyContent={"space-between"} spacing={5} alignItems={"center"} marginBottom={2}>
              <Stack direction={"row"} spacing={5} alignItems={"center"}>
                <Typography variant='h6' fontWeight={'bold'}>Daftar Kegiatan</Typography>
                <Button startIcon={<AddCircleOutlineIcon />} sx={{ fontWeight: 'bold', fontSize: 14, backgroundColor: '#f0f6ff', }} onClick={() => setOpenDialog("activity")}>Tambah Kegiatan</Button>
              </Stack>
              <Stack direction={"row"} spacing={5} alignItems={"center"}>
                <TextField size='small' placeholder='Cari' InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                }}
                  value={filterData.filterTitle}
                  onChange={(e) => updateStateFilter({ ...filterData, filterTitle: e.target.value })}
                />
                <IconButton sx={{ border: "2px solid #F8F9FA", borderRadius: 1.3 }} onClick={() => setOpenFilter(true)}>
                  <FilterListIcon color='error' fontSize='large' />
                </IconButton>
              </Stack>
            </Stack>

            <ActivityTable />
          </CardContent>

        </Card>
      </Stack >

      <FormActivity />
      <FormProject />
      <FilterDialog open={openFilter} handleClose={() => setOpenFilter(false)} />
    </>

  )
}

export default FormMain
'use client';
import { stateActivityStore } from '@/app/store';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";

type Props = {
    open: boolean
    handleClose: () => void
}

const FilterDialog = ({ open, handleClose }: Props) => {

    const { projects, filterData, updateStateFilter } = stateActivityStore();

    const handleChange = (event: SelectChangeEvent<typeof filterData.filterProject>) => {
        const {
            target: { value },
        } = event;
        // setPersonName(
        //   // On autofill we get a stringified value.
        //   typeof value === 'string' ? value.split(',') : value,
        // );

        updateStateFilter({ ...filterData, filterProject: typeof value === 'string' ? value.split(',') : value })
    };

    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth={"sm"}
        >
            <DialogTitle>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant="h6" fontWeight={'bold'}>Filter</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ color: 'black' }} />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <Divider />

            <DialogContent>
                <FormControl fullWidth>
                    <Typography variant="body1" gutterBottom>Proyek  <span style={{ color: 'red' }}>*</span></Typography>

                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={filterData.filterProject}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" />}
                        renderValue={(selected) => (

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={projects.find(project => project.id === value)?.name} />
                                ))}
                            </Box>
                        )}
                    >

                        {
                            projects.map((project) => (
                                <MenuItem key={project.id} value={project.id} >{project.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={handleClose} color='error'>Back</Button>
                {/* <Button color='error' variant='contained' type='submit' >Terapkan</Button> */}

            </DialogActions>

        </Dialog >
    )
}

export default FilterDialog
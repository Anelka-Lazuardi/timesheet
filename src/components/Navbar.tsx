'use client';
import { TabType } from '@/utils/type';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Stack, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'

type Props = {}

const Navbar = (props: Props) => {


    const router = useRouter()
    const pathname = usePathname()
    const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
        switch (newValue) {
            case 0:
                router.push('/');
                break;
            case 1:
                router.push('/setting');
                break;
            default:
                break;
        }
    };

    return (
        <Stack spacing={1}>
            <Box sx={{
                backgroundColor: 'white', paddingY: 2, paddingX: 5,
            }} >
                <Box display="inline-block">
                    <Typography variant='body1' fontWeight={'bold'} sx={{ lineHeight: 1 }} color={'error'} align='center'>Timesheet</Typography>
                    <Typography variant='body1' fontWeight={'bold'} sx={{ lineHeight: 0.5 }} color={'error'}>Management</Typography>
                </Box>
            </Box >

            <Box sx={{ backgroundColor: 'white', paddingX: 5, paddingTop: 4 }}>
                <Typography variant='h4' fontWeight={'bold'}>HH Timesheet</Typography>

                <Tabs
                    value={pathname === '/' ? 0 : 1} onChange={handleChange}
                    aria-label="secondary tabs example"
                >
                    <Tab label="Daftar Kegiatan" />
                    <Tab label="Pengaturan" />
                </Tabs>
            </Box>
        </Stack>

    )
}

export default Navbar
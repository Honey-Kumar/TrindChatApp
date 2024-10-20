import { AlternateEmail, CalendarMonth, Face } from '@mui/icons-material'
import { Avatar, Box, Stack, styled, Badge, Typography } from '@mui/material'
import React from 'react'
import moment from "moment"

const Profile = () => {
    const profile = import.meta.env.VITE_Profile
    return (
        <Box component={'div'} padding={4}>
            <Stack direction={'column'} alignItems={'center'} spacing={2}>
                <Avatar alt="profile" src={profile} sx={{ width: { sm: 80, md: 150, lg: 250, xl: 300 }, height: { sm: 80, md: 150, lg: 250, xl: 300 }, border: 6 }}
                />
                <Box component={'div'}>
                    <Typography sx={{ fontSize: '1rem' }}>Student</Typography>
                    <Typography sx={{ fontSize: '.8rem' }}>Bio</Typography>
                </Box>
                <Box component={'div'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <AlternateEmail />
                    <Stack>
                        <Typography sx={{ fontSize: '1rem' }}>Kamal123</Typography>
                        <Typography sx={{ fontSize: '.8rem' }}>Username</Typography>
                    </Stack>
                </Box>
                <Box component={'div'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Face />
                    <Stack>
                        <Typography sx={{ fontSize: '1rem' }}>Komal</Typography>
                        <Typography sx={{ fontSize: '.8rem' }}>Name</Typography>
                    </Stack>
                </Box>
                <Box component={'div'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <CalendarMonth />
                    <Stack>
                        <Typography sx={{ fontSize: '1rem' }}>{moment("2024-06-12T00:00:00.000Z").fromNow()}</Typography>
                        < Typography sx={{ fontSize: '.8rem' }}>Joined</Typography>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Profile

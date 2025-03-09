import { AlternateEmail, CalendarMonth, Face } from '@mui/icons-material'
import { Avatar, Box, Stack, styled, Badge, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import moment from "moment"
import axios from 'axios'
import { Base_url, request } from '../redux/RequestUrl'

const Profile = () => {
    const profile = import.meta.env.VITE_Profile
    const [myprofile, setmyprofile] = useState({})

    const fetchProfile = async () => {
        try {
            console.log("myprofile : ", myprofile)
            const response = await axios.get(`${Base_url}${request.myprofile}`, {
                withCredentials: true, credentials: 'include'
            })
            console.log("response : ", response.data)
            if (response.status === 200) {
                setmyprofile(response.data)
            }
            console.log("myprofile : ", myprofile)
        } catch (error) {
            console.error("Error fetching profile: ", error)
        }
    }

    useEffect(() => {
        console.log("Updated myprofile state:", myprofile)
    }, [myprofile])

    useEffect(() => {
        const controller = new AbortController()
        fetchProfile()
        return () => controller.abort()
    }, [])
    return (
        <Box component={'div'} padding={4}>
            <Stack direction={'column'} alignItems={'center'} spacing={2}>
                <Avatar alt="profile" src={myprofile?.data?.avatar?.url ? myprofile?.data?.avatar?.url : profile} sx={{ width: { sm: 80, md: 150, lg: 250, xl: 300 }, height: { sm: 80, md: 150, lg: 250, xl: 300 }, border: 6 }}
                />
                <Box component={'div'}>
                    <Typography sx={{ fontSize: '1rem' }}>Student</Typography>
                    <Typography sx={{ fontSize: '.8rem' }}>Bio</Typography>
                </Box>
                <Box component={'div'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <AlternateEmail />
                    <Stack>
                        <Typography sx={{ fontSize: '1rem' }}>{myprofile?.data?.username}</Typography>
                        <Typography sx={{ fontSize: '.8rem' }}>Username</Typography>
                    </Stack>
                </Box>
                <Box component={'div'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Face />
                    <Stack>
                        <Typography sx={{ fontSize: '1rem' }}>{myprofile?.data?.name}</Typography>
                        <Typography sx={{ fontSize: '.8rem' }}>Name</Typography>
                    </Stack>
                </Box>
                <Box component={'div'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <CalendarMonth />
                    <Stack>
                        <Typography sx={{ fontSize: '1rem' }}>{moment(myprofile?.data?.createdAt).fromNow()}</Typography>
                        < Typography sx={{ fontSize: '.8rem' }}>Joined</Typography>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Profile

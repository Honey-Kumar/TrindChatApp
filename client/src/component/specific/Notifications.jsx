import { Add, Close, SearchRounded } from '@mui/icons-material'
import { Avatar, Box, Button, Dialog, IconButton, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Base_url } from '../../redux/RequestUrl'

const profile = import.meta.env.VITE_Profile

const Notifications = () => {
    const [showBar, setShowBar] = useState(true)
    const [isChanges, setisChanges] = useState(false)
    const handleShowBar = () => {
        setShowBar(prev => !prev)
    }

    const [user, setuser] = useState([])

    const fetchProfile = async () => {
        try {
            console.log("user : ", user)
            const response = await axios.get(`${Base_url}/getchatrequest`, { withCredentials: true })
            console.log("response : ", response.data)
            if (response.data.code === 200) {
                setuser(response.data)
            }
            console.log("user : ", user)
        } catch (error) {
            console.error("Error fetching profile: ", error)
        }
    }

    useEffect(() => {
        console.log("all user : ", user)
    }, [user])

    useEffect(() => {
        const controller = new AbortController()
        fetchProfile()
        return () => controller.abort()
    }, [isChanges])
    return (
        <>
            <Dialog open={showBar}>
                <Stack component={'paper'} direction={'column'} sx={{
                    padding: 2,
                    position: 'relative'
                }}>
                    <Typography sx={{ fontSize: '1rem', textAlign: 'center', fontWeight: 'bold' }}>Notifications</Typography>
                    <Box component={'div'} sx={{ marginTop: 2 }}>
                        {
                            Array.isArray(user.data) && user.data.length !== 0 ? user.data.map((i, id) =>
                                <>
                                    <Stack key={id} direction={'row'} gap={2} marginBottom={'.2rem'} alignItems={'center'} width={'100%'} sx={{
                                        overflowY: 'scroll', scrollbarWidth: 'none',
                                        padding: 1,
                                        borderRadius: '1rem',
                                        transition: 'all 0.3s ease-in-out',
                                        outline: 'none',
                                        cursor: 'pointer',
                                    }}>
                                        <Box component={'div'} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                            <Avatar alt="profile" src={i.request_user_data.avatar.url ? i.request_user_data.avatar.url : profile} sx={{ width: 40, height: 40, border: 2, borderRadius: '50%' }} />
                                            <Typography>{i.request_user_data.name}</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack direction={'row'} gap={2} justifyContent={'space-between'} alignItems={'center'} margin={2}>
                                        <Button variant="contained" color='primary'>Accept</Button>
                                        <Button variant="contained" color='error'>Reject</Button>
                                    </Stack>
                                </>
                            ) : <>
                                <Box>
                                    <Typography sx={{ fontSize: '1rem', textAlign: 'center', fontWeight: 'bold' }}>No Notification found</Typography>
                                </Box>
                            </>
                        }
                    </Box>
                </Stack>
                <IconButton size='large' sx={{ position: 'absolute', top: 6, left: 6 }} onClick={handleShowBar}>
                    <Close fontSize='xl' />
                </IconButton>
            </Dialog>
        </>
    )
}


// const NotificationItem = () => {
//     return (
//         <>
//             <Stack direction={'row'} gap={2} marginBottom={'.2rem'} alignItems={'center'} width={'100%'} sx={{
//                 overflowY: 'scroll', scrollbarWidth: 'none',
//                 padding: 1,
//                 borderRadius: '1rem',
//                 transition: 'all 0.3s ease-in-out',
//                 outline: 'none',
//                 cursor: 'pointer',
//             }}>
//                 <Box component={'div'} sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <Avatar alt="profile" src={profile} sx={{ width: 40, height: 40, border: 2, borderRadius: '50%' }} />
//                     <Typography>Jonny Boi</Typography>
//                 </Box>
//             </Stack>
//             <Stack direction={'row'} gap={2} justifyContent={'space-between'} alignItems={'center'} margin={2}>
//                 <Button variant="contained" color='primary'>Accept</Button>
//                 <Button variant="contained" color='error'>Reject</Button>
//             </Stack>
//         </>
//     )
// }


export default Notifications

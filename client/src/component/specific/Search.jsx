import { Add, Check, Close, SearchRounded } from '@mui/icons-material'
import RemoveIcon from '@mui/icons-material/Remove';
import { Avatar, Box, Dialog, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { httpRequest } from '../../utils/httpRequest'
import { useAuthToken } from "../../utils/authToken"
import axios from 'axios';
import { Base_url } from '../../redux/RequestUrl';
import { toast } from 'react-toastify';

const profile = import.meta.env.VITE_Profile
console.log('profile : ', profile)


const Search = () => {
    const token = useAuthToken()
    const [showBar, setShowBar] = useState(true)
    const [searchfield, setsearchfield] = useState('')
    const [isChanges, setisChanges] = useState(false)
    const handleShowBar = () => {
        setShowBar(prev => !prev)
    }
    const [user, setuser] = useState([])

    const fetchProfile = async () => {
        try {
            console.log("user : ", user)
            // const response = await httpRequest(
            //     '/getUsers',
            //     'GET',
            //     {},
            //     searchfield ? { search: searchfield } : {},
            //     false,
            //     false,
            //     token
            // )
            const response = await axios.get(`${Base_url}/getUsers?search=${searchfield ? searchfield : ''}`, { withCredentials: true })
            console.log("response : ", response.data)
            if (response.data.code === 200) {
                setuser(response.data)
            }
            console.log("user : ", user)
        } catch (error) {
            console.error("Error fetching profile: ", error)
        }
    }

    const sendMyChatRequest = async (user_id) => {
        try {
            console.log("user_id : ", user_id)
            const response = await axios.post(`${Base_url}/sendChatRequest`, { user_id }, { withCredentials: true })
            console.log("response : ", response.data, response.data.code)
            if (response.data.code === 200) {
                setisChanges(prev => !prev)
                toast.success("chat request sent successfully")
            }
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
    }, [searchfield, isChanges])
    return (
        <>
            <Dialog open={showBar}>
                <Stack component={'paper'} direction={'column'} sx={{
                    padding: 2,
                    position: 'relative'
                }}>
                    <Typography sx={{ fontSize: '1rem', textAlign: 'center', fontWeight: 'bold' }}>Search</Typography>
                    <Box component={'div'} sx={{ marginTop: '1rem', padding: 1, display: 'flex', alignItems: 'center' }}>
                        <input type="text" name='search' value={searchfield} onChange={(e) => setsearchfield(e.target.value)} placeholder='Search....' style={{ width: '95%', padding: '.6rem', borderRadius: '.6rem', outline: 'none' }} />
                        <IconButton size='large'>
                            <SearchRounded fontSize='xl' />
                        </IconButton>
                    </Box>
                    <Box component={'div'}>
                        {
                            Array.isArray(user.data) && user.data.length !== 0 ? user.data.map((i, id) => <>
                                <Stack key={id} direction={'row'} marginBottom={'.2rem'} alignItems={'center'} width={'100%'} sx={{
                                    overflowY: 'scroll', scrollbarWidth: 'none', ":hover": {
                                        border: '2px solid #000',
                                        bgcolor: '#1F55B3',
                                        color: 'white',
                                    },
                                    padding: 1,
                                    borderRadius: '1rem',
                                    transition: 'all 0.3s ease-in-out',
                                    outline: 'none',
                                    cursor: 'pointer',
                                }}>
                                    <Box component={'div'} sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Avatar alt="profile" src={i.avatar.url ? i.avatar.url : profile} sx={{ width: 40, height: 40, border: 2, borderRadius: '50%' }} />
                                        <Typography>{i.name}</Typography>
                                    </Box>
                                    {
                                        i.request && <IconButton size='large' sx={{
                                            ":hover": {
                                                color: 'white',
                                            },
                                        }}>
                                            <Check fontSize='xl' sx={{ color: 'green' }} />
                                        </IconButton>
                                    }
                                    {
                                        i.request?.status === "accepted" ? <IconButton size='large' sx={{
                                            ":hover": {
                                                color: 'white',
                                            },
                                        }}>
                                            <RemoveIcon fontSize='xl' />
                                        </IconButton> : <IconButton size='large' sx={{
                                            ":hover": {
                                                color: 'white',
                                            },
                                        }} >
                                            <Add fontSize='xl' onClick={() => sendMyChatRequest(i._id)} sx={{ color: 'blue' }} />
                                        </IconButton>
                                    }
                                </Stack>
                            </>) : 'No data found'
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

// const ProfileItem = ({ id, image, name, request }) => {
//     console.log("data : ", image, " ", name)
//     return (
//         <>
//             <Stack direction={'row'} marginBottom={'.2rem'} alignItems={'center'} width={'100%'} sx={{
//                 overflowY: 'scroll', scrollbarWidth: 'none', ":hover": {
//                     border: '2px solid #000',
//                     bgcolor: '#1F55B3',
//                     color: 'white',
//                 },
//                 padding: 1,
//                 borderRadius: '1rem',
//                 transition: 'all 0.3s ease-in-out',
//                 outline: 'none',
//                 cursor: 'pointer',
//             }}>
//                 <Box component={'div'} sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <Avatar alt="profile" src={image ? image : profile} sx={{ width: 40, height: 40, border: 2, borderRadius: '50%' }} />
//                     <Typography>{name}</Typography>
//                 </Box>
//                 {
//                     request?.status === "accepted" ? <IconButton size='large' sx={{
//                         ":hover": {
//                             color: 'white',
//                         },
//                     }}>
//                         <RemoveIcon fontSize='xl' />
//                     </IconButton> : <IconButton size='large' sx={{
//                         ":hover": {
//                             color: 'white',
//                         },
//                     }} onClick={sendMyChatRequest(id)}>
//                         <Add fontSize='xl' />
//                     </IconButton>
//                 }
//             </Stack>
//         </>
//     )
// }

export default Search

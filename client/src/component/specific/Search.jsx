import { Add, Close, SearchRounded } from '@mui/icons-material'
import { Avatar, Box, Dialog, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

const profile = import.meta.env.VITE_Profile
console.log('profile : ', profile)


const Search = () => {
    const [showBar, setShowBar] = useState(true)
    const handleShowBar = () => {
        setShowBar(prev => !prev)
    }
    return (
        <>
            <Dialog open={showBar}>
                <Stack component={'paper'} direction={'column'} sx={{
                    padding: 2,
                    position: 'relative'
                }}>
                    <Typography sx={{ fontSize: '1rem', textAlign: 'center', fontWeight: 'bold' }}>Search</Typography>
                    <Box component={'div'} sx={{ marginTop: '1rem', padding: 1, display: 'flex', alignItems: 'center' }}>
                        <input type="text" name='search' placeholder='Search....' style={{ width: '95%', padding: '.6rem', borderRadius: '.6rem', outline: 'none' }} />
                        <IconButton size='large'>
                            <SearchRounded fontSize='xl' />
                        </IconButton>
                    </Box>
                    <Box component={'div'}>
                        {
                            Array.from({ length: 100 }).map((i, id) => <ProfileItem key={id} />)
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

const ProfileItem = () => {
    return (
        <>
            <Stack direction={'row'} marginBottom={'.2rem'} alignItems={'center'} width={'100%'} sx={{
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
                    <Avatar alt="profile" src={profile} sx={{ width: 40, height: 40, border: 2, borderRadius: '50%' }} />
                    <Typography>Jonny Boi</Typography>
                </Box>
                <IconButton size='large' sx={{
                    ":hover": {
                        color: 'white',
                    },
                }}>
                    <Add fontSize='xl' />
                </IconButton>
            </Stack>
        </>
    )
}

export default Search

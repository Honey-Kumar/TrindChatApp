import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const profile = import.meta.env.VITE_Profile

const ChatList = () => {
    const list = {
        img: profile,
        name: 'Kerry Merry',
        seen: '5d ago'
    }
    return (
        <>
            <Box component={'div'} sx={{ bgcolor: '#1F55B3', color: 'white' }}>
                {
                    Array.from({ length: 12 }).map((i, id) =>
                        <>
                            <Box key={id} component='div' sx={{
                                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '2rem', padding: '1rem', position: 'relative', borderBottom: '2px solid'
                            }}>
                                <Avatar alt="profile" src={profile} sx={{ width: 40, height: 40, border: 2, borderRadius: '50%' }} />
                                <div>
                                    <Typography>{list.name}</Typography>
                                    <Typography>{list.seen}</Typography>
                                </div>
                                <div style={{ height: '1rem', width: '1rem', borderRadius: '50%', backgroundColor: 'green', position: 'absolute', top: '1rem', left: '3.5rem' }}></div>
                            </Box>
                        </>
                    )
                }
            </Box>
        </>
    )
}

export default ChatList

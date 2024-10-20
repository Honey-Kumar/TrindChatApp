import { Attachment, Call, CameraAlt, EmojiEmotions, Mic, MoreVert, VideoCall } from '@mui/icons-material'
import { Avatar, Box, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

const ChatMessage = () => {
    const profile = import.meta.env.VITE_Profile
    return (
        <>
            <Box component={'div'} sx={{ height: "100%", overflowY: "hidden", scrollbarWidth: 'none', position: 'relative' }}>
                <Stack sx={{ padding: { md: 1, lg: 1, sm: 0 } }} direction={'row'} alignItems={'center'} spacing={1}>
                    <Avatar
                        alt="profile"
                        src={profile}
                        sx={{ width: 56, height: 56, border: 2, borderColor: '#FF585F' }}
                    />
                    <Stack direction={'column'}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'start' }}>Komal</Typography>
                        <Box component={'div'} sx={{ display: 'flex', gap: 1 }}>
                            <Typography sx={{ fontSize: '.8rem', textAlign: "start" }}>Online</Typography>
                            <Typography sx={{ fontSize: '.8rem', textAlign: "start", display: { xs: 'none', sm: 'none' } }}>Last Seen {moment("2024-06-12T00:00:00.000Z").fromNow()}</Typography>
                        </Box>
                    </Stack>
                    <Box component={'div'} flexGrow={1}></Box>
                    <Box component={'div'} sx={{ display: 'flex' }}>
                        <Tooltip title={'Call'}>
                            <IconButton size='large'>
                                <Call fontSize='xl' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'VideoCall'}>
                            <IconButton size='large'>
                                <VideoCall fontSize='xl' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Menu'}>
                            <IconButton size='large'>
                                <MoreVert fontSize='xl' />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Stack>
                <Divider sx={{ padding: 1 }} aria-hidden="true" variant="middle" flexItem />
                <Box flexGrow={1}>

                </Box>
                <Stack direction={'row'} alignItems="center" sx={{ position: 'absolute', bottom: 1, left: 1, right: 0, margin: 1 }}>
                    <input type="text" name="message" id="message" placeholder='Message.....' style={{ padding: '1rem', width: '100%', borderRadius: '2rem', outline: 'none', cursor: 'text', textAlign: 'center', zIndex: 1, fontSize: '1rem' }} />
                    <IconButton size='large' sx={{ position: 'absolute', left: 1, bottom: 0, zIndex: 1 }}>
                        <Attachment fontSize='xl' />
                    </IconButton>
                    <IconButton size='large' sx={{ position: 'absolute', right: 0, bottom: 0, zIndex: 1 }}>
                        <CameraAlt fontSize='xl' />
                    </IconButton>
                    <IconButton size='large' sx={{ position: 'absolute', right: 40, bottom: 0, zIndex: 1 }}>
                        <Mic fontSize='xl' />
                    </IconButton>
                    <IconButton size='large' sx={{ position: 'absolute', left: 35, bottom: 0, zIndex: 1 }}>
                        <EmojiEmotions fontSize='xl' />
                    </IconButton>
                </Stack>
            </Box>
        </>
    )
}

export default ChatMessage

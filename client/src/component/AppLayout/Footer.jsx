import { Call, ChatBubble, Settings, VerifiedUser } from '@mui/icons-material'
import { AppBar, Box, IconButton, Stack, Tooltip } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()
    return (
        <>
            <Box component={'div'} sx={{ height: 'auto', padding: '.5rem', bgcolor: 'rgb(251 146 60)', display: 'flex', justifyContent: 'center' }}>
                <Stack direction={'row'} gap={2}>
                    <Tooltip title={'Setting'} sx={{ zIndex: 1 }}>
                        <IconButton size='large'>
                            <Settings sx={{ color: 'white' }} fontSize='xl' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Chats'} sx={{ zIndex: 1 }}>
                        <IconButton size='large' onClick={() => {
                            console.log("working ...")
                            navigate('/chat/sghjjka')
                        }}>
                            <ChatBubble sx={{ color: 'white' }} fontSize='xl' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Contacts'} sx={{ zIndex: 1 }}>
                        <IconButton size='large'>
                            <Call sx={{ color: 'white' }} fontSize='xl' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Status'} sx={{ zIndex: 1 }}>
                        <IconButton size='large'>
                            <VerifiedUser sx={{ color: 'white' }} fontSize='xl' />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>
        </>
    )
}

export default Footer

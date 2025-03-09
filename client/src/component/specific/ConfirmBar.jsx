import { Add, Close, SearchRounded } from '@mui/icons-material'
import { Avatar, Box, Button, Dialog, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const profile = import.meta.env.VITE_Profile
const ConfirmBar = ({ message, confirm }) => {
    const navigate = useNavigate()
    const { User, isLoading, isError, Errormsg, isLoggedin, isLoggedout } = useSelector(state => state.Auth)
    const [showVerify, setShowVerify] = useState(true)
    const handleshowVerify = () => {
        setShowVerify(prev => !prev)
    }

    useEffect(() => {
        const controller = new AbortController()
        if (isLoggedout) {
            navigate('/login')
            toast.success('Logout successfully')
        }
        return () => controller.abort()
    }, [isLoggedout])

    return (
        <>
            <Dialog open={showVerify}>
                <Stack component={'paper'} direction={'column'} sx={{
                    padding: 2,
                    position: 'relative'
                }}>
                    <Typography sx={{ fontSize: '1rem', textAlign: 'center', fontWeight: 'bold' }}>Confirm</Typography>
                    <Box component={'div'} sx={{ marginTop: '1rem', padding: 3, display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>{message}</Typography>
                    </Box>
                    <Box sx={{ margin: '0 auto' }}>
                        <Button variant="contained" sx={{ marginRight: '.7rem' }} onClick={handleshowVerify}>Cancel</Button>
                        <Button variant="contained" color="success" onClick={() => {
                            confirm()
                            handleshowVerify()
                        }}>Confirm</Button>
                    </Box>
                </Stack>
                <IconButton size='large' sx={{ position: 'absolute', top: 6, left: 6 }} onClick={handleshowVerify}>
                    <Close fontSize='xl' />
                </IconButton>
            </Dialog>
        </>
    )
}

export default ConfirmBar

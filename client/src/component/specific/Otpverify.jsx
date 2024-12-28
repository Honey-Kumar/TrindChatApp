import { Add, Close, SearchRounded } from '@mui/icons-material'
import { Avatar, Box, Button, Dialog, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

const profile = import.meta.env.VITE_Profile

const Otpverify = () => {
    const [showVerify, setShowVerify] = useState(true)
    const handleshowVerify = () => {
        setShowVerify(prev => !prev)
    }
    return (
        <>
            <Dialog open={showVerify}>
                <Stack component={'paper'} direction={'column'} sx={{
                    padding: 2,
                    position: 'relative'
                }}>
                    <Typography sx={{ fontSize: '1rem', textAlign: 'center', fontWeight: 'bold' }}>Verify OTP</Typography>
                    <Box component={'div'} sx={{ marginTop: '1rem', padding: 3, display: 'flex', alignItems: 'center' }}>
                        <input type="text" name='otp' placeholder='OTP....' style={{ width: '98%', padding: '1rem', borderRadius: '.6rem', outline: 'none' }} />
                    </Box>
                    <Box sx={{ margin: '0 auto' }}>
                        <Button variant="contained" sx={{ marginRight: '.7rem' }}>Cancel</Button>
                        <Button variant="contained" color="success">Confirm</Button>
                    </Box>
                </Stack>
                <IconButton size='large' sx={{ position: 'absolute', top: 6, left: 6 }} onClick={handleshowVerify}>
                    <Close fontSize='xl' />
                </IconButton>
            </Dialog>
        </>
    )
}

export default Otpverify

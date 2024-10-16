import { Avatar, Box, Stack, styled, Badge, Typography } from '@mui/material'
import React from 'react'

const Profile = () => {
    const profile = "https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-628.jpg?size=626&ext=jpg&ga=GA1.1.2100509580.1727102882&semt=ais_hybrid"
    return (
        <Box component={'div'} padding={4}>
            <Stack direction={'column'} alignItems={'center'} spacing={4}>
                <Avatar alt="Remy Sharp" src={profile} sx={{ width: { sm: 80, md: 150, lg: 250, xl: 300 }, height: { sm: 80, md: 150, lg: 250, xl: 300 }, border : 6 }}
                />
                <Typography>Student</Typography>
            </Stack>
        </Box>
    )
}

export default Profile

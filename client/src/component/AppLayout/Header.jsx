import { AppBar, Box, Stack, Tooltip, IconButton } from '@mui/material'
import { Search, Add, Group, Logout, Notifications } from '@mui/icons-material';
import React from 'react'
import Logo from '../../assets/Logo.png'

const Header = () => {
  return (
    <>
      <Box height={'5rem'} sx={{ flexGrow: 1 }}>
        <AppBar sx={{ positions: 'sticky', height: '5rem', bgcolor: 'rgb(251 146 60)' }}>
          <Stack direction={'row'}>
            <Box component={'div'} sx={{ padding: 1 }}>
              <img src={Logo} alt="Logo" height={"3.8%"} />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ marginTop: '1rem' }}>
              <Tooltip title={'Search'}>
                <IconButton size='large'>
                  <Search sx={{ color: 'white' }} fontSize='xl' />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Add Groups'}>
                <IconButton size='large'>
                  <Add sx={{ color: 'white' }} fontSize='xl' />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Manage Groups'}>
                <IconButton size='large'>
                  <Group sx={{ color: 'white' }} fontSize='xl' />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Notification'}>
                <IconButton size='large'>
                  <Notifications sx={{ color: 'white' }} fontSize='xl' />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Logout'}>
                <IconButton size='large'>
                  <Logout sx={{ color: 'white' }} fontSize='xl' />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </AppBar>
      </Box>
    </>
  )
}

export default Header

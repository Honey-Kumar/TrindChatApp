import { AppBar, Box, Stack, Tooltip, IconButton, Backdrop } from '@mui/material'
import { Search, Add, Group, Logout, Notifications } from '@mui/icons-material';
import React, { Suspense, useState } from 'react'
import Logo from '../../assets/Logo.png'
import NotificationDialog from "../specific/Notifications"
import SearchDialog from "../specific/Search"

const Header = () => {
  const [isSearch, setisSearch] = useState(false)
  const handleisSearch = () => setisSearch(prev => !prev)

  const [isNotification, setisNotification] = useState(false)
  const handleisNotification = () => setisNotification(prev => !prev)

  return (
    <>
      <Box height={'5rem'} sx={{ flexGrow: 1, position: 'sticky', zIndex: 1 }}>
        <AppBar sx={{ positions: 'sticky', height: '5rem', bgcolor: 'rgb(251 146 60)' }}>
          <Stack direction={'row'}>
            <Box component={'div'} sx={{ padding: 1, marginLeft: 2 }}>
              <img src={Logo} alt="Logo" height={"3.8%"} />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box component={'div'} sx={{ marginTop: '1rem' }}>
              <Tooltip title={'Search'}>
                <IconButton size='large' onClick={handleisSearch}>
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
                <IconButton size='large' onClick={handleisNotification}>
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


      {
        isSearch && (
          <Suspense fallback={<Backdrop open />}>
            <SearchDialog />
          </Suspense>
        )
      }

      {
        isNotification && (
          <Suspense fallback={<Backdrop open />}>
            <NotificationDialog />
          </Suspense>
        )
      }
    </>
  )
}

export default Header

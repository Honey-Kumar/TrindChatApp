import { AppBar, Box, Stack, Tooltip, IconButton, Backdrop } from '@mui/material'
import { Search, Add, Group, Notifications, LoginOutlined, LogoutRounded } from '@mui/icons-material';
import React, { Suspense, useState } from 'react'
import Logo from '../../assets/Logo.png'
import NotificationDialog from "../specific/Notifications"
import SearchDialog from "../specific/Search"
import { Link, useNavigate } from 'react-router-dom';
import ConfirmBar from '../specific/ConfirmBar';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutThunk } from '../../redux/Slices/AuthSlice';
import { toast } from "react-toastify"
import Cookies from 'js-cookie'

const Header = () => {
  const token = Cookies.get("authtoken")
  const { User, isLoading, isError, Errormsg, isLoggedin, isLoggedout } = useSelector(state => state.Auth)
  console.log('loggin : ', isLoggedin, " loggout : ", isLoggedout)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSearch, setisSearch] = useState(false)
  const handleisSearch = () => setisSearch(prev => !prev)

  const [isConfirmed, setisConfirmed] = useState(false)
  const handleisConfirmed = () => setisConfirmed(prev => !prev)

  const [isNotification, setisNotification] = useState(false)
  const handleisNotification = () => setisNotification(prev => !prev)

  return (
    <>
      <Box height={'5rem'} sx={{ flexGrow: 1, position: 'sticky', zIndex: 1 }}>
        <AppBar sx={{ positions: 'sticky', height: '5rem', bgcolor: 'rgb(251 146 60)' }}>
          <Stack direction={'row'}>
            <Box component={'div'} sx={{ padding: 1, marginLeft: 2 }}>
              <Link to='/'><img src={Logo} alt="Logo" height={"3.8%"} /></Link>
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
              {
                !token ? <>
                  <Tooltip title={'Login'}>
                    <IconButton size='large'>
                      <LoginOutlined sx={{ color: 'white' }} fontSize='xl' onClick={() => navigate('/login')} />
                    </IconButton>
                  </Tooltip>
                </> : <>
                  <Tooltip title={'Logout'}>
                    <IconButton size='large'>
                      <LogoutRounded sx={{ color: 'white' }} fontSize='xl' onClick={() => handleisConfirmed()} />
                    </IconButton>
                  </Tooltip>
                </>
              }
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

      {
        isConfirmed && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmBar message={'Are you sure you want to Logout?'} confirm={() => dispatch(LogoutThunk())} />
          </Suspense>
        )
      }
    </>
  )
}

export default Header

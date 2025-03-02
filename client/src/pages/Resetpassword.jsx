import React, { useEffect, useState } from 'react'
import AuthLogo from '../assets/AuthLogo.png'
import Logo from '../assets/Logo.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordThunk } from '../redux/Slices/AuthSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';


const Resetpassword = () => {
  const { User, isLoading, isError, Errormsg, isLoggedin, isLoggedout, isRegister, isForget, isReset } = useSelector(state => state.Auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useParams()
  console.log("token : ", token)
  const [passwordEye, setpasswordEye] = useState(false)
  const [confirmPasswordEye, setconfirmPasswordEye] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    if (isReset) {
      navigate('/')
      toast.success('Password Reset Successfully')
    }

    return () => controller.abort()
  }, [isLoading, isReset])


  const ForgetSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be 8 characters at minimum")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .min(8, "Password must be 8 characters at minimum")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
      .required("Password is required"),
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: 'rgb(173, 216, 230)'
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: { xs: 1, md: 2 },
          display: 'block',
          margin: '0 auto'
        }}
      >
        <Link to='/'>
          <img
            src={Logo}
            alt="Logo"
            style={{ maxWidth: '10%', height: '3%', margin: '0 auto', display: 'block' }}
          />
        </Link>
      </Box>
      <Container
        component={"main"}
        maxWidth="full"
        sx={{
          display: "flex",
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: "center",
          alignItems: "center",
          padding: 2
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            padding: { xs: 2, md: 6 },
            display: 'flex',
            justifyContent: 'center',
            display: 'sticky'
          }}
        >
          <img
            src={AuthLogo}
            alt="AuthPic"
            style={{ maxWidth: '100%', height: 'auto', margin: '0 auto' }}
          />
        </Box>
        <Paper
          elevation={4}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            width: { xs: '100%', md: '50%' },
            borderRadius: '2rem'
          }}
        >
          <Typography variant={"h5"} sx={{ padding: 2, textAlign: 'center' }}>
            Reset Password
          </Typography>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: ""
            }}
            validationSchema={ForgetSchema}
            onSubmit={async (values) => {
              console.log(values);
              const data = {
                token,
                password: values.password,
                confirm_password: values.confirmPassword
              }
              await dispatch(resetPasswordThunk(data))
            }}
          >
            {({ errors, touched }) => (
              <Form style={{ position: 'relative' }}>
                <Field
                  type={passwordEye ? 'text' : "password"}
                  name="password"
                  placeholder="Enter password"
                  as={TextField}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  inputProps={{ autoComplete: "current-password" }}
                />
                <Button style={{
                  position: 'absolute',
                  top: '18%',
                  right: '2rem',
                  zIndex: 1,
                  transform: 'translateY(-50%)'
                }} onClick={() => setpasswordEye(prev => !prev)}>
                  {
                    passwordEye ? <VisibilityIcon /> : <VisibilityOffIcon />
                  }
                </Button>
                <Field
                  type={confirmPasswordEye ? 'text' : "password"}
                  name="confirmPassword"
                  placeholder="Enter confirm password"
                  as={TextField}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  inputProps={{ autoComplete: "confirm-password" }}
                />
                <Button style={{
                  position: 'absolute',
                  top: '58%',
                  right: '2rem',
                  zIndex: 1,
                  transform: 'translateY(-50%)'
                }} onClick={() => setconfirmPasswordEye(prev => !prev)}>
                  {
                    confirmPasswordEye ? <VisibilityIcon /> : <VisibilityOffIcon />
                  }
                </Button>
                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
          <Link to={'/login'}>
            <Button fullWidth variant="text">
              Login
            </Button>
          </Link>
        </Paper>
      </Container>
    </div >
  )
}

export default Resetpassword

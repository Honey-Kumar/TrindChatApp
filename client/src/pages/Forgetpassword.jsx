import React, { useEffect } from 'react'
import AuthLogo from '../assets/AuthLogo.png'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
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
import { forgetPasswordThunk } from '../redux/Slices/AuthSlice';
import Loading from '../utils/Loading';
import { toast } from 'react-toastify';

const Forgetpassword = () => {
    const { User, isLoading, isError, Errormsg, isLoggedin, isLoggedout, isRegister, isForget, isReset } = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const ForgetSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required")
    });

    useEffect(() => {
        const controller = new AbortController()
        if (isForget) {
            toast.success('Forget password request sent Successfully')
        }

        return () => controller.abort()
    }, [isLoading, isForget])

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
            {
                isLoading ? <Loading /> : <Container
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
                            Forget Password
                        </Typography>
                        <Formik
                            initialValues={{
                                email: ""
                            }}
                            validationSchema={ForgetSchema}
                            onSubmit={async (values) => {
                                console.log(values);
                                const data = {
                                    email: values.email
                                }
                                await dispatch(forgetPasswordThunk(data))
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        autoComplete="off"
                                        as={TextField}
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
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
            }
        </div >
    )
}

export default Forgetpassword

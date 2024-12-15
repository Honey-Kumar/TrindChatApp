import React, { useState } from 'react';
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
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
import AuthLogo from '../assets/AuthLogo.png'
import Logo from '../assets/Logo.png'
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

const Login = () => {
    const [Authtab, setAuthtab] = useState(true);
    const [imagePreview, setImagePreview] = useState('');

    const toggletab = () => {
        setAuthtab((prev) => !prev);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result); // Set image preview
            };
            reader.readAsDataURL(file); // Convert image file to base64 URL
        }
    };

    // Validation schema for login
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be 8 characters at minimum")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/\d/, "Password must contain at least one number")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
            .required("Password is required"),
    });

    // Validation schema for signup
    const SignupSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        username: Yup.string().required("Username is required"),
        SignupEmail: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        bio: Yup.string().required("Bio is required"),
        SignupPassword: Yup.string()
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
                    padding: { xs: 2, md: 6 },
                    display: 'block',
                    margin: '0 auto'
                }}
            >
                <Link to='/'>
                    <img
                        src={Logo}
                        alt="Logo"
                        style={{ maxWidth: '10%', height: '5%', margin: '0 auto', display: 'block' }}
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
                    padding: 5
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        alignItems: "center",
                        width: { xs: '100%', md: '50%' },
                        borderRadius: '2rem'
                    }}
                >
                    {Authtab ? (
                        <>
                            <Typography variant={"h5"} sx={{ padding: 4, textAlign: 'center' }}>
                                Log In
                            </Typography>
                            <Formik
                                initialValues={{
                                    email: "",
                                    password: "",
                                }}
                                validationSchema={LoginSchema}
                                onSubmit={(values) => {
                                    console.log(values);
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
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
                                            as={TextField}
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                        <Button
                                            sx={{ marginTop: "1rem" }}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            fullWidth
                                        >
                                            Log In
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                            <Typography textAlign={"center"} m={"1rem"}>
                                OR
                            </Typography>
                            <Button fullWidth variant="text" onClick={toggletab}>
                                Sign Up Instead
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="h5">Sign Up</Typography>
                            <Formik
                                initialValues={{
                                    name: "",
                                    username: "",
                                    SignupEmail: "",
                                    bio: "",
                                    SignupPassword: "",
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                            >
                                {({ errors, touched, validateForm }) => (
                                    <Form>
                                        <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                                            <Avatar
                                                sx={{
                                                    width: "10rem",
                                                    height: "10rem",
                                                    objectFit: "contain",
                                                }}
                                                src={imagePreview}
                                            />
                                            <IconButton
                                                sx={{
                                                    position: "absolute",
                                                    bottom: "0",
                                                    right: "0",
                                                    color: "white",
                                                    bgcolor: "rgba(0,0,0,0.5)",
                                                    ":hover": {
                                                        bgcolor: "rgba(0,0,0,0.7)",
                                                    },
                                                }}
                                                component="label"
                                            >
                                                <CameraAltIcon />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    onChange={handleImageChange}
                                                />
                                            </IconButton>
                                        </Stack>

                                        <Field
                                            name="name"
                                            placeholder="Name"
                                            as={TextField}
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                        <Field
                                            name="bio"
                                            placeholder="Bio"
                                            as={TextField}
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            error={touched.bio && Boolean(errors.bio)}
                                            helperText={touched.bio && errors.bio}
                                        />
                                        <Field
                                            name="username"
                                            placeholder="Username"
                                            as={TextField}
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            error={touched.username && Boolean(errors.username)}
                                            helperText={touched.username && errors.username}
                                        />
                                        <Field
                                            name="SignupEmail"
                                            placeholder="Email"
                                            as={TextField}
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            error={touched.SignupEmail && Boolean(errors.SignupEmail)}
                                            helperText={touched.SignupEmail && errors.SignupEmail}
                                        />
                                        <Field
                                            name="SignupPassword"
                                            type="password"
                                            placeholder="Password"
                                            as={TextField}
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            error={touched.SignupPassword && Boolean(errors.SignupPassword)}
                                            helperText={touched.SignupPassword && errors.SignupPassword}
                                        />
                                        <Button
                                            sx={{ marginTop: "1rem" }}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            fullWidth
                                        >
                                            Sign Up
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                            <Typography textAlign={"center"} m={"1rem"}>
                                OR
                            </Typography>
                            <Button fullWidth variant="text" onClick={toggletab}>
                                Login Instead
                            </Button>
                        </>
                    )}

                </Paper>
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
            </Container>
        </div >
    );
};

export default Login;

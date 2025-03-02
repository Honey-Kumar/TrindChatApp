const Base_url = import.meta.env.VITE_Backend_Base_Url
const request = {
    login: '/login',
    logout: '/logout',
    register: '/register',
    forgetpassword: '/forgetPassword',
    resetpassword: '/resetPassword'
}

export { Base_url, request }
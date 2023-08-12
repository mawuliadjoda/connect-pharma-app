import { Outlet, Navigate } from 'react-router-dom'

// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
// https://www.youtube.com/watch?v=2k8NleFjG7I&t=61s

const PrivateRoutes = () => {
    const auth = {'token':false}
    return(
        auth.token ? <Outlet/> : <Navigate to="/auth/login"/>
    )
}

export default PrivateRoutes
import {useSelector} from 'react-redux'
import {NavLink, Outlet} from 'react-router-dom'

const ProtectedRoute = () => {
    const {userInfo} = useSelector((state) => state.auth)

    // show unauthorized screen if no user is found in redux store
    if (!userInfo) {
        return (
            <div className='unauthorized'>
                <h1>Unauthorized</h1>
                <NavLink to='/login'>Login</NavLink> to gain access
            </div>
        )
    }

    // returns child route elements
    return <Outlet/>
}
export default ProtectedRoute
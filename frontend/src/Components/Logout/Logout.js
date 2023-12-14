/* eslint-disable no-unused-vars */
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';
import { clearAuthenticatedUser } from '../../utils/auth';


const Logout = () => {
    clearAuthenticatedUser();
    Navbar();
    Navigate('/login')
};





export default Logout;
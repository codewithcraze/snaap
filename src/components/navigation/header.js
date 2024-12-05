import { Link } from "react-router-dom";
import SimpleDrawer from "./sidedrawer";
import { useEffect } from "react";
import { clearNotification } from "../../store/reducers/notifications";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../utils/tool";
import { signOut } from "../../store/actions/users";
import './header.css';
import Logo from '../../assets/99tripdeal-logo.svg';

const Header = () => {
    const users = useSelector((state) => state.users);
    const notification = useSelector((state) => state.notification.global);
    const dispatch = useDispatch();
    useEffect(() => {
        // Handle notifications
        if (notification && notification.error) {
            showToast("ERROR", notification.message);
            dispatch(clearNotification());
        }
        if (notification && notification.success) {
            showToast("SUCCESS", notification.message);
            dispatch(clearNotification());
        }
    }, [dispatch, notification]);

    const signOutUser = () => {
        dispatch(signOut());
    };
    return (
        <nav className="navbar navbar-expand-lg p-1 fixed-top custom-header">
            <div className="container">
                <Link to="/" className="navbar-brand logo text-white">
                    <img src={Logo} alt="logo" height="35px" width="160px" />
                    {/* Snaap.io */}
                </Link>
                <SimpleDrawer users={users} Signout={signOutUser} className="hamburger" />
            </div>
        </nav>
    );
};

export default Header;

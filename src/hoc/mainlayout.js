import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/main.css';

const MainLayout = (props) => {

    return (
        <Box className={`main_layout`} >
            {props.children}
            <ToastContainer
                className="custom-toast-container"
                toastClassName="custom-toast"
                position="bottom-left"
                autoClose={30000}
                hideProgressBar={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                newestOnTop={true}
            />
        </Box>
    )
}

export default MainLayout;

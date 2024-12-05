import { Divider } from '@mui/material';
import Breadcrumb from '../custom-hooks/useBreadCrumb';
import '../styles/main.css';

const AdminLayout = (props) => {
    return (
        <>
            <div className='row adminLayout'>
                <main
                    role="main"
                    className='col-md-12 ml-sm-auto col-lg-12'
                    style={{ background: '#f9f9f9' }}
                >
                    <div className='container mt-5'>
                        <Breadcrumb />
                        <Divider />
                    </div>
                    {props.children}
                </main>
            </div>
        </>
    );
};

export default AdminLayout;

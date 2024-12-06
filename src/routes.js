import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isAuth } from './store/actions/users';
import { Loader } from './utils/tool';
import RouteGuard from './hoc/routeGuard';
import Header from './components/navigation/header';
import MainLayout from './hoc/mainlayout';
import NotFound from './components/not-found';
import Unauthorized from './components/unauthorized/unauthorized';

// Lazy load components
const Auth = lazy(() => import('./components/auth'));
const Dashboard = lazy(() => import('./components/dashboard'));
const MainDashboard = lazy(() => import('./components/dashboard/main'));
const ForgetPassword = lazy(() => import('./components/auth/forget-password'));
const ResetPassword = lazy(() => import('./components/auth/reset-password'));
const AddBlogs = lazy(() => import('./components/admin/blogs/add-blogs'));
const ViewBlogs = lazy(() => import('./components/admin/blogs/view-blogs'));
const EditBlogs = lazy(() => import('./components/admin/blogs/edit-blog'));
const AddUser = lazy(() => import('./components/admin/doc/addUser'));
const AddDocument = lazy(() => import('./components/admin/doc/addDoc'));


const Router = () => {
    const user = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(isAuth());
    }, [dispatch]);

    useEffect(() => {
        if (user.auth !== null) {
            setLoading(false);
        }
    }, [user.auth]);

    const header = useMemo(() => <Header />, []);
    const layout = useMemo(() => <MainLayout />, []);

    return (
        <BrowserRouter>
            {loading ? <Loader /> : (
                <>
                    {header}
                    {layout}
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/" element={<Auth />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/unauthorized" element={<Unauthorized />} />
                            <Route path="*" element={<NotFound />} />
                            <Route path="/dashboard" element={<RouteGuard><Dashboard /></RouteGuard>}>
                                <Route index element={<MainDashboard />} />
                                <Route path="add-blogs" element={<AddBlogs />} />
                                <Route path="view-blogs" element={<ViewBlogs />} />
                                <Route path="view-blogs/:id" element={<EditBlogs />} />
                                <Route path="add-users" element={<AddUser />} />
                                <Route path="add-document" element={<AddDocument />} />
                            </Route>
                            <Route path="/forget-password" element={<ForgetPassword />} />
                        </Routes>
                    </Suspense>
                </>
            )}
        </BrowserRouter>
    );
};

export default Router;

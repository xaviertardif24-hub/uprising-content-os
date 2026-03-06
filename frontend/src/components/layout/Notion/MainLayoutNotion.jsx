import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import Sidebar from './Sidebar';
import PageTopbar from './PageTopbar';

const MainLayoutNotion = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Basic breadcrumb logic based on path
    const pathParts = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = pathParts.length > 0
        ? pathParts.map(part => ({ label: part.charAt(0).toUpperCase() + part.slice(1) }))
        : [{ label: 'Dashboard' }];

    return (
        <AppLayout
            sidebar={
                <Sidebar
                    currentPath={location.pathname}
                    onNavigate={(path) => navigate(path)}
                />
            }
            topbar={
                <PageTopbar breadcrumbs={breadcrumbs} />
            }
        >
            <Outlet />
        </AppLayout>
    );
};

export default MainLayoutNotion;

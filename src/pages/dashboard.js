import React from 'react';
import { useState, useEffect } from 'react';
import SideMenu from './sideMenu';
import TopBar from './topBar';

function Dashboard() {

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <SideMenu></SideMenu>
            {/* <!--  Main wrapper --> */}
            <div className="body-wrapper">
                <TopBar></TopBar>

                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title fw-semibold mb-4">Sample Page</h5>
                            <p className="mb-0">This is a sample page </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )


}
export default Dashboard;


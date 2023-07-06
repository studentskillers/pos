import React from 'react';
import { useState, useEffect } from 'react';
import SideMenu from './sideMenu';
import TopBar from './topBar';


function ContactPage() {

    return (

        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <SideMenu></SideMenu>

            {/* <!--  Main wrapper --> */}
            <div className="body-wrapper">
                <TopBar></TopBar>

                <div className="container-fluid">
                    <h1>Contact Page</h1>


                    {/* normal HTML method */}

                    <button type="button" className="btn btn-info">check Button</button>


                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John</td>
                                <td>Doe</td>
                                <td>john@example.com</td>
                            </tr>
                            <tr>
                                <td>Mary</td>
                                <td>Moe</td>
                                <td>mary@example.com</td>
                            </tr>
                            <tr>
                                <td>July</td>
                                <td>Dooley</td>
                                <td>july@example.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default ContactPage;

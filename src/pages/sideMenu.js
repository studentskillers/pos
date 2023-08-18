import React from 'react';
import { Link } from "react-router-dom";

function SideMenu() {

    return(
        <>
        {/* // <!-- Sidebar Start --> */}
    <aside className="left-sidebar">
      {/* <!-- Sidebar scroll--> */}
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <a href="/" className="text-nowrap logo-img">
            <img src="../assets/images/logos/dark-logo.svg" width="180" alt="" />
          </a>
          <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
            <i className="ti ti-x fs-8"></i>
          </div>
        </div>
        {/* <!-- Sidebar navigation--> */}
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">

          <li className="sidebar-item">
                <Link className="sidebar-link" to="/">
                    <span>
                    <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Dashboard</span>
                </Link>
            </li>


            <li className="sidebar-item">
                <Link className="sidebar-link"  to="/manageuser" aria-expanded="false">  
              
                <span>
                <i className="ti ti-layout-dashboard"></i>
                </span>
                <span className="hide-menu">Manage User</span>
                </Link>
            </li>


            <li className="sidebar-item">
                <Link className="sidebar-link" to="/editcategory">
                    <span>
                    <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Edit Category</span>
                </Link>
            </li>

            <li className="sidebar-item">
                <Link className="sidebar-link" to="/editproduct">
                    <span>
                    <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Edit Product</span>
                </Link>
            </li>
            
            <li className="sidebar-item">
                <Link className="sidebar-link" to="/editsupplier">
                    <span>
                        <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Edit Supplier</span>
                </Link>
            </li>

            <li className="sidebar-item">
                <Link className="sidebar-link" to="/editstock">
                    <span>
                    <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Edit stock</span>
                </Link>
            </li>


            <li className="sidebar-item">
                <Link className="sidebar-link" to="/managecustomer">
                    <span>
                    <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Manage Customer</span>
                </Link>
            </li>

            <li className="sidebar-item">
                <Link className="sidebar-link" to="/managecategory">
                    <span>
                    <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Manage Category</span>
                </Link>
            </li>

            <li className="sidebar-item">
                <Link className="sidebar-link" to="/manageproduct">
                    <span>
                    <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Manage Product</span>
                </Link>
            </li>

            <li className="sidebar-item">
                <Link className="sidebar-link" to="/managesupplier">
                    <span>
                        <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Manage Supplier</span>
                </Link>
            </li>

            <li className="sidebar-item">
                <Link className="sidebar-link" to="/managestock">
                    <span>
                    <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Manage stock</span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link className="sidebar-link" to="/pointonsales">
                    <span>
                    <i className="ti ti-layout-dashboard"></i>
                    </span>
                    <span className="hide-menu">Point On Sales</span>
                </Link>
            </li>

          </ul>
          <div className="unlimited-access hide-menu">
            
          </div>
        </nav>
        {/* <!-- End Sidebar navigation --> */}
      </div>
      {/* <!-- End Sidebar scroll--> */}
    </aside>
    {/* <!--  Sidebar End --> */}
    </>
    )

}
export default SideMenu;


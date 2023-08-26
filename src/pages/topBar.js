import React from 'react';

function TopBar() {

    return(
        <>
         {/* <!--  Header Start --> */}
      <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item d-block d-xl-none">
            <span className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse">
              <i className="ti ti-menu-2"></i>
            </span>
          </li>
          
        </ul>
        <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
           
            <li className="nav-item dropdown">
              <span className="nav-link nav-icon-hover" id="drop2" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src="../assets/images/profile/user-1.jpg" alt="" width="35" height="35" className="rounded-circle"/>
              </span>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                <div className="message-body">
                  <span className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-user fs-6"></i>
                    <p className="mb-0 fs-3">My Profile</p>
                  </span>
                  <span className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-mail fs-6"></i>
                    <p className="mb-0 fs-3">My Account</p>
                  </span>
                  <span className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-list-check fs-6"></i>
                    <p className="mb-0 fs-3">My Task</p>
                  </span>
                  <span className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    {/* <!--  Header End --> */}
    </>
    )
}
export default TopBar;

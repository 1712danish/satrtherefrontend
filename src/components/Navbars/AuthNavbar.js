
import React from "react";
import { Link ,useHistory} from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";


const userName = localStorage.getItem("name");
const userID = localStorage.getItem("_id");
const redirectProfileURL = `/admin/user-profile/${userID}`
const postrouteURL = `/admin/posts/${userID}`
const mssgURL = `/admin/messages/${userID}`


function AuthNavbar(){
  const history = useHistory()
  
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              <h2 style={{color:"white",fontFamily:"Pacifico"}}>Starthere</h2>
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src={require("assets/img/brand/argon-react.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      id="navbar-collapse-main"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="nav-link-icon" to="/" tag={Link}>
                    <i className="ni ni-planet" />
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </NavItem>
                {!userID?
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/register"
                    tag={Link}
                  >
                    <i className="ni ni-circle-08" />
                    <span className="nav-link-inner--text">Register</span>
                  </NavLink>
                </NavItem>
                

                :
                <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to={postrouteURL}
                  tag={Link}
                >
                  <i className="ni ni-circle-08" />
                  <span className="nav-link-inner--text">Posts</span>
                </NavLink>
              </NavItem>
                }
                {userID?
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to={mssgURL}
                    tag={Link}
                  >
                    <i className="fas fa-inbox"></i>
                    <span className="nav-link-inner--text">Messages</span>
                  </NavLink>
                </NavItem>
                

                :
                null }
                {!userName ? <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/login"
                    tag={Link}
                  >
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </NavItem> :
                  <NavItem>
                    <NavLink
                      onClick={() => {
                        localStorage.clear();

                        history.push("/signin");

                        window.location.reload(false);
                      }}
                      className="nav-link-icon"
                      to="/auth/login"
                      tag={Link}
                    >
                      <i className="ni ni-key-25" />
                      <span className="nav-link-inner--text">Logout</span>
                    </NavLink>
                  </NavItem>}
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to={redirectProfileURL}
                    
                    tag={Link}
                  >
                    <i className="ni ni-single-02" />
                    <span className="nav-link-inner--text">Profile</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  
}

export default AuthNavbar;

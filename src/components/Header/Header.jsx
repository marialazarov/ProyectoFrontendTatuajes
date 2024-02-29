import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export const Header = () => {
   const decoded = JSON.parse(localStorage.getItem('decoded'))
  const token = localStorage.getItem("token");
  const navigate = useNavigate()



  const logMeOut = () =>{
    localStorage.setItem('token', '')
    localStorage.setItem('decoded', JSON.stringify({}))
    setTimeout(()=>{
        navigate('/home')
    },1000)
  } // para borrar los tokens y los datos del usuario una vez hace click en logout

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="">ESTUDIO TATTOO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="artist">Artists</Nav.Link>
            <NavDropdown title="My Account" id="collapsible-nav-dropdown">
              {!token ? (
                <>
                  <NavDropdown.Item href="home">Login</NavDropdown.Item>
                  <NavDropdown.Item href="register">Register</NavDropdown.Item>
                </>
              ) : decoded.userRoles =='admin' ? (
                <>
                <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="admin">Users</NavDropdown.Item>
                <NavDropdown.Item href="">All the Appointments</NavDropdown.Item>
                 <NavDropdown.Item href="appointments">My Appointments</NavDropdown.Item>
                 <NavDropdown.Item href="home" onClick={() => logMeOut()}>Log Out</NavDropdown.Item>
                
                </>
              ): (
                <>
                <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="">My Appointments</NavDropdown.Item>
                <NavDropdown.Item href="home" onClick={() => logMeOut()}>Log Out</NavDropdown.Item>
                
                
                </>
              )}

              
            </NavDropdown>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

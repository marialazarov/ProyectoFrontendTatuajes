import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

export const Header = () => {
  const token = localStorage.getItem("token");
  
  const logMeOut = () =>{
    localStorage.setItem('token', '')
    localStorage.setItem('decoded', JSON.stringify({}))
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
              ) : (
                <>
                <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                 <NavDropdown.Item href="appointments">Appointments</NavDropdown.Item>
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

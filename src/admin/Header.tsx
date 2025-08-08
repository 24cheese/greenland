import { Navbar, Nav } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-4">
      <Navbar.Brand>Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link href="#">Notifications</Nav.Link>
          <Nav.Link href="#">Hi, Hizrian</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

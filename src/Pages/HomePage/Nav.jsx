import NavbarOffcanvas from 'react-bootstrap-navbar-offcanvas'
import { /* everything else */ } from 'react-bootstrap'

<Navbar collapseOnSelect staticTop>
  <Navbar.Header>
    <Navbar.Brand>
      <a href={repo}>Off-canvas Navbar</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <NavbarOffcanvas side="left">
    <Nav>
      <NavItem active>Exhibit A</NavItem>
      <NavDropdown title="Github" id="basic-nav-dropdown">
        <MenuItem href={repo}>Code</MenuItem>
        <MenuItem href={repo + '/issues'}>Issues</MenuItem>
        <MenuItem>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
    <Navbar.Text pullRight>
      I am responsive!
    </Navbar.Text>
    <Navbar.Form pullRight>
      <FormGroup>
        <FormControl type="text" placeholder="Search" />
      </FormGroup>
    </Navbar.Form>
  </NavbarOffcanvas>
</Navbar>
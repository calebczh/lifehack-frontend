import { React, useContext, useState } from "react";
import AuthContext from "../../store/AuthContext";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Tooltip,
  OverlayTrigger,
  Stack,
  Image,
  Popover,
  Modal,
  Spinner,
} from "react-bootstrap";

function Navigator() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  const navbar = { backgroundColor: "#64B5F6" };
  const renderAppName = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      TrackTogether
    </Tooltip>
  );

  const renderProfileTag = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Profile
    </Tooltip>
  );

  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleOpenLogin = () => setShowLogin(true);
  const [currLogin, setCurrLogin] = useState("");

  const handleLogin = () => {
    authCtx.fetchData(currLogin);
    setShowLogin(false);
  };

  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const handleCloseCreate = () => setShowCreateAccount(false);
  const handleOpenCreate = () => setShowCreateAccount(true);
  const [currAccount, setCurrAccount] = useState("");

  const handleCreateAccount = () => {
    console.log(currAccount);
    authCtx.createAccount(currAccount);
    setShowCreateAccount(false);
  };

  const handleLogout = () => {
    authCtx.logoutHandler();
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Your Profile</Popover.Header>
      <Popover.Body>
        Your current points : {authCtx.accountDetails.points}
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar style={navbar} variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">LifeHack-2022</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Stack direction="horizontal" gap={3}>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Image">Classify</Nav.Link>
              {authCtx.isLoggedIn && (
                <Nav.Link href="/Dispose">Dispose</Nav.Link>
              )}
            </Stack>
          </Nav>
        </Navbar.Collapse>

        <Stack direction="horizontal" gap={3}>
          {authCtx.isLoggedIn && (
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
              rootClose
            >
              <Navbar.Text>
                {" "}
                Signed in as: {authCtx.accountDetails.name}{" "}
              </Navbar.Text>
            </OverlayTrigger>
          )}
          {authCtx.isLoggedIn && (
            <Button onClick={handleLogout}> Sign out </Button>
          )}

          {!authCtx.isLoggedIn && (
            <Button onClick={handleOpenLogin}> Sign in </Button>
          )}
          {!authCtx.isLoggedIn && (
            <Button onClick={handleOpenCreate}> Create Account </Button>
          )}

          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
        </Stack>
      </Container>

      <Modal show={showCreateAccount} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create new account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={currAccount}
              onChange={(e) => setCurrAccount(e.target.value)}
            ></Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {authCtx.createIsLoading ? (
            <Spinner variant="primary" animation="border" role="status" />
          ) : (
            <Button variant="primary" onClick={handleCreateAccount}>
              Create account
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in to your profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={currLogin}
              onChange={(e) => setCurrLogin(e.target.value)}
            ></Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {authCtx.loginIsLoading ? (
            <Spinner variant="primary" animation="border" role="status" />
          ) : (
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default Navigator;

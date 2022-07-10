import { React, useContext, useState } from "react";
import AuthContext from "../../store/AuthContext";
// import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./Navigator.module.css";
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
import styled from "styled-components";

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

  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      await authCtx.fetchData(currLogin);
      setShowLogin(false);
    } catch (e) {
      console.log(e);
      setLoginErrorMessage("Username does not exist");
    }
  };

  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const handleCloseCreate = () => setShowCreateAccount(false);
  const handleOpenCreate = () => setShowCreateAccount(true);
  const [currAccount, setCurrAccount] = useState("");

  const [createErrorMessage, setCreateErrorMessage] = useState("");
  const handleCreateAccount = async () => {
    try {
      await authCtx.createAccount(currAccount);
      setShowCreateAccount(false);
    } catch (e) {
      console.log(e);
      setCreateErrorMessage("Username already exists!");
    }
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

  const StyledNavLink = styled(NavLink)`
    text-emphasis: none;
    text-decoration: none;
    color: black;
    &:hover {
      text-emphasis: none;
      text-decoration: none;
      color: grey;
    }
  `;

  return (
    <Navbar style={navbar} variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">LifeHack-2022</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Stack direction="horizontal" gap={3}>
              <StyledNavLink to="/">Home</StyledNavLink>
              <StyledNavLink to="/Image">Classify</StyledNavLink>
              {authCtx.isLoggedIn && (
                <StyledNavLink to="/Dispose">Dispose</StyledNavLink>
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
          {createErrorMessage && (
            <p className={styles.errorMessage}> {createErrorMessage} </p>
          )}

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
          {loginErrorMessage && (
            <p className={styles.errorMessage}> {loginErrorMessage} </p>
          )}
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

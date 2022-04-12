import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { logout } from "../reducer/login/index";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, Modal } from "react-bootstrap";
import { MdLogout } from "react-icons/md";

const Navigation = () => {
  //redux state
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const dispatch = useDispatch();
  const history = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Navbar bg="light" expand="lg" className="px-4 py-0 fixed-top  ">
        <Container fluid>
          <Navbar.Brand href="/home">
            <img
              src="https://res.cloudinary.com/cryptoteam/image/upload/v1649760615/guvzzjxagltloe6leb6u.svg"
              width={140}
              height={40}
              alt="admin logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll " className="py-2 mt-2 ">
            <Modal
              show={showLogin}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              onHide={() => setShowLogin(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Login setShowLogin={setShowLogin} />
              </Modal.Body>
            </Modal>

            <Nav
              className="ms-auto my-2 my-lg-0 d-flex "
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {!state.isLoggedIn ? (
                <>
                  <Nav.Link
                    className="fw-bold"
                    style={{ color: "#198754" }}
                    onClick={() => setShowLogin(true)}
                  >
                    Log in
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link className="fw-bold" style={{ color: "#198754" }}>
                    {localStorage.getItem("userName")}
                  </Nav.Link>

                  <Nav.Link
                    className="auth-button"
                    onClick={() => {
                      dispatch(logout());
                      localStorage.clear();
                      history("/home");
                    }}
                    to="/home"
                  >
                    <MdLogout style={{ color: "#198754" }} size={25} />
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Navigation;

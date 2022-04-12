import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Form, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { RiDeleteBinLine } from "react-icons/ri";
import "../App.css";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  setUser,
  updateUserlById,
  deleteUserById,
} from "../reducer/users/users";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [elementId, setElementId] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /////////////////////////////////////////////////////////////////////////////////////////////

  // create user

  const createUser = async () => {
    const body = {
      userName,
      email,
      password,
    };

    await axios
      .post("/users", body)
      .then((result) => {
        dispatch(setUser(body));
        getUsers();
        Swal.fire({
          icon: "success",
          title: "created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  //get all users

  const getUsers = async () => {
    await axios
      .get(`/users`)
      .then((result) => {
        setUsers(result.data.result);
        setShowTable(true);
      })
      .catch((err) => {
        throw err;
      });
  };
  //==========================================================================

  //update user handler

  const [updateBox, setUpdateBox] = useState(false);

  const handleUpdateClick = (user) => {
    setUpdateBox(!updateBox);
    setUserId(user.id);
    setUserName(user.userName);
    setEmail(user.email);

    setElementId([...elementId, user.id]);

    if (updateBox) updateUser(user.id);
  };

  // update user function

  const updateUser = async (id) => {
    const body = {
      userName,
      email,
      password,
    };

    try {
      await axios.put(`/users/${id}`, body);

      dispatch(updateUserlById(body));
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      getUsers();
    } catch (error) {
      throw error;
    }
  };

  //==========================================================================

  //delete user

  const deleteUser = (id) => {
    axios
      .delete(`/users/${id}`)
      .then((res) => {
        dispatch(deleteUserById(id));
        getUsers();
      })
      .catch((err) => {
        throw err;
      });
  };

  //==========================================================================

  //useEffect to get all users

  useEffect(() => {
    getUsers();
  }, []);

  //==========================================================================
  return (
    <Container className="marginAdmin">
      {/* create user */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 ms-4 col-11">
              <Form.Control
                type="text"
                placeholder="userName"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3 ms-4 col-11">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3 ms-4 col-11">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            className="col-12"
            onClick={() => {
              createUser();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      {/* users table */}
      <h2>Users Table</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {showTable &&
            users?.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>
                    {updateBox && userId === user.id ? (
                      <input
                        type="text"
                        defaultValue={user.userName}
                        placeholder="Name here"
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    ) : (
                      user.userName
                    )}
                  </td>
                  <td>
                    {updateBox && userId === user.id ? (
                      <input
                        type="text"
                        defaultValue={user.email}
                        placeholder="Email here"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    ) : (
                      user.email
                    )}
                  </td>

                  <td>
                    {updateBox && userId === user.id ? (
                      <svg
                        onClick={() => {
                          Swal.fire({
                            icon: "info",
                            title: "Close...",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          setUpdateBox(false);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        fill="currentColor"
                        className="bi bi-x-circle close"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    ) : (
                      <></>
                    )}

                    <BsPencilSquare
                      id="update"
                      onClick={() => handleUpdateClick(user)}
                    />
                    {updateBox && userId === user.id && <></>}

                    <RiDeleteBinLine
                      id="delete"
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteUser(user.id);
                          }
                        })
                      }
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <div className="create ">
        <Button className="col-2" variant="success" onClick={handleShow}>
          Create
        </Button>
      </div>
    </Container>
  );
};
export default Home;

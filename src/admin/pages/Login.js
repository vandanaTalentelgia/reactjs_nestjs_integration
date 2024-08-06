import React, { useState } from 'react';
import { Form, Button, Card, Alert, InputGroup, Container, Row, Col } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { baseURL } from '../config/baseURLPath';
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const validateEmail = (mail) => {

    if (

      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(

        mail

      )

    ) {

      return true;

    }

    return false;

  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(email.trim())) {

      setMessage('Please enter valid credentials');

    } else if (password.trim() === '') {

      setMessage('Please enter valid credentials');

    } else {
      const bodyFormData = new FormData();
      bodyFormData.append('username', email);
      bodyFormData.append('password', password);
      axios({
        method: 'post',
        url: baseURL+'login',
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          localStorage.setItem('adminData', JSON.stringify(response.data.data))
          localStorage.setItem('admin_id', JSON.stringify(response.data.data.id))
          localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
          if (response.data.data.user_type === 'Admin') {
            navigate("/admin/dashboard")
          }
        })
        .catch((error) => {
          setMessage(error.response.data.message);
        });
    }
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100 card" style={{ maxWidth: "400px" }}>
          <Card style={{ backgroundColor: "black" }}>
            <Card.Body>
              <i className="fa fa-sign-in" style={{ fontSize: "80px", color: "orangered", alignItems: "center", justifyContent: "center", display: "flex" }} aria-hidden="true"></i>
              <h2 className='text-center mb-4' style={{ fontSize: "30px", color: "orangered", fontWeight: "Bold" }}>Login</h2>
              <Row>
                <Col md={12}>
                  <div style={{ height: 'auto' }}>
                    {message && (
                      <div className="form-group">
                        <div
                          className="alert alert-danger alert-dismissible"
                          role="alert"
                        >
                          {message}
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <Form>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1"><i className="fa fa-envelope" aria-hidden="true"></i></InputGroup.Text>
                  <Form.Control
                    placeholder="Email"
                    type='email'
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      setMessage('');
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1"><i className="fa fa-lock" aria-hidden="true"></i></InputGroup.Text>
                  <Form.Control
                    placeholder="Password"
                    type='password'
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      setMessage('');
                      setPassword(e.target.value);
                    }}
                  />
                </InputGroup>
                <Button className='w-100 mt-2' type='submit' style={{ fontSize: "25px", color: "white", backgroundColor: "orangered", border: "none", fontWeight: "Bold" }} onClick={handleLogin}>Login</Button>

              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
export default AdminLogin;

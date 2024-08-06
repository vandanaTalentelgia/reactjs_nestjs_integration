import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Form, Col } from 'react-bootstrap'

import { baseURL } from '../../config/baseURLPath';
const AddUser = () => {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const jwtHeader = {
    headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
};
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
  const handleMobileChange = (e) => {

    if ((e.which !== 8 && e.which !== 0 && e.which < 48) || (e.which > 57)) {
      e.preventDefault();
    }
    else if (e.target.value.length < 10) {
      setMessage("Please enter 10 digit number");
    }
    let val = e.target.value
    let maxLength = 10;
    let newValue = val < maxLength ? val : parseInt(val.toString().substring(0, maxLength));
    setMobile(newValue);
  }

  const validateMobile = (mobile) => {
    if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
      return true;
    }
    return false;
  }

  const handleSubmit = (e) => {
    if (first_name.trim() === '') {
      setMessage('Please enter your first name');
    }
    else if (last_name.trim() === '') {
      setMessage('Please enter your last name');
    } else if (!validateMobile(mobile)) {
      setMessage('Minimum 10 character mobile number required');
    }
    else if (!validateEmail(email.trim())) {
      setMessage('Invalid email');
    } else {
      axios
      .post(baseURL+"/createInstituteuser",
      {
          first_name: first_name.trim(),
          last_name: last_name.trim(),
          email: email.trim(),
          mobile: mobile,
        },jwtHeader)
        .then((response) => {
          if (response.data.status !== 200) {
            setMessage(response.data.message);
          }
          navigate("/institutionmanagement")
        })
        .catch((error) => {
          setMessage(error.response.data.message);
        });
    }
  };


  return (
    <div>

      <div className="container">
        <div className="w-50 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Add Institute</h2>
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
          <Row>
            <Col md={12}>
              <Form.Control
                autoComplete="none"
                className="registrationFormInputBox mb-3"
                type="text"
                name="first_name"
                value={first_name}
                placeholder="Enter your first name *"
                onChange={(e) => {
                  setMessage('');
                  setFirstName(e.target.value);
                }}
              />
            </Col>
            <Col md={12}>
              <Form.Control
                autoComplete="none"
                className="registrationFormInputBox mb-3"
                type="text"
                name="last_name"
                value={last_name}
                placeholder="Enter your last name *"
                onChange={(e) => {
                  setMessage('');
                  setLastName(e.target.value);
                }}
              />
            </Col>
          </Row>
          {/* </div> */}
          <Row>
            <Col md={12}>
              <Form.Control
                type="text"
                className="registrationFormInputBox mb-3 "
                placeholder='Mobile Number *'
                name="mobile"
                value={mobile}
                onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                onChange={e => {
                  if (e.target.value.length > 10) { setMessage(''); } handleMobileChange(e);
                }}
              />
            </Col>
            <Col md={12}>
              <Form.Control
                autoComplete="none"
                className="registrationFormInputBox mb-3"
                type="email"
                name="email"
                value={email}
                placeholder="Email *"
                onChange={(e) => {
                  setMessage('');
                  setEmail(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Row><Col><button className="btn btn-warning btn-block mt-2" onClick={handleSubmit} >Add Institute</button></Col></Row>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
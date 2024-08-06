import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Form, Col } from 'react-bootstrap'

import { baseURL } from '../../config/baseURLPath';
const UpdateUser = () => {

  const { id } = useParams();
  let navigate = useNavigate();
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
    let body = {};
    e.preventDefault();
    if (first_name.trim() === '') {
      setMessage('Please enter first name');
    } else if (last_name.trim() === '') {
      setMessage('Please enter last name');
    } else if (!validateMobile(mobile)) {
      setMessage('Minimum 10 character mobile number required');
    } else if (!validateEmail(email.trim())) {
      setMessage('Invalid email');
    } else {
      body = {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        mobile: mobile,
      }
      axios
        .put(baseURL + "updateInstitutionUser/" + id, body, jwtHeader)
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

  useEffect(() => {
    async function getStudent() {
      try {
        const user = await axios.get(`http://3.110.36.0:8080/api/guesto-admin/getInstitutionUser/${id}`)
        setFirstName(user.data.data.first_name);
        setLastName(user.data.data.last_name);
        setMobile(user.data.data.mobile);
        setEmail(user.data.data.email);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getStudent();
  }, []);



  return (
    <div>
      <div className="container">
        <div className="w-50 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Update Institute</h2>
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
          <form onSubmit={e => handleSubmit(e)}>
            <div className="form-group">
              <Row>
                <Col md={12}>
                  <Form.Control
                    autoComplete="none"
                    className="registrationFormInputBox mb-3"
                    type="text"
                    name="first_name"
                    value={first_name}
                    placeholder="First Name *"
                    onChange={(e) => {
                      setMessage('');
                      setFirstName(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Control
                    autoComplete="none"
                    className="registrationFormInputBox mb-3"
                    type="text"
                    name="last_name"
                    value={last_name}
                    placeholder="Last Name *"
                    onChange={(e) => {
                      setMessage('');
                      setLastName(e.target.value);
                    }}
                  />
                </Col>
              </Row>
            </div>
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
              <Row><Col><button className="btn btn-warning btn-block mt-2" onClick={handleSubmit} >Update Institute</button></Col></Row>
            </Row>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
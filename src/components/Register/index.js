import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '../../config/baseURLPath';
import { Row, Form, Col, InputGroup } from 'react-bootstrap'
import axios from 'axios';
import '../Login/login.css';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const intialName = {
    firstName: '',
  };
  const [name, setName] = useState(intialName);
  const validateEmail = (mail) => {
    if (
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    const RegExr = /^[A-Za-z][a-zA-Z ]*$/;
    if (value === '' || RegExr.test(value)) {
      setName((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
  }
  const handleSignup = (e) => {
    switch (true) {
      case name.firstName.trim() === '' : 
      setMessage('Please Enter Name');
      break;
      case !validateEmail(email.trim()) : 
      setMessage('Invalid Email');
      break;
      case password.trim() === '' || password.trim().length < 8 : 
      setMessage('Minimum 8 Character Password Required');
      break;
      case password !== confirmPassword : 
      setMessage('Password Do Not Match');
      break;
    default:
      axios({
        method: 'post',
        url: baseURL + '/users/signup',
        data: {
          name: name.firstName.trim(),
          email: email.trim(),
          password: password.trim(),
        },
      })
        .then((response) => {
            console.log(response.message);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  return (
    <Row>
      <Col md={3}></Col>
      <Col md={6}
      >
        <div className='formCenter modal_box'>
          <p className='headingText' style={{ textAlign: 'center', color: 'black' }}>
            Sign Up using Email & Password
          </p>

          <Row>
            <Col md={12}>
              <div style={{ height: 'auto' }}>
                {message && (
                  <div className='form-group'>
                    <div
                      className='alert alert-danger alert-dismissible'
                      role='alert'
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
                autoComplete='none'
                className='registrationFormInputBox mb-3'
                type='text'
                placeholder='Name *'
                name='firstName' value={name.firstName}
                onChange={(e) => {
                  setMessage('');
                  onInputChange(e)
                }}
              />
            </Col>
            <Col md={12}>
              <Form.Control
                autoComplete='none'
                className='registrationFormInputBox mb-3'
                type='email'
                placeholder='Email *'
                onChange={(e) => {
                  setMessage('');
                  setEmail(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <InputGroup>
                <Form.Control
                  autoComplete='none'
                  className='registrationFormInputBox mb-3 '
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password *'
                  onChange={(e) => {
                    setMessage('');
                    setPassword(e.target.value);
                  }}
                />
                <InputGroup.Text
                  style={{ height: '38px' }}
                >
                  <Link
                    to='#'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i style={{ color: 'black' }}
                      className={
                        showPassword ? ' fa fa-eye' : 'fa fa-eye-slash'
                      }
                    ></i>
                  </Link>
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col md={12}>
              <InputGroup>
                <Form.Control
                  autoComplete='none'
                  className='registrationFormInputBox mb-3'
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm Password *'
                  onChange={(e) => {
                    setMessage('');
                    setConfirmPassword(e.target.value);
                  }}
                />
                <InputGroup.Text
                  style={{ height: '38px' }}
                >
                  <Link
                    to='#'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i style={{ color: 'black' }}
                      className={
                        showConfirmPassword ? ' fa fa-eye' : ' fa fa-eye-slash'
                      }
                    ></i>
                  </Link>
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Row><Col md={4}></Col><Col md={6}><button type='button' className='btn-login' onClick={handleSignup}>Register</button></Col></Row>
          </Row>
        </div>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
};
export default Register;
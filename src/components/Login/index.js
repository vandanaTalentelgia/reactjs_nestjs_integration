import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import { baseURL } from '../../config/baseURLPath';
import axios from 'axios';
import './login.css';
const Login = () => {
  // Initialize State
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

// Initialize Submit Request

  const handleLogin = (e) => {
    e.preventDefault();
    // Send a POST request
    switch (true) {
      case !email || !password : 
      setMessage('Please Enter Credentials');
      break;
    default:
      axios({
        method: 'post',
        url: baseURL + '/users/login',
        data: {
          email:email,
          password:password
        },
      })
        .then((response) => {
          const { token } = response.data;

          // Store the token in localStorage or context
          localStorage.setItem('token', token);
    
          // Redirect to the dashboard
          navigate("/admin/dashboard")
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
          <div className='formCenter' style={{ height: '200px' }}>
            <Row>
              <Col md={12} className='dividerDiv'>
                <p className='dividerBoxText' align='center' style={{ color: 'black' }}>Login Page</p>
              </Col>
            </Row>
            {message && (
              <Row>
                <Col md={12}>
                  <div style={{ height: 'auto' }}>

                    <div className='form-group'>
                      <div
                        className='alert alert-danger alert-dismissible'
                        role='alert'
                      >
                        {message}
                      </div>
                    </div>

                  </div>
                </Col>
              </Row>
            )}
            <Row className='row-login'>
              <Col md={12} className='login-box container'>
                <Col md={12}>
                  <Form.Control
                    autoComplete='none'
                    className='mb-3'
                    type='text'
                    placeholder='Email Address *'
                    onChange={(e) => {
                      setMessage('');
                      setEmail(e.target.value);
                    }}
                  />
                </Col>
                <Col md={12}>
                  <InputGroup>
                    <Form.Control
                      autoComplete='none'
                      className='mb-3'
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

                <Row>
                  <Col md={12} style={{textAlign:'center'}}>
                    <button type='button' className='btn-login' onClick={handleLogin}>Login</button></Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
};
export default Login;
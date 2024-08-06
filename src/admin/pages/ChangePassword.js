import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../config/baseURLPath';

const ChangePassword = () => {
  const adminId = JSON.parse(localStorage.getItem('admin_id'));
  const [currentpassword, setCurrentPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const jwtHeader = {
    headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
};
  const handleSubmit = (e) => {

    e.preventDefault();
    if (newpassword !== confirmpassword) {
      setMessage('please enter correct password');
    } else {
      axios
      .put(baseURL + 'changePassword/' + adminId,{ password: newpassword },jwtHeader)
        .then((response) => {
          if (response.data.status !== 200) {
            console.log(response.data.message);
          } else {

            navigate('/admin')
          }
        })

    }
  }


  return (

    <div className='home'>

      <div class="row">
        <div class="col-md-12"><h3 class="mb-0 d-flex align-items-center justify-content-center">Change Password</h3></div>
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <div style={{ height: "30px" }}>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger alert-dismissible" role="alert" style={{ padding: '1.5px' }}>
                  {message}
                </div>
              </div>
            )}
          </div>
          <div class="form-group">
            <label for="inputPasswordOld">Current Password*</label>
            <input type="password" class="form-control" id="inputPasswordOld" onChange={(e) => { setMessage(''); setCurrentPassword(e.target.value); }} required="" />
          </div>
          <div class="form-group">
            <label for="inputPasswordNew">New Password*</label>
            <input type="password" class="form-control" id="inputPasswordNew" onChange={(e) => { setMessage(''); setNewPassword(e.target.value); }} required="" />

          </div>
          <div class="form-group">
            <label for="inputPasswordNewVerify">New Password Confirmation*</label>
            <input type="password" class="form-control" id="inputPasswordNewVerify" onChange={(e) => { setMessage(''); setConfirmPassword(e.target.value); }} required="" />

          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-success float-right mb-3" onClick={handleSubmit}>Save</button>
          </div>
        </div>
        <div class="col-md-1"></div>
      </div>



    </div>
  );
};

export default ChangePassword;
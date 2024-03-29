import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'

const Auth = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/login/`, formData);
      console.log(response.data);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class='contayner'>
      <div class='form'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>  
    </div>
  );
};

export default Auth;
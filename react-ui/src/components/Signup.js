import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';  
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import '../Home.css';
function SignUp(props) {
    const [customer, setCustomer] = useState({  firstName: '', lastName: '',
   email: '',password: '' });
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3000/";
    const saveCustomer = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = { firstName:customer.firstName, lastName: customer.lastName, 
           email: customer.email, password: customer.password };
           var error;
        axios.post(apiUrl, data)
          .then((result) => {
            //setShowLoading(false);
         }).catch((error) => setShowLoading(false));
          props.history.push('/Login');
      };
   
      const onChange = (e) => {
        e.persist();
        setCustomer({...customer, [e.target.name]: e.target.value});
      }
    
 

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron className="SignUp" >
        <Form onSubmit={saveCustomer} >
        <center>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control  className="LogInTextBox"style={{width:"30%"}} type="text" name="firstName" id="firstName" placeholder="Enter First Name" value={customer.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control className="LogInTextBox" style={{width:"30%"}} type="text" name="lastName" id="lastName" placeholder="Enter Last Name" value={customer.lastName}onChange={onChange}  />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control className="LogInTextBox" style={{width:"30%"}} type="text" name="email" id="email" rows="3" placeholder="Enter email" value={customer.email}onChange={onChange}  />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control  className="LogInTextBox" style={{width:"30%"}} type="password" name="password" id="password" placeholder="Enter Password" value={customer
                .password}   onChange={onChange}/>
          </Form.Group> </center>
          <br />
         <center> <Button style={{backgroundColor:"black",width:"20%",color:"white"}} variant="primary" type="submit">
            Save
          </Button> </center>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(SignUp);

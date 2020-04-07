import React, { useState } from "react";
import "./Login.css";
import API from "../utils/API";
import { useFormFields } from "../libs/hooksLib";
import Session from "../utils/Session";
import { Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    // Send login request
    API.defaults.withCredentials = true;
        
    API.post('sign_in', 
      {
        "user": {
          "email": fields.email,
          "password":fields.password
        }
      })
      .then((response) => {
        console.log(response);
        const token = response.data.data.user.authentication_token;
        console.log(token);
        API.defaults.headers.common['X-User-Email'] = fields.email;
        API.defaults.headers.common['X-User-Token'] = token;
        Session.setSession(fields.email, token);
        props.userHasAuthenticated(true);
        setIsLoading(true);
        props.history.push("/");
      }, (err) => {
        console.log(err);
        setIsLoading(false);
      }
    );
    // Create interceptor ?
    // Setup session?

  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="large">
        <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="large">
        <Form.Label>Password</Form.Label>
          <Form.Control
            value={fields.password}
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
        {/* <Button block size="large" disabled={!validateForm()} type="submit" >
          Login
        </Button> */}
        <LoaderButton
          block
          type="submit"
          size="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}
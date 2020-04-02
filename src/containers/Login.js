import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./Login.css";
import API from "../utils/API";
import Session from "../utils/Session";
import LoaderButton from "../components/LoaderButton";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    // Send login request
    API.post('sign_in', 
      {
        "user": {
          "email": email,
          "password":password
        }
      })
      .then((response) => {
        console.log(response);
        const token = response.data.data.user.authentication_token;
        console.log(token);
        API.defaults.headers.common['X-User-Email'] = email;
        API.defaults.headers.common['X-User-Token'] = token;
        Session.setSession(email, token);
        props.userHasAuthenticated(true);
        setIsLoading(true);
        props.history.push("/");
        // X-User-Email:carolcota@gmail.com
        //X-User-Token:19yt7qhrPRkcf4p--LF3
        // API.interceptors.request.use((config) => {
        //   console.log(config);
        //   config[''] = token
        //   //originalRequest['Authorization'] = 'Bearer ' + token;
        //   // if (tokenIsExpired && path_is_not_login) {
        //   // }
        //   return config;
        // }, (err) => {
        //   console.log(err);
        //   return Promise.reject(err);
        // });
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
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" size="large">
        <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={e => setPassword(e.target.value)}
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
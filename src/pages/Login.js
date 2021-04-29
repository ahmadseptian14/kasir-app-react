import React, { Component } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import  axios  from 'axios';
import history from "../history";

export default class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();

        const data = {
            email:this.email,
            password: this.password
        }

        axios
        .post("http://localhost:8000/api/login", data)
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            history.push("/");
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
    };

  render() {
    return (
      <div>
        <Container className="mt-5 mb-5">
          <Row>
            <Col md={4}>
              <Form onSubmit={this.handleSubmit}>
                <h1 className="mb-5">Login</h1>
              
                <div className="form-group">
                  <Form.Label>Email address</Form.Label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={(e) => (this.email = e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <Form.Label>Password</Form.Label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={(e) => (this.password = e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  variant="warning"
                  className="btn btn-block"
                >
                  Log In
                </Button>
              </Form>
            </Col>
            <Col md={8}>
              <Image
                src="assets/images/login.png"
                width="800"
                className="mr-2"
              ></Image>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

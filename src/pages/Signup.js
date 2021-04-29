import axios from "axios";
import React, { Component } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import history from "../history";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  nameError: "",
};

export default class Signup extends Component {
  state = initialState;

  validate = () => {
    let nameError = "";

    if (this.state.name < 6) {
      nameError = "Name must be 6 character";
    }

    if (nameError) {
      this.setState({ nameError });
      return false;
    }

    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.validate();
    const data = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    axios
      .post("http://localhost:8000/api/register", data)
      .then((res) => {
        console.log(res);

        history.push("/login");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("works");
  };

  render() {
    return (
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={4}>
            <Form onSubmit={this.handleSubmit}>
              <h3>Sign Up</h3>

              <div className="form-group">
                <Form.Label>Name</Form.Label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  onChange={(e) => (this.name = e.target.value)}
                  required
                />
                <div style={{ color: "red", fontSize: 12 }}>
                  {this.state.nameError}
                </div>
              </div>

              <div className="form-group">
                <Form.Label>Username</Form.Label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  onChange={(e) => (this.username = e.target.value)}
                  required
                />
                <div style={{ color: "red", fontSize: 12 }}>
                  {this.state.usernameError}
                </div>
              </div>

              <div className="form-group">
                <Form.Label>Email address</Form.Label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  onChange={(e) => (this.email = e.target.value)}
                  required
                />
                <div style={{ color: "red", fontSize: 12 }}>
                  {this.state.emailError}
                </div>
              </div>

              <div className="form-group">
                <Form.Label>Password</Form.Label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  onChange={(e) => (this.password = e.target.value)}
                  required
                />
                <div style={{ color: "red", fontSize: 12 }}>
                  {this.state.passwordError}
                </div>
              </div>

              <Button type="submit" variant="warning" className="btn btn-block">
                Sign Up
              </Button>
            </Form>
          </Col>
          <Col md={8}>
            <Image
              src="assets/images/signup.png"
              width="800"
              className="mr-2"
            ></Image>
          </Col>
        </Row>
      </Container>
    );
  }
}

import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import firebaseConfig from "../../databaseConfig/firebaseConfig";

class LogInAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pwd: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  signIn = e => {
    e.preventDefault();
    console.log("Signing in with credentials", this.state);
    const { email, pwd } = this.state;
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .then(user => {
        console.log("User signed in", user);
      })
      .catch(err => {
        console.warn("Could not log in");
        console.log(err);
      });
  };

  render() {
    const { email, pwd } = this.state;
    return (
      <Form>
        <Form.Field>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Email"
            name="email"
            value={email}
            type="email"
            required
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="pwd">Passord</label>
          <input
            placeholder="Passord"
            type="password"
            name="pwd"
            value={pwd}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button onClick={this.signIn} type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
export default LogInAdmin;

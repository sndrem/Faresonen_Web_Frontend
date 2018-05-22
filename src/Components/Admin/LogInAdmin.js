import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import firebaseConfig from "../../databaseConfig/firebaseConfig";

class LogInAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pwd: "",
      error: ""
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
    const { email, pwd } = this.state;
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .catch(() => {
        this.setState({ error: "Brukernavn eller passord er feil." });
      });
  };

  render() {
    const { error, email, pwd } = this.state;
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
            autoComplete="email"
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
            autoComplete="password"
          />
        </Form.Field>
        {error ? <span style={{ display: "block" }}>{error}</span> : ""}
        <Button onClick={this.signIn} type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
export default LogInAdmin;

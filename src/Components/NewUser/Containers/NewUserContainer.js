import React from "react";
import {Message} from "semantic-ui-react";
import NewUserForm from "../NewUserForm";
import firebaseConfig from "../../../databaseConfig/firebaseConfig";

class NewUserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmedPassword: "",
      formErrors: [],
      info: ""
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const {email, password, confirmedPassword} = this.state;
    const errors = [];
    if (password !== confirmedPassword) {
      errors.push("Passordene matcher ikke");
    } else {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {})
        .catch(error => {
          const {message} = error;
          errors.push(message);
        });
      this.setState({formErrors: errors});
    }
  };

  onChange = event => {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {formErrors, info} = this.state;
    return (
      <div>
        {info !== "" ? (
          <Message>
            <Message.Header>Informasjon</Message.Header>
            <p>{info}</p>
          </Message>
        ) : (
          ""
        )}
        <NewUserForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          formErrors={formErrors}
        />
      </div>
    );
  }
}

export default NewUserContainer;

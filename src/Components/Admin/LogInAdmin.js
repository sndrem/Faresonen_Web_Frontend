import React, {useState} from "react";
import {Form, Button} from "semantic-ui-react";
import firebaseConfig from "../../databaseConfig/firebaseConfig";

const LogInAdmin = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = e => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePwdChange = e => {
    e.preventDefault();
    setPwd(e.target.value);
  };

  const signIn = e => {
    e.preventDefault();
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .catch(() => {
        setError("Brukernavn eller passord er feil.");
      });
  };

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
          onChange={handleEmailChange}
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
          onChange={handlePwdChange}
          autoComplete="password"
        />
      </Form.Field>
      {error ? <span style={{display: "block"}}>{error}</span> : ""}
      <Button onClick={signIn} type="submit">
        Logg inn
      </Button>
    </Form>
  );
};
export default LogInAdmin;

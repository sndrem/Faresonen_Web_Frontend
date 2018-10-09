import React from "react";
import PropTypes from "prop-types";
import {Header, Form, Button} from "semantic-ui-react";

const FormErrors = ({errors}) => (
  <ul>
    {errors.map((error, index) => (
      <li key={index}>{error}</li> // eslint-disable-line
    ))}
  </ul>
);
FormErrors.propTypes = {
  errors: PropTypes.array.isRequired
};

const NewUserForm = ({onChange, onSubmit, formErrors}) => (
  <div>
    <Header as="h3">Opprett en ny bruker her</Header>

    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          required
          type="email"
          name="email"
          onChange={onChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="password">Passord</label>
        <input
          id="password"
          required
          type="password"
          name="password"
          onChange={onChange}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="confirmPassword">Bekreft passord</label>
        <input
          id="confirmPassword"
          required
          type="password"
          name="confirmedPassword"
          onChange={onChange}
        />
      </Form.Field>

      <Button type="submit">Opprett bruker</Button>
      {formErrors.length > 0 ? <FormErrors errors={formErrors} /> : ""}
    </Form>
  </div>
);

NewUserForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formErrors: PropTypes.array.isRequired
};

export default NewUserForm;

import React from "react";
import PropTypes from "prop-types";
import {Header, Form, Button} from "semantic-ui-react";


const FormErrors = ({errors}) => <ul>{errors.map((error, index) => <li key={index}>{error}</li>)}</ul>;

const NewUserForm = ({
  onChange, onSubmit, formIsValid, formErrors,
}) => (
  <div>
    <Header as="h3">Opprett en ny bruker her</Header>

    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label>Email</label>
        <input required type="email" name="email" onChange={onChange} />
      </Form.Field>
      <Form.Field>
        <label>Passord</label>
        <input required type="password" name="password" onChange={onChange} />
      </Form.Field>
      <Form.Field>
        <label>Bekreft passord</label>
        <input
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
  formErrors: PropTypes.array,
};

export default NewUserForm;

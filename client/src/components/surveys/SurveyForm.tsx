import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
import SurveyField from './SurveyField';

interface ISurveyFormProps {
  handleSubmit: (fn: Function) => any;
  onSurveySubmit: () => void;
}

class SurveyForm extends React.Component<any> {
  renderFields() {
    return _.map(formFields, ({ label, name }: { label: string; name: string }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values: any) {
  const errors: any = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }: { name: string }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);

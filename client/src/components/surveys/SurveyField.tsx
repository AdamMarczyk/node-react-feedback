import React from 'react';

interface ISurveyFieldProps {
  input: any;
  label: string;
  meta: {
    error: boolean;
    touched: boolean;
  }
}

const SurveyField = ({ input, label, meta: { error, touched } }: ISurveyFieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};

export default SurveyField;

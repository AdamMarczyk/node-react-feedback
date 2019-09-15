import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

interface ISurvey {
  _id: string;
  title: string;
  body: any;
  dateSent: string;
  yes: boolean;
  no: boolean;
}

interface ISurveyListProps {
  fetchSurveys: () => {};
  surveys: ISurvey[]
}

const SurveyList = (props: ISurveyListProps) => {
  React.useEffect(() => {
    props.fetchSurveys();
  }, []);

  const renderSurveys = () => {
    return props.surveys.reverse().map(survey => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <button>Yes: {survey.yes}</button>
            <button>No: {survey.no}</button>
          </div>
        </div>
      );
    });
  }
  return <div>{renderSurveys()}</div>;
}

function mapStateToProps({ surveys }: any) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);

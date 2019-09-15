import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';
import Dashboard from './Dashboard';
import Header from './Header';
import Landing from './Landing';
import SurveyNew from './surveys/SurveyNew';

interface IAppProps {
  fetchUser: () => {};
}

class App extends React.Component<IAppProps> {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);

import axios from 'axios';
import { FETCH_SURVEYS, FETCH_USER } from './types';

export const fetchUser = () => async (dispatch: any) => {
  const res = await axios.get('/api/current_user');

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const handleToken = (token: string) => async (dispatch: any) => {
  const res = await axios.post('/api/stripe', token);

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const submitSurvey = (values: any, history: any) => async (dispatch: any) => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const fetchSurveys = () => async (dispatch: any) => {
  const res = await axios.get('api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

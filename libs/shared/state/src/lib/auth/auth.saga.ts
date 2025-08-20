import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { api } from '@process-workflow/data-access/api';
import { loginSuccess, loginFailure, User } from './auth.slice';

// Mock API call
const loginApi = (email: string): Promise<{ user: User; token: string }> => {
  console.log(`Saga: Faking API call for ${email}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { email, name: 'Arjun Pavani' },
        token: 'fake-jwt-token',
      });
    }, 1000);
  });
};

function* loginSaga(action: PayloadAction<{ email: string }>) {
  try {
    const response: { user: User; token: string } = yield call(loginApi, action.payload.email);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure('Failed to login. Please try again.'));
  }
}

export function* watchAuth() {
  yield takeLatest('auth/loginRequest', loginSaga);
}
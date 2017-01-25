import {expect} from 'chai';
import deepFreeze from 'deep-freeze';
import authReducer from '../client/reducers/auth.reducer.js';
import actions from '../client/actions/auth.actions.js';
import * as types from '../client/types/auth.types.js';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import config from '../config';
import nock from 'nock';
import * as router from 'react-router';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth reducer:', function () {
  describe('SIGNIN_REQUEST', function () {
    it('should set isSigningIn to true and reset the current users and any errors', function () {
      let state = {currentUser: 'x', isSigningIn: false, signInError: 'x'};
      deepFreeze(state);
      let newState = authReducer(state, actions.signInRequest());
      expect(newState.currentUser).to.be.null;
      expect(newState.isSigningIn).to.be.true;
      expect(newState.signInError).to.be.null;
    });
  });

  describe('SIGNIN_SUCCESS', function () {
    it('reset isSigningIn and adds the details for the currentUser', function () {
      let state = authReducer(undefined, {});
      state = authReducer(state, actions.signInRequest());
      deepFreeze(state);

      let newState = authReducer(state, actions.signInSuccess({username: 'bob'}));
      expect(newState.currentUser).to.eql({username: 'bob'});
      expect(newState.isSigningIn).to.be.false;
    });
  });

  describe('SIGNIN_ERROR', function () {
    it('reset isSigningIn and adds the details for the error', function () {
      let state = authReducer(undefined, {});
      state = authReducer(state, actions.signInRequest());
      deepFreeze(state);

      let newState = authReducer(state, actions.signInError('I am an error'));
      expect(newState.isSigningIn).to.be.false;
      expect(newState.signInError).to.equal('I am an error');
    });
  });

  describe('SET_USER', function () {
    it('sets the user to the given value', function () {
      let state = authReducer(undefined, {});
      state = authReducer(state, actions.signInRequest());
      deepFreeze(state);

      let newState = authReducer(state, actions.setUser({username: 'Jill'}));
      expect(newState.currentUser).to.eql({username: 'Jill'});
    });
  });

  describe('SIGNOUT', function () {
    it('should remove the user from the state and localStorage', function () {
      localStorage.setItem('user', 'I am the user details');
      localStorage.setItem('token', 'asdfhlaschoauehicjyhdfiajsdhf');
      let state = {currentUser: 'I am the user details'};

      let user = localStorage.getItem('user');
      let token = localStorage.getItem('token');
      expect(user).to.be.equal('I am the user details');
      expect(token).to.be.equal('asdfhlaschoauehicjyhdfiajsdhf');

      let newState = authReducer(state, actions.signOut());
      expect(newState.currentUser).to.be.null;

      user = localStorage.getItem('user');
      token = localStorage.getItem('token');
      expect(user).to.be.null;
      expect(token).to.be.null;
    });
  });

  describe('thunk signIn action', function () {
    afterEach(() => {
      nock.cleanAll();
      localStorage.clear();
    });

    it('dispatches the SIGNIN_REQUEST and SIGNIN_SUCCESS actions for a successful request', () => {
      router.browserHistory = {push: () => {}};

      var user = {username: 'bob', name: 'Bob', password: 'pass123'};
      const token = 'adfjhkljahfdkjfkhfalhdflasdfh'
      nock(config.SERVER)
        .post('/signin', user)
        .reply(200, { user, token })

      const expectedActions = [
        { type: types.SIGNIN_REQUEST },
        { type: types.SIGNIN_SUCCESS, user }
      ]
      const store = mockStore({
        currentUser: null,
        isSigningIn: false,
        signInError: null
      })

      return store.dispatch(actions.signIn(user.username, user.name, user.password))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('adds the user and token to localStorage for a successful request', () => {
      router.browserHistory = {push: () => {}};

      let user = {username: 'bob', name: 'Bob', password: 'pass123'};
      let token = 'adfjhkljahfdkjfkhfalhdflasdfh'
      nock(config.SERVER)
        .post('/signin', user)
        .reply(200, { user, token })

      const store = mockStore({})

      expect(localStorage.getItem('user')).to.be.null;
      expect(localStorage.getItem('token')).to.be.null;

      return store.dispatch(actions.signIn(user.username, user.name, user.password))
        .then(() => {
          expect(localStorage.getItem('user')).to.eql(JSON.stringify(user));
          expect(localStorage.getItem('token')).to.eql(token);
        })
    });
    it('dispatches the SIGNIN_REQUEST and SIGNIN_ERROR actions for an unsuccessful request', () => {
      var user = {username: 'bob', name: 'Bob', password: 'pass123'};
      nock(config.SERVER)
        .post('/signin', user)
        .replyWithError('Error: Request failed with status code 401')

      const expectedActions = [
        { type: types.SIGNIN_REQUEST },
        { type: types.SIGNIN_ERROR }
      ]
      const store = mockStore({
        currentUser: null,
        isSigningIn: false,
        signInError: null
      })

      return store.dispatch(actions.signIn(user.username, user.name, user.password))
        .then(() => {
          store.getActions().forEach(({type}, i) => {
            expect(type).to.equal(expectedActions[i].type);
          });
        });
    });
  });
});

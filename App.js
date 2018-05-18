import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from 'react-navigation-redux-helpers';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import AppNavigator from './src/app';
import articleReducer from './src/app/reducers/article';
import bookReducer from './src/app/reducers/book';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const navReducer = createNavigationReducer(AppNavigator);
const appReducer = combineReducers({
  nav: navReducer,
  article: articleReducer,
  book: bookReducer
});

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const addListener = createReduxBoundAddListener("root");

class App extends Component {
  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator navigation={{
        dispatch: dispatch,
        state: nav,
        addListener,
      }} />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
  appReducer,
  applyMiddleware(middleware, thunk),
);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
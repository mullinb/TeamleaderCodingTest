import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import OrderManagementPage from './components/OrderManagementPage';

const client = new ApolloClient({
  dataIdFromObject: o => `${o.__typename}-${o.id},`
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Route path="/" component={OrderManagementPage} />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

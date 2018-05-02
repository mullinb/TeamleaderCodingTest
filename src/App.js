import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import OrderManagementPage from "./components/OrderManagementPage";
import ErrorHandler from "./components/ErrorHandler";

const client = new ApolloClient({
  dataIdFromObject: o => `${o.__typename}-${o.id},`
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <OrderManagementPage />
          <ErrorHandler />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import OrderManagementPage from "./components/OrderManagementPage";

const client = new ApolloClient({

})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <OrderManagementPage />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

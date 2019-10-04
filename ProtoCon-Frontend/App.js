import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import Amplify, { API, Auth, Hub } from 'aws-amplify';

import { AppText } from './common/AppText';
import Navigator from './common/Navigator';

import awsconfig from './aws-exports';
import { config, options } from './graphql/awsconfiguration';
import AccountProvider from './common/AccountContext';

//console.disableYellowBox = true;

export class App extends Component {

  constructor(props) {
    super(props);
    // let the Hub module listen on Auth events
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          this.setState({ authState: 'signedIn', authData: data.payload.data });
          break;
        case 'signIn_failure':
          this.setState({ authState: 'signIn', authData: null, authError: data.payload.data });
          break;
        case 'signOut':
          console.log('signing out');
          this.setState({ authState: 'signIn' });
          break;
        default:
          break;
      }
    });

    this.state = {
      authState: 'loading',
      authData: null,
      authError: null
    }
  }

  componentDidMount() {
    console.log('on component mount');
    // check the current user when the App component is loaded
    Auth.currentAuthenticatedUser().then(user => {
      console.log(user);
      this.setState({ authState: 'signedIn' });
    }).catch(e => {
      console.log(e);
      this.setState({ authState: 'signIn' });
    });
  }

  render() {

    const { authState } = this.state;

    if (this.state.authState === 'signIn') {
      Auth.federatedSignIn({ provider: 'Accenture' });
      return null;
    }

    return (
      <ApolloProvider client={client}>
        <AccountProvider>
          <Rehydrated>
            {authState === 'loading' && (<AppText>loading...</AppText>)}
            {authState === 'signedIn' && (<Navigator />)}
          </Rehydrated>
        </AccountProvider>
      </ApolloProvider>
    );
  }
}

const client = new AWSAppSyncClient(config, options);
Amplify.configure(awsconfig);

export default App;

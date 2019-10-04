import React from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { accountModified } from '../graphql/subscriptions';
import { getAccount } from '../graphql/queries';

const Account = React.createContext({
    account: null,
    setAccount: () => { }
});

class AccountProvider extends React.Component {

    setAccount = account => {
        this.setState({ account });
    }

    componentDidMount() {
        this.setState({
            account: {email: "stephanos.zignaigo@accenture.com"},
            setAccount: this.setAccount
        });

        this.props.client.query({
            query: gql`${getAccount}`,
            variables: {
                id: "stephanos.zignaigo@accenture.com"
            }
        }).then( value => {
            this.setAccount(value.data.getAccount);

            this.props.client.subscribe({
                query: gql`${accountModified}`,
                variables: {
                    email: value.data.getAccount.email
                }
            }).subscribe((newValues) => {
                const newVal = Object.assign({}, this.state.account, newValues.data.accountModified);

                this.setState({account: newVal});
            });
        })
    }

    render() {
        return (
            <Account.Provider value={this.state}>
                {this.props.children}
            </Account.Provider>
        )
    }
}

export default withApollo(AccountProvider);

export const AccountConsumer = Account.Consumer
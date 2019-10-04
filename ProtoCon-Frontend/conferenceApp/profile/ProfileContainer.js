import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Auth } from 'aws-amplify';

import { AppText, AppTextBold, AppTextBlack } from '../../common/AppText';
import ProfileQuery from './ProfileQuery';


export default class ProfileContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: null
        }

        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then( user => {
                const email = user.signInUserSession.idToken.payload.email;
                this.setState({email: email});
        }).catch(err => console.log(err));
    }

    callQuery() {
        if(this.state.email !== null) {
            const toggle = this.props.navigation.getParam('businessCard');
            return <ProfileQuery id={this.state.email} screenToggle={toggle} />;
        } 
        return null;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.callQuery()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    }
});
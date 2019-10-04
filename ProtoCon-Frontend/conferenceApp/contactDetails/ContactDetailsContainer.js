import React from 'react';
import { StyleSheet, View, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../../common/Header';
import ContactQuery from './ContactDetailsQuery';
import { NavigationEvents, withNavigation } from 'react-navigation';
import { AppText, AppTextBold, AppTextBlack } from '../../common/AppText';


export default class ContactDetailsContainer extends React.Component {

    render() {
        const { navigation } = this.props;
        const data = this.props.navigation.state.params;
        const email = data.email;

        return (
            <React.Fragment>
                <ContactQuery id={email} navigation={navigation} />
            </React.Fragment>
        );

    }
};


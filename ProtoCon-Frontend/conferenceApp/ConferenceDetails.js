import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Header } from '../common/Header';
import { AppText, AppTextBold, AppTextBlack } from '../common/AppText';

export default class ConferenceDetails extends React.Component {

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation}></Header>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
});
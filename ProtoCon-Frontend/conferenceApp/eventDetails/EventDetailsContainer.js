import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { Header } from '../../common/Header';
import EventDetailsQuery from './EventDetailsQuery';

export default class EventDetailsContainer extends React.Component {

    render() {
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        const theme = navigation.getParam('theme');
        const conferenceId = navigation.getParam('conferenceId');

        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} leftButton={'menu'}></Header>
                <EventDetailsQuery id={id} conferenceId={conferenceId} theme={theme} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    }
});
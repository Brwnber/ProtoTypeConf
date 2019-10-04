import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { Header } from '../../common/Header';
import CalendarQuery from './CalendarQuery';

export default class CalendarContainer extends React.Component {

    render() {
        const {navigate} = this.props.navigation;
        const id = this.props.navigation.getParam('id');

        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} leftButton={'menu'}></Header>
                <CalendarQuery id={id}/>
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
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../common/Header';
import ConferenceDetailsData from './ConferenceDetailsData';

export default class ConferenceDetailsContainer extends React.Component {

    render() {
        const { navigate } = this.props.navigation;
        const id = this.props.navigation.getParam('id');

        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} leftButton={'back'}></Header>
                <ConferenceDetailsData id={id} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
});

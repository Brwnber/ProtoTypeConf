import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { Header } from '../../common/Header';
import { AppText, AppTextBold, AppTextBlack } from '../../common/AppText';
import Permissions from 'react-native-permissions';
import { NavigationEvents } from 'react-navigation';

import LocationDenied from './components/LocationDenied';

import ConferencesByLocationQuery from './ConferencesByLocationQuery';

export default class ConferencesByLocation extends React.Component {

    state = {
        returnedData: null,
        authStatus: null
    };

    checkPermissions() {
        Permissions.request('location').then(response => {
            if( response === 'authorized' ) {
                this.findCoordinates();
            } else {
                this.setState({returnedData: <LocationDenied />});
            }
        });
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const longitude = JSON.stringify(position.coords.longitude);
            const latitude = JSON.stringify(position.coords.latitude);
            const data = <ConferencesByLocationQuery navigation={this.props.navigation} lat={parseFloat(latitude)} lon={parseFloat(longitude)} dist={150} />;
            this.setState({returnedData: data});
          },
          error => {
            const data = <View style={{backgroundColor: '#000', height: 200, width: 200}}><AppText>{JSON.stringify(error)}</AppText></View>;
            this.setState({returnedData: data});
          }
        );
    };
  
    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents onDidFocus={() => this.checkPermissions()} />
                <Header navigation={this.props.navigation} leftButton={'back'}/>
                <View style={styles.label}>
                    <AppTextBlack style={styles.labelText}>Find a conference near you:</AppTextBlack>
                </View>
                {this.state.returnedData}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        // alignItems: 'center'
        alignSelf: 'stretch'
    },
    label: {
        alignSelf: 'stretch',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    labelText: {
        color: '#1b164a',
        fontSize: 22
    },
    divide: {
        height: 1,
        alignSelf: 'stretch',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },

    locContainer: {
        height: 150,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: 'bold'
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    }
});
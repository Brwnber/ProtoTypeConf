import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Permissions from 'react-native-permissions';
import { NavigationEvents } from 'react-navigation';

import { Header } from '../../common/Header';
import { DefaultResult } from './components/Result';

import ConferencesByNameQuery from './ConferencesByNameQuery';

export default class ConferencesByName extends React.Component {
    state = {
        search: '',
        return: <DefaultResult />
    };

    authorized = false;

    componentWillMount() {
        didBlurSubscription = this.props.navigation.addListener('didBlur', () => {
            this.setState({search: ''});
            this.setState({return: <DefaultResult />});
        });
    }

    checkPermissions() {
        Permissions.request('location').then(req => {
            if( req === 'authorized' ) {
                this.authorized = true;
            } else {
                this.authorized = false;
            }
        });
    }
    
    componentWillUnmount() {
        didBlurSubscription.remove();
    }

    updateSearch = search => {
        this.setState({ search });
    };

    getCoordinates(text) {
        navigator.geolocation.getCurrentPosition(
            position => {
                lon = JSON.stringify(position.coords.longitude);
                lat = JSON.stringify(position.coords.latitude);

                returnVal = <ConferencesByNameQuery text={text} lat={lat} lon={lon}/>;
                this.setState({return: returnVal});
            }
        );
    }

    submitSearch = callback => {
        coordinates = null;

        if( this.authorized === true ) {
            this.getCoordinates(callback.nativeEvent.text);
        } else {
            returnVal = <ConferencesByNameQuery text={callback.nativeEvent.text} />;
            this.setState({return: returnVal});
        }
    };

    render() {
        const {search} = this.state;

        return(
            <View style={styles.container}>
                <NavigationEvents onDidFocus={() => this.checkPermissions()} />
                <Header navigation={this.props.navigation} leftButton={'back'}></Header>
                <View style={styles.conferenceContainer}>
                    <SearchBar
                        placeholder="Search for a Conference"
                        onChangeText={this.updateSearch}
                        onSubmitEditing={(callback) => this.submitSearch(callback)}
                        value={search}
                        lightTheme={true}
                        containerStyle={styles.searchbarContainer}
                        inputContainerStyle={styles.inputContainer}
                        placeholderTextColor='#1b164a'
                        inputStyle={styles.searchbar} />
                    <View style={styles.listContainer}>
                        {this.state.return}
                    </View>
                </View>
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
    conferenceContainer: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    searchbarContainer: {
        width: Dimensions.get('window').width * 0.9,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    inputContainer: {
        backgroundColor: '#f7f7f7',
        borderRadius: 15.5,
        height: 50,
        marginTop: 10
    },
    searchbar: {
        fontSize: 20
    },
    listContainer: {
        flex: 1,
        alignSelf: 'stretch'
    }
});
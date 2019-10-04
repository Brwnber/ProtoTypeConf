import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { AppText, AppTextBold, AppTextBlack } from '../../common/AppText';
import { withNavigation } from 'react-navigation';
import { Header } from '../../common/Header';

import BusinessCard from './businessCard/BusinessCard';
import MyContacts from './myContacts/MyContacts';

class Profile extends React.Component {
    
    constructor(props) {
        super(props);

        console.log('profile constrcutor', props.data);

        this.state = {
            businessCard: props.screenToggle,
        }
    }

    componentDidMount() {
        /*didFocusSubscription = this.props.navigation.addListener('didFocus', () => {
            this.props.refetch();
        });*/
        // this.props.subscribeToChanges();
        //set data state here with newData? This won't work.
    }

    componentWillUnmount() {
        // didFocusSubscription.remove();
    }

    goBusinessCard() {
        this.setState({businessCard: true});
    }

    goContacts() {
        this.setState({businessCard: false});
    }

    scanQRCode() {
        this.props.navigation.navigate('QRCodeReader');
    }

    render() {
        const {navigation, screenToggle, subscribeToChanges} = this.props;

        let screenView = null;

        console.log('profile renderer', this.props.data);

        if(this.state.businessCard === true && this.props.data) {
            screenView = <BusinessCard refetch={() => this.props.refetch()} data={this.props.data}/>
        } else {
            if(this.props.data)
                screenView = <MyContacts data={this.props.data}/>
        }

        return (
            <View style={styles.container}>
                <Header navigation={navigation} leftButton={'menu'}
                                rightButton={this.state.businessCard === true ? 'edit' : null}
                                rightButtonCallback={() => navigation.navigate('UserDetails', { profile: this.props.data })} />
                <View style={styles.toggleContainer}>
                    <TouchableOpacity activeOpacity={1} 
                            style={[this.state.businessCard === true ? styles.buttonPressed : styles.buttonNotPressed,
                                styles.businessCardBtn]} onPress={() => this.goBusinessCard()}>
                        <AppTextBold style={this.state.businessCard === true ? styles.buttonPressedText :
                            styles.buttonNotPressedText}>My Business Card</AppTextBold>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9}
                            style={[this.state.businessCard === false ? styles.buttonPressed : styles.buttonNotPressed,
                                styles.contactsBtn]} onPress={() => this.goContacts()}>
                        <AppTextBold style={this.state.businessCard === false ? styles.buttonPressedText :
                            styles.buttonNotPressedText}>My Contacts</AppTextBold>
                    </TouchableOpacity>
                </View>
                {screenView}
                <View style={styles.qrCodeBtnContainer}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.qrBtn} onPress={() => this.scanQRCode()}>
                        <Image source={require('../../assets/icons/camera.png')} />
                        <AppTextBold style={styles.qrBtnText}>Scan a QR Code</AppTextBold>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

export default withNavigation(Profile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    toggleContainer: {
        height: 50,
        marginTop: 10,
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    businessCardBtn: {
        borderWidth: 0.5,
        borderColor: '#9b9b9b',
        borderTopLeftRadius: 15.5,
        borderBottomLeftRadius: 15.5,
        height: 35,
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonPressed: {
        backgroundColor: '#e06162'
    },
    buttonPressedText: {
        color: '#fff',
        fontSize: 15
    },
    buttonNotPressed: {
        backgroundColor: '#fff'
    },
    buttonNotPressedText: {
        color: '#e06162',
        fontSize: 15
    },
    contactsBtn: {
        borderWidth: 0.5,
        borderColor: '#9b9b9b',
        borderTopRightRadius: 15.5,
        borderBottomRightRadius: 15.5,
        height: 35,
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    qrCodeBtnContainer: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    qrBtn: {
        height: 50,
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.75,
        backgroundColor: '#e06162',
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 15
    }, 
    qrBtnText: {
        fontSize: 20,
        color: 'white',
        marginLeft: 10
    },
});
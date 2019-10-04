import React from 'react';
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';

import { Icon } from 'react-native-elements'

import { AppText, AppTextBlack } from '../../common/AppText';
import { Header } from '../../common/Header';
import Regex from '../../common/Regex';

import { Auth } from 'aws-amplify';

export default class Register extends React.Component {
    state = {
        firstName: '',
        firstNameValidation: '',
        lastName: '',
        lastNameValidation: '',
        email: '',
        emailValidation: '',
        password: '',
        passwordValidation: '',
        hidePassword: true,
        icon: 'eye-off'
    };

    togglePassword() {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
            hidePassword: !prevState.hidePassword
        }));
    }

    validateFields() {
        valid = true;
        const {firstName, lastName, email, password} = this.state;

        if(firstName === '') {
            this.setState({firstNameValidation: 'Required'});
            valid = false;
        }

        if(lastName === '') {
            this.setState({lastNameValidation: 'Required'});
            valid = false;
        }

        if(email === '') {
            this.setState({emailValidation: 'Required'});
            valid = false;
        } else {
            if(Regex.email.test(email) === false) {
                this.setState({emailValidation: 'Please enter a valid email'});
                valid = false;
            }
        }

        if(password === '') {
            this.setState({passwordValidation: 'Required'});
            valid = false;
        } else if(password.length < 8) {
            this.setState({passwordValidation: 'Password at least 8 characters'});
            valid = false;
        } else {
            if(Regex.password.test(password) === false) {
                this.setState({passwordValidation: 'Password needs 1 Uppercase, 1 Number, and 1 Special character'});
                valid = false;
            }
        }

        return valid;
    }

    register() {
        const {firstName, lastName, email, password} = this.state;
        const {navigate} = this.props.navigation;

        valid = this.validateFields();

        if( valid === true ) {
            Auth.signUp({
                'username': email,
                'password': password,
                'attributes': {
                    'given_name': firstName,
                    'family_name': lastName
                }
              })
              .then(() => navigate('UserDetails'))
              .catch(err => console.log('err: ', err))
        }
    }

    render() {
        const {firstName, lastName, email, password, hidePassword, icon} = this.state;
        return (
            <View style={styles.container}>
                <Header leftButton={'back'} navigation={this.props.navigation}></Header>
                <View style={styles.RegisterContainer}>
                    <AppTextBlack style={styles.title}>Register</AppTextBlack>
                    <TextInput style={styles.input}
                            onChangeText={(firstName) => {
                                this.setState({firstName});
                                this.setState({firstNameValidation: ''});
                            }}
                            placeholder='First name'
                            value={firstName}
                            onSubmitEditing={ () => this.register() } />
                    <View style={styles.errorContainer}><AppText style={styles.error}>{this.state.firstNameValidation}</AppText></View>
                    <TextInput style={styles.input}
                            onChangeText={(lastName) => {
                                this.setState({lastName});
                                this.setState({lastNameValidation: ''});
                            }}
                            placeholder='Last name'
                            value={lastName}
                            onSubmitEditing={ () => this.register() } />
                    <View style={styles.errorContainer}><AppText style={styles.error}>{this.state.lastNameValidation}</AppText></View>
                    <TextInput style={styles.input}
                            onChangeText={(email) => {
                                this.setState({email});
                                this.setState({emailValidation: ''});
                            }}
                            placeholder='Email'
                            value={email}
                            onSubmitEditing={ () => this.register() } />
                    <View style={styles.errorContainer}><AppText style={styles.error}>{this.state.emailValidation}</AppText></View>
                    <View style={styles.passwordContainer}>
                        <TextInput style={styles.password}
                            onChangeText={(password) => {
                                this.setState({password});
                                this.setState({passwordValidation: ''});
                            }}
                            placeholder='Password'
                            value={password}
                            secureTextEntry={hidePassword}
                            onSubmitEditing={ () => this.register() } />
                        <Icon name={icon}
                            type='feather'
                            color='#f6bb61'
                            size={30}
                            containerStyle={styles.icon}
                            onPress={() => this.togglePassword()} />
                    </View>
                    <View style={styles.errorPasswordContainer}><AppText style={styles.error}>{this.state.passwordValidation}</AppText></View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    registerContainer: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    title: {
        alignSelf: 'center',
        fontSize: 24,
        color: '#1b164a',
        marginTop: 10,
        marginBottom: 5
    },
    input: {
        width: Dimensions.get('window').width * 0.9,
        fontSize: 20,
        color: '#1b164a',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#9b9b9b',
        marginTop: 3
    },
    passwordContainer: {
        width: Dimensions.get('window').width * 0.9,
        flexDirection: 'row',
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#9b9b9b',
        marginTop: 3,
    },
    password: {
        flex: 0.9,
        fontSize: 20,
        color: '#1b164a',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    icon: {
        flex: 0.1,
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    errorContainer: {
        height: 10,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginLeft: 7
    },
    errorPasswordContainer: {
        height: 10,
        width: Dimensions.get('window').width * 0.6
    }
});
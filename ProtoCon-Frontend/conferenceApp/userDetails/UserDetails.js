import React from 'react';
import { StyleSheet, View, TextInput, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import { AppText, AppTextBold, AppTextBlack } from '../../common/AppText';
import { Header } from '../../common/Header';
import Regex from '../../common/Regex';
import {createAccount, updateAccount} from '../../graphql/mutations';

class UserDetails extends React.Component {

    state = {
        name: '',
        email: '',
        location: '',
        jobTitle: '',
        phoneNumber: '',
        phoneNumberValidation: '',
        linkedIn: '',
        linkedInValidation: '',
        twitter: '',
        twitterValidation: '',
        website: '',
        websiteValidation: ''
    };

    profile = null;

    updateState() {
        this.setState({
            name: this.profile ? this.profile.firstName + ' ' + this.profile.lastName : '',
            email: this.profile ? this.profile.email : '',
            location: this.profile ? this.profile.location : '',
            jobTitle: this.profile ? this.profile.jobTitle : '',
            phoneNumber: this.profile ? this.profile.phoneNumber : '',
            linkedIn: this.profile ? this.profile.linkedIn : '',
            linkedInValidation: '',
            twitter: this.profile ? this.profile.twitter : '',
            twitterValidation: '',
            website: this.profile ? this.profile.website : '',
            websiteValidation: ''
        });
    }

    componentDidMount() {
        didFocusSubscription = this.props.navigation.addListener('didFocus', () => {
            this.profile = this.props.navigation.getParam('profile');

            if(this.profile)
                this.updateState();
        });

        this.updateState();
    }

    componentWillUnmount() {
        didFocusSubscription.remove();
    }

    retrieveFormData() {
        formData = Object.assign({}, this.state);
        name = formData.name;
        splitName = name.split(" ");
        firstName = '';
        lastName = '';

        if(splitName.length > 1) {
            lastName = splitName[splitName.length - 1];

            for(i=0; i<splitName.length-1; i++) {
                if(i === 0) {
                    firstName = splitName[i];
                } else {
                    firstName += " " + splitName[i];
                }
            }
        } else {
            if(splitName.length == 1) {
                firstName = name;
            }
        }

        delete formData.name;
        delete formData.phoneNumberValidation;
        delete formData.linkedInValidation;
        delete formData.twitterValidation;
        delete formData.websiteValidation;

        const email = formData.email;
        delete formData.email;

        console.log(formData);

        formData.firstName = firstName;
        formData.lastName = lastName;

        return {email: email, input: formData};
    }

    getButtonFunction(destination) {
        const {client, navigation} = this.props;
        return ( async () => {
            const list = this.retrieveFormData();
            if(this.validateFields() === true) {
                const { data } = await client.mutate({
                    mutation: gql`${destination === 'profile' ? updateAccount : createAccount}`,
                    variables: list
                });
                navigation.navigate(destination === 'profile' ? 'Profile' : 'Calendar');
            }
        });
    }

    validateFields() {
        valid = true;
        const {linkedIn, twitter, website} = this.state;

        if(linkedIn !== '' && linkedIn !== null && Regex.linkedIn.test(linkedIn) === false) {
            this.setState({linkedInValidation: 'Please enter a valid LinkedIn url'});
            valid = false;
        }

        if(twitter !== '' && twitter !== null && Regex.twitter.test(twitter) === false) {
            this.setState({twitterValidation: 'Please enter a valid Twitter url'});
            valid = false;
        }

        if(website !== '' && website !== null && Regex.website.test(website) === false) {
            this.setState({websiteValidation: 'Please enter a valid website url'});
            valid = false;
        }

        return valid;
    }

    clearValidation() {
        this.setState({phoneNumberValidation: ''});
    }
    
    render() {
        
        const {name, email, location, jobTitle, phoneNumber, linkedIn, twitter, website} = this.state;
        const {navigation} = this.props;
        this.profile = navigation.getParam('profile');

        pressFunction = null;
        header = null;

        if(this.profile) {
            pressFunction = this.getButtonFunction('profile');
            header = <Header leftButton={'menu'} navigation={this.props.navigation}></Header>
        } else {
            pressFunction = this.getButtonFunction('whateverIsAfterRegistration');
            header = <Header navigation={this.props.navigation}></Header>
        }

        return (
            <View style={styles.container}>
                {header}
                <View style={styles.registerContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0} style={styles.scrollViewContainer}>
                            <AppTextBlack style={styles.title}>Welcome, User</AppTextBlack>
                            <AppText style={styles.info}>Enter {this.profile ? 'additional' : 'your'} personal information</AppText>
                            <TextInput style={styles.input}
                                    onChangeText={(name) => this.setState({name})}
                                    placeholder='Name'
                                    value={name} />
                            <TextInput style={styles.input}
                                    editable={false}
                                    placeholder='Email'
                                    value={email} />
                            <TextInput style={styles.input}
                                    onChangeText={(location) => this.setState({location})}
                                    placeholder='Location'
                                    value={location} />
                            <TextInput style={styles.input}
                                    onChangeText={(jobTitle) => this.setState({jobTitle})}
                                    placeholder='Job Title'
                                    value={jobTitle} />
                            <TextInputMask style={styles.input}
                                    keyboardType="number-pad"
                                    guide={false}
                                    onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                                    placeholder='Phone Number'
                                    value={phoneNumber}
                                    mask={"[000] [000]-[0000]"} />
                            <TextInput style={styles.inputTest}
                                    onChangeText={(linkedIn) => this.setState({linkedIn, linkedInValidation: ''})}
                                    placeholder='LinkedIn URL'
                                    value={linkedIn} />
                            <View style={styles.errorContainer}>
                                <AppText style={styles.error}>{this.state.linkedInValidation}</AppText>
                            </View>
                            <TextInput style={styles.input}
                                    onChangeText={(twitter) => this.setState({twitter, twitterValidation: ''})}
                                    placeholder='Twitter URL'
                                    value={twitter} />
                            <View style={styles.errorContainer}>
                                <AppText style={styles.error}>{this.state.twitterValidation}</AppText>
                            </View>
                            <TextInput style={styles.input}
                                    onChangeText={(website) => this.setState({website, websiteValidation: ''})}
                                    placeholder='Website URL'
                                    value={website} />
                            <View style={styles.errorContainer}>
                                <AppText style={styles.error}>{this.state.websiteValidation}</AppText>
                            </View>
                            <TouchableOpacity activeOpacity={0.9} style={styles.buttonStyle} onPress={pressFunction}>
                                <AppTextBold style={styles.buttonText}>{this.profile ? 'Save' : 'Save & Continue'}</AppTextBold>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
export default withApollo(UserDetails);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    registerContainer: {
        flex: 1,
        alignSelf: 'stretch',
        width: 'auto',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    title: {
        alignSelf: 'center',
        fontSize: 24,
        color: '#1b164a',
        marginTop: 10
    },
    info: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#1b164a',
        marginBottom: 3
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
        paddingBottom: 8,
        marginTop: 4
    },
    inputTest: {
        width: Dimensions.get('window').width * 0.9,
        fontSize: 20,
        color: '#1b164a',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#9b9b9b',
        paddingBottom: 8,
    },
    buttonStyle: {
        alignSelf: 'center',
        height: 50,
        width: Dimensions.get('window').width * 0.75,
        backgroundColor: '#e06162',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    errorContainer: {
        height: 4,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginLeft: 7
    },
});
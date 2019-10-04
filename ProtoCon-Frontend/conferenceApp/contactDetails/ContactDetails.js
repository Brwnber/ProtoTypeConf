import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { withNavigation } from 'react-navigation';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { withOAuth } from 'aws-amplify-react-native';

import { AppText, AppTextBold, AppTextBlack } from '../../common/AppText';
import { AccountConsumer } from '../../common/AccountContext';
import { addContact } from './../../graphql/mutations';

class ContactDetails extends React.Component {

    linkedIn = null;
    twitter = null;
    website = null;
    contactSaved = false;

    openLink(url) {
        stringUrl = url;
        if (stringUrl.indexOf('http') === -1)
            stringUrl = 'https://' + url;

        if (url !== '')
            Linking.openURL(stringUrl).catch((err) => console.error('An error occurred', err));
    }

    getFields() {
        const { data } = this.props;

        if (data.linkedIn !== null) {
            this.linkedIn = <AppTextBold style={styles.infoUrlText}>
                {data.linkedIn}
            </AppTextBold>;
        } else {
            this.linkedIn = <AppText style={styles.placeHolderText}>
                {'LinkedIn Profile'}
            </AppText>;
        }

        if (data.twitter !== null) {
            this.twitter = <AppTextBold style={styles.infoUrlText}>
                {data.twitter}
            </AppTextBold>;
        } else {
            this.twitter = <AppText style={styles.placeHolderText}>
                {'Twitter Profile'}
            </AppText>;
        }

        if (data.website !== null) {
            this.website = <AppTextBold style={styles.infoUrlText}>
                {data.website}
            </AppTextBold>;
        } else {
            this.website = <AppText style={styles.placeHolderText}>
                {'Personal Website'}
            </AppText>;
        }
    }

    async saveContact() {
        const { client, data, navigation } = this.props;
        const userEmail = this.props.oAuthUser.signInUserSession.idToken.payload.email;
        await client.mutate({
            mutation: gql`${addContact}`,
            variables: {
                email: userEmail,
                contact:
                {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    location: data.location
                }
            }
        });

        navigation.navigate('Profile', { businessCard: false })
    }

    render() {

        const contact = this.props.data;
        const { navigation } = this.props;

        this.getFields();

        return (
            <View style={styles.container}>
                <View style={styles.name}><AppTextBlack style={styles.nameText}>{contact.firstName}</AppTextBlack></View>
                <View style={styles.lastName}><AppTextBlack style={styles.lastNameText}>{contact.lastName}</AppTextBlack></View>
                <View style={styles.occupation}><AppTextBlack style={styles.occupationText}>{contact.jobTitle}</AppTextBlack></View>
                <Image style={styles.qrCode} source={{ uri: contact.qrCode }} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Image source={require('../../assets/icons/map-pin.png')} />
                        {<AppText style={contact.location !== null ? styles.infoText : styles.placeHolderText}>
                            {contact.location !== null ? contact.location : 'Location'}
                        </AppText>}
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../assets/icons/mail.png')} />
                        <AppText style={contact.email !== null ? styles.infoText : styles.placeHolderText}>
                            {contact.email !== null ? contact.email : 'Email'}
                        </AppText>
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../assets/icons/phone.png')} />
                        <AppText style={contact.phoneNumber !== null ? styles.infoText : styles.placeHolderText}>
                            {contact.phoneNumber !== null ? contact.phoneNumber : 'Phone Number'}
                        </AppText>
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../assets/icons/linkedin.png')} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.openLink(contact.linkedIn)}>
                            {this.linkedIn}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../assets/icons/twitter.png')} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.openLink(contact.twitter)}>
                            {this.twitter}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../assets/icons/link.png')} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.openLink(contact.website)}>
                            {this.website}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../assets/icons/user.png')} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.openLink('https://people.accenture.com/People/user/' + contact.email.substring(0, contact.email.indexOf("@")))}>
                            <AppTextBold style={styles.infoUrlText}>Accenture People Profile</AppTextBold>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contactDetailsFooter}>
                        <AccountConsumer>
                            {({ account }) =>
                                (
                                    account.contacts.find(c => c.email === contact.email) || this.contactSaved ?

                                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Profile', { businessCard: false })}>
                                            < AppTextBold style={styles.contactDetailsFooterText}>Saved to My Contacts</AppTextBold>
                                        </TouchableOpacity>

                                        :

                                        <TouchableOpacity activeOpacity={0.9} style={styles.buttonStyle} onPress={async () => await this.saveContact()}>
                                            < AppTextBold style={styles.buttonText}>Save to My Contacts</AppTextBold>
                                        </TouchableOpacity>
                                )
                            }
                        </AccountConsumer>
                    </View>
                </ScrollView>
            </View >
        );
    }
}

export default withOAuth(withNavigation(withApollo(ContactDetails)));


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch'
    },
    name: {
        width: Dimensions.get('window').width * 0.6
    },
    nameText: {
        paddingTop: 21.8,
        fontSize: 22,
        color: '#1b164a',
        marginLeft: 20,
        lineHeight: 28,
        letterSpacing: -0.2,
    },
    lastName: {
        width: Dimensions.get('window').width * 0.6
    },
    lastNameText: {
        fontSize: 22,
        color: '#1b164a',
        marginLeft: 20,
        lineHeight: 28,
        letterSpacing: -0.2,
    },
    occupation: {
        width: Dimensions.get('window').width * 0.5
    },
    occupationText: {
        paddingTop: 9,
        fontSize: 15,
        color: '#1b164a',
        marginLeft: 20,
        letterSpacing: -0.2,
        marginBottom: 15
    },
    qrCode: {
        position: 'absolute',
        marginTop: 9,
        top: -5,
        right: 0,
        height: 155,
        width: 155
    },
    infoBox: {
        height: 50,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#9b9b9b',
        alignSelf: 'center',
        width: Dimensions.get('window').width - 50,
        alignItems: 'center'
    },
    infoText: {
        fontSize: 15,
        color: '#1b164a',
        marginLeft: 15
    },
    infoUrlText: {
        fontSize: 15,
        color: '#e06162',
        marginLeft: 15
    },
    contactDetailsFooter: {
        alignSelf: 'stretch',
        height: 75,
        fontSize: 17,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    contactDetailsFooterText: {
        color: '#e06162',
        textDecorationLine: 'underline'
    },
    placeHolderText: {
        fontSize: 15,
        color: '#9b9b9b',
        marginLeft: 15
    },
    buttonStyle: {
        height: 50,
        width: Dimensions.get('window').width * 0.75,
        backgroundColor: '#e06162',
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
});
import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { AppText, AppTextBold, AppTextBlack } from '../../../common/AppText';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

class MyContacts extends React.Component {

    render() {
        const { data, navigation } = this.props;
        let contacts = [];

        if (data) {
            contacts = data.contacts.map((contact) => (
                <TouchableOpacity activeOpacity={0.9} key={contact.email} style={styles.contact} onPress={() => navigation.navigate('ContactDetails', contact)}>
                    <Image style={styles.icon} source={{ uri: 'http://fillmurray.com/38/38' }} />
                    <View style={styles.textContainer}>
                        <View style={styles.name}><AppTextBold style={styles.nameText} numberOfLines={1}>{`${contact.firstName} ${contact.lastName}`}</AppTextBold></View>
                        <View style={styles.location}><AppText style={styles.locationText}>{contact.location}</AppText></View>
                    </View>
                </TouchableOpacity>
            ));
        }

        return (
            <View style={styles.container}>
                <View style={styles.contactsList}>
                    {contacts}
                </View>
            </View>
        );
    }
}
export default withNavigation(MyContacts);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
    },
    contactsList: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    contact: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomColor: '#9b9b9b',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    textContainer: {
        alignSelf: 'stretch',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    icon: {
        paddingLeft: 10,
        marginLeft: 10,
        marginRight: 15,
        borderRadius: 19,
        width: 40,
        height: 40
    },
    name: {
        width: Dimensions.get('window').width * 0.8
    },
    nameText: {
        color: '#1b164a',
        fontSize: 15
    },
    location: {
        width: Dimensions.get('window').width * 0.8
    },
    locationText: {
        fontSize: 15,
        color: '#1b164a',
    },
    qrCodeBtnContainer: {
        alignSelf: 'stretch',
        flex: 1,
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
        color: 'white'
    }

});
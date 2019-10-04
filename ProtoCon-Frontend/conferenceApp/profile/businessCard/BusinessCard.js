import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Image, ScrollView, Linking, BackHandler } from 'react-native';
import { AppText, AppTextBold, AppTextBlack } from '../../../common/AppText';
import { withNavigation } from 'react-navigation';

class BusinessCard extends React.Component {

    linkedIn = null;
    twitter = null;
    website = null;

    componentDidMount() {
        didFocusSubscription = this.props.navigation.addListener('didFocus', () => {
            console.log('BusinessCard focused');
            this.props.refetch();
        });
    }

    componentWillUnmount() {
        didFocusSubscription.remove();
    }

    openLink(url) {
        if (url !== '' && url !== null) {
            if (url.indexOf('http') === -1) {
                url = 'https://' + url;
            }

            Linking.openURL(url).catch((err) => console.error('An error occurred', err));
        }

    }

    getFields() {
        const { data } = this.props;

        if (data.linkedIn !== null) {
            this.linkedIn =
                <AppTextBold style={styles.infoUrlText}>
                    {data.linkedIn}
                </AppTextBold>;
        } else {
            this.linkedIn =
                <AppText style={styles.placeHolderText}>
                    {'LinkedIn Profile'}
                </AppText>;
        }

        if (data.twitter !== null) {
            this.twitter =
                <AppTextBold style={styles.infoUrlText}>
                    {data.twitter}
                </AppTextBold>;
        } else {
            this.twitter =
                <AppText style={styles.placeHolderText}>
                    {'Twitter Profile'}
                </AppText>;
        }

        if (data.website !== null) {
            this.website =
                <AppTextBold style={styles.infoUrlText}>
                    {data.website}
                </AppTextBold>;
        } else {
            this.website =
                <AppText style={styles.placeHolderText}>
                    {'Personal Website'}
                </AppText>;
        }
    }

    render() {

        const { data } = this.props;
        
        this.getFields();

        return (
            <View style={styles.container}>
                <View style={styles.name}><AppTextBlack style={styles.nameText}>{data.firstName}</AppTextBlack></View>
                <View style={styles.name}><AppTextBlack style={styles.nameText}>{data.lastName}</AppTextBlack></View>
                <View style={styles.jobTitle}><AppTextBlack style={styles.jobTitleText}>{data.jobTitle}</AppTextBlack></View>
                <Image style={styles.qrCode} source={{ uri: data.qrCode }} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Image source={require('../../../assets/icons/map-pin.png')} />
                        {<AppText style={data.location !== null ? styles.infoText : styles.placeHolderText}>
                            {data.location !== null ? data.location : 'Location'}
                        </AppText>}
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../../assets/icons/mail.png')} />
                        <AppText style={data.email !== null ? styles.infoText : styles.placeHolderText}>
                            {data.email !== null ? data.email : 'Email'}
                        </AppText>
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../../assets/icons/phone.png')} />
                        <AppText style={data.phoneNumber !== null ? styles.infoText : styles.placeHolderText}>
                            {data.phoneNumber !== null ? data.phoneNumber : 'Phone Number'}
                        </AppText>
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../../assets/icons/linkedin.png')} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.openLink(data.linkedIn)}>
                            {this.linkedIn}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../../assets/icons/twitter.png')} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.openLink(data.twitter)}>
                            {this.twitter}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../../assets/icons/link.png')} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.openLink(data.website)}>
                            {this.website}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../../assets/icons/user.png')} />
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.openLink('https://people.accenture.com/People/user/' + data.email.substring(0, data.email.indexOf("@")))}>
                            <AppTextBold style={styles.infoUrlText}>Accenture People Profile</AppTextBold>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
export default withNavigation(BusinessCard);

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        flex: 1
    },
    nameText: {
        paddingTop: 5,
        fontSize: 22,
        color: '#1b164a',
        marginLeft: 15,
        lineHeight: 28,
        letterSpacing: -0.2
    },
    name: {
        width: Dimensions.get('window').width * 0.5
    },
    jobTitleText: {
        marginTop: 4,
        fontSize: 15,
        color: '#1b164a',
        marginLeft: 15,
        letterSpacing: -0.2,
        marginBottom: 15
    },
    jobTitle: {
        width: Dimensions.get('window').width * 0.5
    },
    qrCode: {
        position: 'absolute',
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
    placeHolderText: {
        fontSize: 15,
        color: '#9b9b9b',
        marginLeft: 15
    },
    infoUrlText: {
        fontSize: 15,
        color: '#e06162',
        marginLeft: 15
    },
});
import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

import { AppText, AppTextBold, AppTextBlack } from '../../../common/AppText';

import { withNavigation } from 'react-navigation';

export class DefaultResult extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <AppTextBlack style={styles.text}>Find your event by</AppTextBlack>
                <AppTextBlack style={styles.textSecond}>event name</AppTextBlack>
            </View>
        );
    }
}

class ResultsFound extends React.Component {

    render() {
        const { results } = this.props;
        let conferences = [];

        if (results) {
            conferences = results.map(({ id, name, city }) => (
                <TouchableOpacity activeOpacity={0.9} key={id} style={styles.conference} onPress={() => this.props.navigation.navigate('ConferenceDetails', { id: id })}>
                    <Image style={styles.icon} source={{ uri: 'http://fillmurray.com/38/38' }} />
                    <View style={styles.textContainer}>
                        <View style={styles.name}><AppTextBold style={styles.nameText} numberOfLines={1}>{name}</AppTextBold></View>
                        <View style={styles.location}><AppText style={styles.locationText}>{city}</AppText></View>
                    </View>
                </TouchableOpacity>
            ));
        }

        return (
            <View style={styles.container}>
                <View style={styles.conferenceList}>
                    {conferences}
                </View>
                <TouchableOpacity activeOpacity={0.9} style={styles.findByLocContainer}
                    onPress={() => this.props.navigation.navigate('ConferencesByLocation')}>
                    <View style={styles.flexRow}>
                        <AppTextBold style={styles.findByLocText}>Find a conference by location</AppTextBold>
                        <Icon name="md-arrow-forward" type='ionicon' color='#e06162'></Icon>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
export default withNavigation(ResultsFound);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    text: {
        marginTop: 10,
        color: '#1b164a',
        fontSize: 16.4
    },
    textSecond: {
        color: '#1b164a',
        fontSize: 16.4
    },
    sadSearch: {
        marginTop: 20
    },
    conferenceList: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    conference: {
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
        width: Dimensions.get('window').width * 0.8,
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
        color: '#1b164a'
    },
    findByLocContainer: {
        marginTop: 25,
        flexDirection: 'row'
    },
    findByLocText: {
        color: '#e06162',
        fontSize: 17,
        marginRight: 5
    },
    flexRow: {
        flexDirection: 'row'
    }
});
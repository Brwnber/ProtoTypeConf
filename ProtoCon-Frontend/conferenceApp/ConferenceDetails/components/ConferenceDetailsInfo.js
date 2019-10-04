import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import moment from 'moment-timezone';

import MapPinSvg from '../../../assets/svg/map-pin';
import ClockSvg from '../../../assets/svg/clock';
import FileTextSvg from '../../../assets/svg/file-text';
import { ThemeContext } from '../../../common/Themes';

import { AppTextBold, AppText, AppTextBlack } from '../../../common/AppText';
import { ConferenceDetailsAlert } from './ConferenceDetailsAlert';

export default class ConferenceDetailsInfo extends React.Component {

    render() {
        return (
            <ThemeContext.Consumer>
                {(theme) => (
                    <View style={[{ backgroundColor: theme.primary }, styles.conferenceInformationContainer]}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => ConferenceDetailsAlert()} style={[{ backgroundColor: theme.alt }, styles.shareContainer]}>
                            <Image source={require('../../../assets/images/share.png')}></Image>
                        </TouchableOpacity>
                        <View style={styles.informationTextContainer}>
                            <AppTextBlack style={[{ color: theme.primaryText }, styles.title]}>{this.props.name}</AppTextBlack>
                            <View style={styles.timeContainer}>
                                <ClockSvg stroke={theme.icons} />
                                <AppText style={[{ color: theme.primaryText }, styles.details]}>{`${moment(this.props.startTime).tz('America/New_York').format('MMMM D, YYYY [to] hh:mm a [–]')}\n ${moment(this.props.endTime).tz('America/New_York').format('MMMM D, YYYY [at] hh:mm a z')}`}</AppText>
                            </View>
                            <View style={styles.addressContainer}>
                                <MapPinSvg stroke={theme.icons} />
                                <AppText style={[{ color: theme.primaryText }, styles.details]}>{this.props.address}</AppText>
                            </View>
                            <View style={styles.mapContainer}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                                    <AppTextBold style={[{ color: theme.alt }, styles.mapText]}>View Map</AppTextBold>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.descriptionContainer}>
                                <FileTextSvg stroke={theme.icons} />
                                <AppText style={[{ color: theme.primaryText }, styles.details]}>{this.props.description}</AppText>
                            </View>
                        </View>
                    </View>
                )}
            </ThemeContext.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    shareContainer: {
        width: 40,
        height: 40,
        borderRadius: 40,
        position: 'absolute',
        top: -20,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    conferenceInformationContainer: {
        minHeight: 300,
        width: '100%',
    },
    informationTextContainer: {
        width: '100%',
        marginLeft: 25,
    },
    title: {
        fontSize: 24,
        marginTop: 15
    },
    timeContainer: {
        marginTop: 25,
        height: 50,
        width: '85%',
        flexDirection: 'row',
    },
    addressContainer: {
        marginTop: 15,
        minHeight: 40,
        maxHeight: 85,
        width: '85%',
        flexDirection: 'row',
    },
    mapContainer: {
        height: 25,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: 35
    },
    mapText: {
        fontSize: 17,
    },
    descriptionContainer: {
        marginTop: 20,
        minHeight: 25,
        maxHeight: 120,
        width: '85%',
        flexDirection: 'row',
    },
    details: {
        marginLeft: 15,
        fontSize: 17,
    },
});
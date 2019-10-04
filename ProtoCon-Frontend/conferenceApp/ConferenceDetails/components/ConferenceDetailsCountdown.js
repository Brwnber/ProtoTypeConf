import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Moment from 'moment';

import { AppTextBold, AppText, AppTextBlack } from '../../../common/AppText';
import { ThemeContext } from '../../../common/Themes';

export default class ConferenceDetailsCountdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            now: new Date(),
        }
    }

    render() {

        Moment.locale('en');
        days = Moment(this.props.startTime).diff(this.state.now, 'days');
        hours = Moment(this.props.startTime).diff(this.state.now, 'hours') - days * 24;
        minutes = Moment(this.props.startTime).diff(this.state.now, 'minutes') - ((days * 24 + hours) * 60);

        return (
            <ThemeContext.Consumer>
                {(theme) => (
                    <View style={[{ backgroundColor: theme.secondaryBackground }, styles.countdownContainer]}>
                        <AppTextBold style={[{ color: theme.primaryText }, styles.countdownTitle]}>Countdown to Event:</AppTextBold>
                        <View style={styles.countdownTimersContainer}>
                            <View style={[{ backgroundColor: theme.circleColorOne }, styles.countdownCircle]}>
                                <View style={styles.countdownCircleContainer}>
                                    <AppTextBold style={[{ color: theme.altText }, styles.blueTextNumber]}>{days}</AppTextBold>
                                    <AppTextBold style={[{ color: theme.altText }, styles.whiteText]}>days</AppTextBold>
                                </View>
                            </View>
                            <View style={[{ backgroundColor: theme.circleColorTwo }, styles.countdownCircle]}>
                                <View style={styles.countdownCircleContainer}>
                                    <AppTextBold style={[{ color: theme.primaryText }, styles.blueTextNumber]}>{hours}</AppTextBold>
                                    <AppTextBold style={[{ color: theme.primaryText }, styles.blueText]}> hours</AppTextBold>
                                </View>
                            </View>
                            <View style={[{ backgroundColor: theme.circleColorThree }, styles.countdownCircle]}>
                                <View style={styles.countdownCircleContainer}>
                                    <AppTextBold style={[{ color: theme.primaryText }, styles.blueTextNumber]}>{minutes}</AppTextBold>
                                    <AppTextBold style={[{ color: theme.primaryText }, styles.blueText]}> minutes</AppTextBold>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </ThemeContext.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    countdownContainer: {
        height: 190,
        width: Dimensions.get('window').width,
        flexDirection: 'column'
    },
    countdownTitle: {
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        fontSize: 19,
    },
    countdownTimersContainer: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    countdownCircle: {
        width: 107,
        height: 107,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    countdownCircleContainer: {
        height: 55,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    whiteTextNumber: {
        fontSize: 48,
        height: 53
    },
    whiteText: {
        fontSize: 17,
    },
    blueTextNumber: {
        fontSize: 48,
        height: 53
    },
    blueText: {
        fontSize: 17,
    },
});
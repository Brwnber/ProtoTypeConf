import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import {Icon} from 'react-native-elements';

import { AppText, AppTextBold, AppTextBlack } from '../../../common/AppText';
import { ThemeContext } from '../../../common/Themes';

export default class CalendarGrid extends React.Component {

    render() {
        const {goToNextDay, showTomorrowLink} = this.props;
        let viewTomorrowSchedule = null;
        if(showTomorrowLink === true) {
            viewTomorrowSchedule =  
                <ThemeContext.Consumer>
                    {(theme) => (
                        <TouchableOpacity style={[{borderBottomColor: theme.border}, styles.tomorrow]} onPress={() => goToNextDay()}>
                            <AppTextBold style={[{color: theme.alt}, styles.tomorrowText]}>View Tomorrow's Schedule</AppTextBold>
                            <Icon name='arrow-right' type='font-awesome' color={theme.alt} containerStyle={styles.arrow}/>
                        </TouchableOpacity>
                    )}
                </ThemeContext.Consumer>;
        }
        return (
            <ThemeContext.Consumer>
                {(theme) => (
                    <View style={[{backgroundColor: theme.primary}, styles.tomorrowContainer]}>
                        {viewTomorrowSchedule}
                        <View style={styles.tomorrowBodyContainer}>
                            <AppText style={[{color: theme.primaryText}, styles.tomorrowBody]}>Events will be updated throughout the</AppText>
                            <AppText style={[{color: theme.primaryText}, styles.tomorrowBody]}>conference. If you have any questions, please</AppText>
                            <AppText style={[{color: theme.primaryText}, styles.tomorrowBody]}>stop by the help desk.</AppText>
                        </View>
                    </View>
                )}
            </ThemeContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    tomorrowContainer: {
        alignSelf: 'stretch',
        flex: 1
    },
    tomorrow: {
        flexDirection: 'row',
        marginHorizontal: 15,
        borderBottomWidth: 1,
        height: 60,
        justifyContent: 'flex-start'
    },
    tomorrowText: {
        alignSelf: 'flex-end',
        fontSize: 18,
        marginRight: 10,
        marginBottom: 10
    },
    arrow: {
        alignSelf: 'flex-end',
        marginBottom: 10
    },
    tomorrowBodyContainer: {
        marginLeft: 15,
        marginTop: 15
    },
    tomorrowBody: {
        fontSize: 15,
    }
});
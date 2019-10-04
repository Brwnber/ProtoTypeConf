import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

import { AppText, AppTextBold, AppTextBlack } from '../../../common/AppText';
import { ThemeContext } from '../../../common/Themes';

export default class CalendarGrid extends React.Component {

    render() {
        const {hourCount, firstHour, calendarHeight} = this.props;
        calendarBlocks = [];

        for(let i=0; i < hourCount; i++) {

            const hour = firstHour+i < 13 ? firstHour+i === 0 ? 12 : firstHour+i : firstHour+i - 12

            calendarBlocks.push(
                <ThemeContext.Consumer key={'gridConsumer-'+i}>
                {(theme) => (
                    <View key={'grid-'+i} style={[{borderBottomColor: theme.border}, styles.gridBlock]}>
                        <View style={[{backgroundColor: theme.primary}, styles.gridBlockTime]}>
                            <AppTextBlack style={[{color: theme.calendarTimeText}, styles.timeText]}>{hour}</AppTextBlack>
                            <AppText style={[{color: theme.calendarTimeText}, styles.timeText]}>{firstHour+i < 13 ? 'AM' : 'PM'}</AppText>
                        </View>
                    </View>
                )}
                </ThemeContext.Consumer>
            );
        }

        return(
            <View pointerEvents="none" style={[styles.grid, {height: calendarHeight}]}>
                {calendarBlocks}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    grid: {
        position: 'absolute',
        width: Dimensions.get('window').width,
    },
    gridBlock: {
        height: 125,
        borderBottomWidth: 1.5,
        alignItems: 'flex-start'
    },
    gridBlockTime: {
        width: 60,
        height: 125,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timeText: {
        fontSize: 16,
    },
});
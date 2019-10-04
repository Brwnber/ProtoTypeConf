import React, {Fragment} from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { AppText, AppTextBold, AppTextBlack } from '../../common/AppText';
import {Icon} from 'react-native-elements';

import CalendarGrid from './components/CalendarGrid';
import TomorrowSchedule from './components/TomorrowSchedule';
import CalendarEvents from './components/CalendarEvents';
import CalendarModal from './components/CalendarModal';
import { ThemeContext, themes } from '../../common/Themes';

export default class Calendar extends React.Component {

    firstHour = 8;
    lastHour = 18;
    retrievedData = [];

    sortedDates = [];
    conferenceDates = [];
    filteredEvents = [];

    calendarHeight = 0;

    daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dateValues = [];
    icon = 'sort-down';

    updateSelected = (selected, data) => {
            this.setState({selected: selected});
            this.setState({value: this.daysOfWeek[selected] + ' ' + data.month + '/' + data.date});

            this.setEventList(selected);
    }

    goToNextDay() {
        const count = this.state.selected + 1;
        this.updateSelected(count > 6 ? 0 : count);
    }

    openModal = () => {
        this.setState({modalOpened: true});
        this.icon = 'sort-up';
    }

    closeModal = () => {
        this.setState({modalOpened: false});
        this.icon = 'sort-down';
    }

    parseDates = () => {
        for(let i=0; i < this.sortedDates.length; i++) {
            this.dateValues.push( { label: this.daysOfWeek[this.sortedDates[i].day],
                                    date: this.sortedDates[i].date,
                                    value: this.sortedDates[i].day,
                                    month: this.sortedDates[i].month,
                                    key:'day-'+this.sortedDates[i].day }
                                );
        }
    }

    setEventList = (day) => {
        const conferenceDay = this.conferenceDates.find(date => date.day == day);
        this.filteredEvents = conferenceDay.events.sort((event1, event2) => {
            const date1 = new Date(event1.startDateTime);
            const date2 = new Date(event2.startDateTime);
            return date1 < date2 ? -1 : date1 > date2 ? 1 : 0
        });
    }

    constructor(props) {
        super(props);

        const {data} = this.props;
        this.retrievedData = data.getConference.events;

        this.state = {
            selected: 0,
            value: 'No days available',
            modalOpened: false
        }
        
        if(this.retrievedData.length > 0) {
            //Need to parse the event data first to separate days, adding the days to a dropdown list
            for(let i=0; i<this.retrievedData.length; i++) {
                event = this.retrievedData[i];
                const date = new Date(event.startDateTime);

                const dateIndex = this.conferenceDates.findIndex(obj => obj.date == date.getDate());
                if(dateIndex == -1) {
                    const obj = {"date": date.getDate(), "month": date.getMonth() + 1, "day": date.getDay(), "events": [event]};
                    this.conferenceDates.push(obj);
                } else {
                    this.conferenceDates[dateIndex].events.push(event);
                }
            }

            this.sortedDates = this.conferenceDates.sort((date1, date2) => date1.date < date2.date ? -1 : 1);

            if(this.sortedDates && this.sortedDates[0].day)
            this.setEventList(this.sortedDates[0].day);
            this.parseDates();
            this.goToNextDay = this.goToNextDay.bind(this);
        }
    }

    componentDidMount() {
        if(this.sortedDates[0] && this.sortedDates[0].day)
            this.updateSelected(this.sortedDates[0].day, this.sortedDates[0]);
    }

    findStartEndTimes() {
        //Go through filteredEvents and find the smallest time
        earliestTime = new Date(this.filteredEvents[0].startDateTime);
        latestTime = new Date(this.filteredEvents[0].endDateTime);

        for(event in this.filteredEvents) {
            const eventStartTime = new Date(this.filteredEvents[event].startDateTime);
            const eventEndTime = new Date(this.filteredEvents[event].endDateTime);

            if(eventStartTime.getHours() < earliestTime.getHours()) {
                earliestTime = eventStartTime;
            }
            if(eventEndTime.getHours() > latestTime.getHours()) {
                latestTime = eventEndTime;
            }
        }

        this.firstHour = earliestTime.getHours();
        this.lastHour = latestTime.getHours();
    }

    render() {
        hourCount = 0;

        if(this.filteredEvents.length > 0) {
            this.findStartEndTimes();
            
            hourCount = this.lastHour - this.firstHour + 1;
            this.calendarHeight = hourCount * 125 ;

            if(this.calendarHeight + 275 < Dimensions.get('window').height) {
                this.calendarHeight = Dimensions.get('window').height - 275;
            }
        }

        return (
            <ThemeContext.Consumer>
                {(theme) => (
                    <View style={[{backgroundColor: theme.primary}, styles.container]}>
                        <View style={[{backgroundColor: theme.primary}, styles.daySelectContainer]}>
                            <TouchableOpacity activeOpacity={0.8} style={[{backgroundColor: theme.primary}, styles.daySelectBtn]} onPress={() => this.openModal()}>
                                <AppTextBold style={[{color: theme.alt}, styles.daySelectText]}>{this.state.value}</AppTextBold>
                                <Icon name={this.icon} type='font-awesome' color={theme.alt} containerStyle={this.icon == 'sort-down' ? styles.daySelectDownArrow : styles.daySelectUpArrow}/>
                            </TouchableOpacity>
                        </View>
                        <CalendarModal data={this.dateValues} open={this.state.modalOpened} onClose={this.closeModal} onChange={this.updateSelected}/>
                        <ScrollView showsVerticalScrollIndicator={false}
                                        contentContainerStyle={[styles.calendarContainer, {height: this.calendarHeight + 275, backgroundColor: theme.primary}]}>
                            <CalendarEvents filteredEvents={this.filteredEvents} calendarHeight={this.calendarHeight} firstHour={this.firstHour} lastHour={this.lastHour} id={this.props.id}/>
                            <CalendarGrid hourCount={hourCount} firstHour={this.firstHour} calendarHeight={this.calendarHeight} />
                            <TomorrowSchedule goToNextDay={this.goToNextDay} showTomorrowLink={this.dateValues.length > 0 ? this.state.selected !== this.dateValues[this.dateValues.length-1].value ? true : false : false}/>
                        </ScrollView>
                    </View>
                )}
            </ThemeContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    daySelectContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    daySelectBtn: {
        flexDirection: 'row',
        flex: 0.45,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    daySelectText: {
        fontSize: 18,
        marginRight: 5
    },
    daySelectDownArrow: {
        marginBottom: 7
    },
    daySelectUpArrow: {
        marginTop: 9
    },
    calendarContainer: {
        width: Dimensions.get('window').width
    },
    codeBlockContainer: {
        flexDirection: 'row'
    },
    eventConstants: {
        position: 'absolute',
        borderWidth: 0.5,
        borderColor: '#e9e9e9',
    },
    eventText: {
        paddingTop: 15,
        paddingLeft: 5,
        fontSize: 13
    },
});
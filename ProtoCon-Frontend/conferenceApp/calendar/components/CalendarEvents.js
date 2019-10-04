import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import { AppText, AppTextBold } from '../../../common/AppText';
import { ThemeContext, themes } from '../../../common/Themes';
import colors from '../../../common/Colors';


class CalendarEvents extends React.Component {

    minuteHeight = 25/12;
    MAX_WIDTH = Dimensions.get('window').width - 60;
    firstHour = 8;
    lastHour = 18;

    eventTypes = [];

    events = [];

    codeBlock = [];

    renderEvent = (x, y, width, eventType, height, title, counter, id) => {
        const colorId = this.getEventColor(eventType);
        return (
            <ThemeContext.Consumer key={'consumer'+counter}>
                {(theme) => (
                    <TouchableOpacity activeOpacity={0.8} key={'event-'+counter} style={[styles.eventConstants, {top: y, left: x,
                            width: width, height: height, backgroundColor: theme.schedule[colorId], borderColor: theme.border}]}
                            onPress={() => { this.props.navigation.navigate('EventDetails', {
                                id: id,
                                conferenceId: this.props.id,
                                theme: theme
                            });
                    }}>
                        <AppTextBold style={[{color: theme.primaryText}, styles.eventText]}>{title}</AppTextBold>
                    </TouchableOpacity>
                )}
            </ThemeContext.Consumer>
        );
    }

    scanSurroundingEvents(surroundingEvents, index) {
        highestCount = 0;
        eventsBeforeCount = 0;
        highestSurroundingEvents = [];
        currentSurroundingEvents = [];

        //For each event in the surrounding array
        for(let i=0; i<surroundingEvents.length; i++) {
            //Count the surrounding events for the current event
            count = 0;
            beforeCount = 0;
            currentSurroundingEvents = [];
            //Run through the array again, ignoring the index of the currently selected event.
            for(eventIndex in surroundingEvents) {
                if(i !== eventIndex) {
                    selectedEvent = surroundingEvents[i].event;
                    selectedStartTime = new Date(selectedEvent.startDateTime).getTime();
                    selectedEndTime = new Date(selectedEvent.endDateTime).getTime();

                    surroundingEvent = surroundingEvents[eventIndex].event;
                    surroundingEventStartTime = new Date(surroundingEvent.startDateTime).getTime();
                    surroundingEventEndTime = new Date(surroundingEvent.endDateTime).getTime();
                    
                    if(surroundingEventStartTime > selectedStartTime && surroundingEventStartTime < selectedEndTime ||
                        surroundingEventStartTime < selectedStartTime && surroundingEventEndTime > selectedStartTime ||
                        surroundingEventStartTime === selectedStartTime) {
                            if(surroundingEvents[eventIndex].index < index) {
                                beforeCount++;
                            }
                            count++;
                            testI = surroundingEvents[eventIndex].index;
                            currentSurroundingEvents.push(testI);
                    }
                }
            }
            if(count > highestCount) {
                highestCount = count;
                eventsBeforeCount = beforeCount;
                highestSurroundingEvents = Object.assign([], currentSurroundingEvents);
            }
        }
        testVar = highestSurroundingEvents;
        this.events[index].surroundingEvents = testVar;
        return {"count": highestCount, "beforeCount": eventsBeforeCount};
    }

    findDatesWithinTimeFrame = (start, end, index) => {
        eventsPlacedBefore = 0;
        eventsPlacedAfter = 0;
        surroundingEvents = [];

        const {filteredEvents} = this.props;

        for(let i=0; i<filteredEvents.length; i++) {
            if(i !== index) {
                event = filteredEvents[i];
                otherEventsStartTime = new Date(event.startDateTime).getTime();
                otherEventsEndTime = new Date(event.endDateTime).getTime();
                
                if(otherEventsStartTime > start.getTime() && otherEventsStartTime < end.getTime() ||
                        otherEventsStartTime < start.getTime() && otherEventsEndTime > start.getTime() ||
                        otherEventsStartTime === start.getTime()) {
                    surroundingEvents.push({"event":event, "index": i});
                }
            }
        }

        numberOfSurroundingEvents = this.scanSurroundingEvents(surroundingEvents, index);

        dimensions = this.calculateEventDimensions( numberOfSurroundingEvents.beforeCount, numberOfSurroundingEvents.count,
                                                    start.getHours(), start.getMinutes() );
        return dimensions;
    }

    calculateEventDimensions(eventsBeforeCount, surroundingEventCount, startHour, startMinute) {
        width = this.MAX_WIDTH / (surroundingEventCount + 1);
        x = eventsBeforeCount * width;

        firstHourInMinutes = this.firstHour * 60;
        startInMinutes = startHour*60 + startMinute;
        y = (startInMinutes - firstHourInMinutes) * this.minuteHeight;

        return ({"x": x, "y": y, "width": width});
    }

    getEventColor = (eventType) => {
        colorId = this.eventTypes.indexOf(eventType);
        //key = Object.keys(colors)[colorId];
        
        return colorId;
    }

    doubleCheckEventWidth() {
        for(index in this.events) {
            surroundingEvents = this.events[index].surroundingEvents;
            xLoc = this.events[index].x;
            eventWidth = this.events[index].width;
        
            if(surroundingEvents.length > 0) {
                for(event in surroundingEvents) {
                    surroundingIndex = surroundingEvents[event];

                    if(surroundingIndex === index - 1) {
                        previousEventEndPoint = this.events[surroundingIndex].x + this.events[surroundingIndex].width;
                        if(previousEventEndPoint !== xLoc) {
                            this.events[index].x = previousEventEndPoint;
                            this.events[index].width = eventWidth + (xLoc - previousEventEndPoint);
                        }
                    } else if(surroundingIndex === index + 1) { //SurroundingEvent is right after it.
                        followingEventStartPoint = this.events[surroundingIndex].x;
                        if(followingEventStartPoint !== xLoc + eventWidth) {
                            emptySpace = followingEventStartPoint - (xLoc + eventWidth);
                            this.events[index].width = eventWidth + emptySpace;
                        }
                    }
                }
            }
        }
    }

    render() {
        this.codeBlock = [];
        this.events = [];
        const {filteredEvents, calendarHeight, firstHour, lastHour} = this.props;
        this.firstHour = firstHour;
        this.lastHour = lastHour;

        for(let i=0; i<filteredEvents.length; i++) {
            start = new Date(filteredEvents[i].startDateTime);
            end = new Date(filteredEvents[i].endDateTime);

            type = filteredEvents[i].type;
            if(this.eventTypes.indexOf(type) === -1) {
                this.eventTypes.push(type);
            }

            height = Math.floor(Math.abs(start.getTime() - end.getTime()) / 60000) * this.minuteHeight;
            
            this.events.push({"id": filteredEvents[i].id, "height": height, "name": filteredEvents[i].name, "type": type, "start": start, "end": end,
            "x": 0, "y": 0, "width": 0 });

            eventLocation = this.findDatesWithinTimeFrame(start, end, i);

            this.events[i].x = eventLocation.x;
            this.events[i].y = eventLocation.y;
            this.events[i].width = eventLocation.width;

            if(start.getHours() < this.firstHour)
                this.firstHour = start.getHours();
            if(end.getHours() > this.lastHour)
                this.lastHour = end.getHours();
        }

        this.doubleCheckEventWidth();

        for(index in this.events) {
            event = this.events[index];
            date = this.renderEvent(event.x, event.y, event.width, event.type, event.height, event.name, index, event.id);
            this.codeBlock.push(date);
        }

        return(
            <ThemeContext.Consumer>
                {(theme) => (
                    <View style={[styles.calendarEventsContainer, {height: calendarHeight, backgroundColor: theme.primary}]}>
                        {this.codeBlock}
                    </View>
                )}
            </ThemeContext.Consumer>
        );
    }
}
export default withNavigation(CalendarEvents);

const styles = StyleSheet.create({
    calendarEventsContainer: {
        alignSelf: 'stretch',
        marginLeft: 60
    },
    eventConstants: {
        position: 'absolute',
        borderWidth: 0.5,
    },
    eventText: {
        paddingTop: 15,
        paddingLeft: 5,
        fontSize: 13,
    },
});
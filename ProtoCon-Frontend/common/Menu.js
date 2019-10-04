import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity, TouchableHighlight, Text, Button, Alert } from 'react-native';
import { AppText, AppTextBold, AppTextBlack } from './AppText';

export class Menu extends React.Component {

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.categoriesContainer}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.close} onPress={() => this.props.navigation.closeDrawer()}>
                        <Image source={require('../assets/icons/x-circle.png')} />
                        <AppText style={styles.closeText}>Close</AppText>
                    </TouchableOpacity>
                    <View style={styles.categoryHeaders}>
                        <View style={styles.myItemsContainer}>
                            <AppTextBold style={styles.myItemsHeader}>My Items</AppTextBold>
                        </View>
                        <View style={styles.myItemsList}>
                            <TouchableHighlight underlayColor={'#c95455'} style={styles.MyItemsItem} onPress={() => this.props.navigation.navigate('Profile', { businessCard: true })}>
                                <View style={styles.MyItemsView}>
                                    <Image source={require('../assets/icons/bizcard.png')} />
                                    <AppText style={styles.MyItemsItemText}>My Business Card</AppText>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={'#c95455'} style={styles.MyItemsItem} onPress={() => this.props.navigation.navigate('Profile', { businessCard: false })}>
                                <View style={styles.MyItemsView}>
                                    <Image source={require('../assets/icons/users.png')} />
                                    <AppText style={styles.MyItemsItemText}>My Contacts</AppText>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={'#c95455'} style={styles.MyItemsItem} onPress={() => this.props.navigation.navigate('BookmarkDetails')}>
                                <View style={styles.MyItemsView}>
                                    <Image source={require('../assets/icons/bookmark.png')} />
                                    <AppText style={styles.MyItemsItemText}>My Bookmarked Sessions</AppText>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={'#c95455'} style={styles.MyItemsItem} onPress={this.pressBtn}>
                                <View style={styles.MyItemsView}>
                                    <Image source={require('../assets/icons/settings.png')} />
                                    <AppText style={styles.MyItemsItemText}>Edit My Account Details</AppText>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={styles.categoryHeaders}>
                        <View style={styles.myEventsContainer}>
                            <AppTextBold style={styles.myEventsHeader}>My Events</AppTextBold>
                        </View>
                        <View style={styles.myEventsList}>
                            <TouchableHighlight underlayColor={'#c95455'} style={styles.MyEventsItem} onPress={() => this.props.navigation.navigate('Calendar')}>
                                <AppText style={styles.MyEventsItemText}>Event Schedule</AppText>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={'#c95455'} style={styles.MyEventsItem} onPress={this.pressBtn}>
                                <AppText style={styles.MyEventsItemText}>Q&A Panel Feed</AppText>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor={'#c95455'} style={styles.MyEventsItem} onPress={this.pressBtn}>
                                <AppText style={styles.MyEventsItemText}>Venue Map</AppText>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.switch} 
                    onPress={() => {Alert.alert(
                    'Are you sure you would like to switch events?',
                    'This action will take you to the home screen',
                    [
                      {text: 'Go Back', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                      {text: 'OK', onPress: () => this.props.navigation.navigate('Home')}
                    ],
                    {cancelable: true},
                    );}}>
                        <Image source={require('../assets/icons/refresh.png')} />
                        <AppText style={styles.switchText}>Switch Event</AppText>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#e06162',
        alignSelf: 'stretch'
    },
    categoriesContainer: {
        flex: 0.9
    },
    close: {
        marginTop: 10,
        flex: 0.1,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 15
    },
    closeText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 10
    },
    categoryHeaders: {
        alignSelf: 'stretch',
        flex: 0.45,
        marginTop: 5
    },
    myItemsContainer: {
        marginLeft: 15,
        marginRight: 15,
        paddingBottom: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    myItemsHeader: {
        color: 'white',
        fontSize: 17
    },
    myItemsList: {
        marginTop: 5
    },
    MyItemsView: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 15
    },
    MyItemsItem: {
        height: 60,
    },
    MyItemsItemText: {
        fontSize: 15,
        color: 'white',
        marginLeft: 10
    },
    myEventsContainer: {
        marginLeft: 15,
        marginRight: 15,
        paddingBottom: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    myEventsHeader: {
        color: 'white',
        fontSize: 17
    },
    myEventsList: {
        marginTop: 5
    },
    MyEventsItem: {
        height: 60,
        justifyContent: 'center'
    },
    MyEventsItemText: {
        fontSize: 15,
        color: 'white',
        marginLeft: 15
    },
    switch: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.1,
        backgroundColor: '#c95455',
        paddingLeft: 20
    },
    switchText: {
        color: 'white',
        fontSize: 17,
        marginLeft: 12
    }
});
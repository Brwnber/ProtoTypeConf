import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import Moment from 'react-moment';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { AppText, AppTextBold, AppTextBlack } from '../../common/AppText';
import { updateAccount, addBookmark } from './../../graphql/mutations';
import { withOAuth } from 'aws-amplify-react-native';
import { AccountConsumer } from '../../common/AccountContext';
import { ThemeContext } from '../../common/Themes';

import MapPinSvg from '../../assets/svg/map-pin';
import ClockSvg from '../../assets/svg/clock';
import UserSvg from '../../assets/svg/user';
import FileTextSvg from '../../assets/svg/user';
import CheckSvg from '../../assets/svg/check';
import { NavigationEvents } from 'react-navigation';

class EventDetails extends React.Component {

    state = {
        bookmarked: false
    };

   
    udpateBookmarks() {
        this.bookmarkEvent();
        this.addNewBookmark();
    }

    bookmarkEvent() {
        this.setState({ bookmarked: true });
    }

    async addNewBookmark() {
        const { data, id, conferenceId, oAuthUser } = this.props;
        let username = null;
        console.log('eventdetails props', this.props);
        if (this.props.oAuthUser) {
            username = this.props.oAuthUser.signInUserSession.idToken.payload.email;
        }
        console.log('username', username);

        const { client } = this.props;
        console.log('data', data);

        const result = await client.mutate({
            mutation: gql`${addBookmark}`,
            variables: {
                email: username,
                bookmarks:
                    {
                        id: data.id,
                        name: data.name,
                        startDateTime: data.startDateTime,
                        endDateTime: data.endDateTime
                    }
                }        
            });
        console.warn(result);
    }


    render() {
        tags = [];
        const { data, id, conferenceId, oAuthUser } = this.props;

        for (let index in data.tags) {
            tags.push(
                <ThemeContext.Consumer key={'event' + index}>
                    {(theme) => (
                        <View key={index} style={[{ backgroundColor: theme.circleColorTwo }, styles.tag]}>
                            <AppTextBold style={styles.tagText}>{data.tags[index]}</AppTextBold>
                        </View>
                    )}
                </ThemeContext.Consumer>
            );
        }

        const bookmarkIcon = this.state.bookmarked === false ? <Image source={require('../../assets/icons/bookmark.png')} /> : null;
        const bookmarkSaved = this.state.bookmarked === false ? <ThemeContext.Consumer>
                                                                    {(theme) => (
                                                                        <TouchableOpacity activeOpacity={0.9} disabled style={[{ backgroundColor: theme.primary }, styles.bookmarkBtnPressed]}>
                                                                            <AppTextBold style={styles.bookmarkTextPressed}>Saved to My Bookmarks</AppTextBold>
                                                                            </TouchableOpacity>)}
                                                                </ThemeContext.Consumer>
                                                                : null;
                                                                    
        const bookmarkNotSaved = this.state.bookmarked === false ? <ThemeContext.Consumer>
                                                                        {(theme) => (
                                                                            <TouchableOpacity activeOpacity={0.9} style={[{ backgroundColor: theme.circleColorTwo }, styles.bookmarkBtn]} onPress={async () => await this.udpateBookmarks()}>
                                                                                {bookmarkIcon}
                                                                                <AppTextBold style={styles.bookmarkText}>Bookmark Session</AppTextBold>
                                                                            </TouchableOpacity>)}
                                                                    </ThemeContext.Consumer>
                                                                    : 
                                                                    <ThemeContext.Consumer>
                                                                        {(theme) => (
                                                                            <TouchableOpacity activeOpacity={0.9} disabled style={[{ backgroundColor: theme.primary }, styles.bookmarkBtnPressed]} onPress = {() => navigation.navigate('BookmarkDetails')}>
                                                                                <AppTextBold style={styles.bookmarkTextPressed}>Saved to My Bookmarks</AppTextBold>
                                                                            </TouchableOpacity>)}
                                                                    </ThemeContext.Consumer>;

        return (
            <ThemeContext.Consumer>
                {(theme) => (
                    <View style={[{ backgroundColor: theme.primary }, styles.container]}>
                        <AppTextBlack style={[{ color: theme.primaryText }, styles.title]}>{data.name}</AppTextBlack>
                        <View style={styles.tagContainer}>
                            {tags}
                        </View>
                        <View style={styles.description}>
                            <AppText style={[{ color: theme.primaryText }, styles.descriptionText]}>{data.description}</AppText>
                        </View>
                        <View style={styles.eventDetail}>
                            <MapPinSvg stroke={theme.icons} />
                            <AppText style={[{ color: theme.primaryText }, styles.eventDetailText]}>{data.location}</AppText>
                        </View>
                        <View style={styles.eventDetail}>
                            <ClockSvg stroke={theme.icons} />
                            <Moment element={AppText} style={[{ color: theme.primaryText }, styles.eventDetailText]} date={data.startDateTime} format="hh:mm a[-]"></Moment>
                            <Moment element={AppText} style={[{ color: theme.primaryText }, styles.endTime]} date={data.endDateTime} format="hh:mm a"></Moment>
                        </View>
                        <View style={styles.eventDetail}>
                            <UserSvg stroke={theme.icons} />
                            <AppText style={[{ color: theme.primaryText }, styles.eventDetailText]}>{data.speaker}</AppText>
                        </View>
                        <View style={styles.eventDetail}>
                            <FileTextSvg stroke={theme.icons} />
                            <AppText style={[{ color: theme.primaryText }, styles.eventDetailText]}>{data.type}</AppText>
                        </View>
                        <View style={styles.notes}>
                            <CheckSvg stroke={theme.icons} />
                            <AppText style={[{ color: theme.primaryText }, styles.notesText]}>{data.notes}</AppText>
                        </View>
                        <View style={styles.bookmarkContainer}>
                            <AccountConsumer>
                                {({ account }) =>
                                    (
                                        account.bookmarks.find(b => b.id === data.id) ?
                                            bookmarkSaved
                                            :
                                            bookmarkNotSaved
                                        // <AppTextBold style={this.state.bookmarked === false ? styles.bookmarkText : styles.bookmarkTextPressed}>
                                        // {this.state.bookmarked === false ? 'Bookmark Session' : 'Saved to My Bookmarks'}
                                        // </AppTextBold>
                                    )
                                }
                            </AccountConsumer>
                            {/* {bookmarkIcon}
                                <AppTextBold style={this.state.bookmarked === false ? [{color: theme.altText}, styles.bookmarkText] : [{color: theme.circleColorTwo, backgroundColor: theme.primary}, styles.bookmarkTextPressed]}>
                                    {this.state.bookmarked === false ? 'Bookmark Session' : 'Saved to My Bookmarks'}
                                </AppTextBold> */}
                        </View>
                    </View>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default withOAuth(withApollo(EventDetails));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        fontSize: 24,
        marginTop: 15,
        marginLeft: 20
    },
    tagContainer: {
        height: 50,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        marginLeft: 20
    },
    tag: {
        height: 25,
        borderRadius: 10.5,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    tagText: {
        fontSize: 16,
        color: '#fff'
    },
    description: {
        alignSelf: 'stretch',
        marginTop: 5,
        minHeight: 40,
        marginLeft: 20
    },
    descriptionText: {
        fontSize: 16,
        letterSpacing: -0.2
    },
    eventDetail: {
        height: 60,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#9b9b9b',
        alignSelf: 'center',
        width: Dimensions.get('window').width - 40,
        alignItems: 'center'
    },
    eventDetailText: {
        fontSize: 18,
        marginLeft: 15
    },
    endTime: {
        fontSize: 18,
    },
    notes: {
        height: 60,
        flexDirection: 'row',
        width: Dimensions.get('window').width - 40,
        marginLeft: 20,
        marginRight: 20,
        alignSelf: 'center',
        alignItems: 'center'
    },
    notesText: {
        fontSize: 18,
        marginLeft: 15
    },
    bookmarkContainer: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    bookmarkBtn: {
        height: 50,
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.75,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 25
    },
    bookmarkBtnPressed: {
        height: 50,
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.75,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 25
    },
    bookmarkText: {
        marginLeft: 10,
        fontSize: 20,
        color: 'white'
    },
    bookmarkTextPressed: {
        fontSize: 20,
        color: '#e06162'
    }
});
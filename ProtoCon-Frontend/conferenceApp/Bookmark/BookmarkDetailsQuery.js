import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { StyleSheet, View, Dimensions, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { AppText, AppTextBlack, AppTextBold } from '../../common/AppText';
import moment from 'moment-timezone';
import { getAccount } from '../../graphql/queries';
import { SwipeRow } from 'react-native-swipe-list-view';
import { deleteBookmark } from '../../graphql/mutations';

const BookmarkDetailsQuery = ({ id, navigation, client }) => (
  <Query query={gql`${getAccount}`} variables={{ id }}>
    {({ loading, error, data, refetch }) => {
      console.log(data);
      if (loading) return null;
      if (error) return (<View><AppText>{'ERROR BookmarkDetailsQuery' + JSON.stringify(error)}</AppText></View>);

      const events = data.getAccount.bookmarks;
      const hash = {};

      events.forEach(element => {
        element.originalIndex = events.indexOf(element);
        const NewDate = moment(element.startDateTime).startOf('day');
        if (hash[NewDate]) {
          hash[NewDate].push(element);
        } else {
          hash[NewDate] = [element];
        }
      });

      const array = [];
      for (const startDateTime of Object.keys(hash)) {
        array.push({
          startDateTime: startDateTime,
          bookmarks: hash[startDateTime]
        })
      }

      array.sort(function (a, b) {
        return new Date(a.startDateTime) - new Date(b.startDateTime);
      });

      deleteRow = async (originalIndex) => {
        let username = id;
        const result = await client.mutate({
          mutation: gql`${deleteBookmark}`,
          variables: {
            email: username,
            index: originalIndex,
          }
        });
        refetch();
      }

      const createBookmark = (bookmarks) => {
        return bookmarks.map(({ startDateTime, name, endDateTime, originalIndex }) => (
          <SwipeRow key={'bookmark-event-'+originalIndex} disableRightSwipe rightOpenValue={-75} stopRightSwipe={-95}>
            <View style={styles.standaloneRowBack}>
              <Text style={styles.back}></Text>
              <TouchableOpacity onPress={() => this.deleteRow(originalIndex)}>
                <Text style={styles.backTextWhite}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bookmark}>
              <View style={styles.standaloneRowFront}>
                <View style={styles.textContainer}>
                  <AppTextBold style={styles.conferencename}>{name}</AppTextBold>
                  <View style={styles.icons}>
                    <Image source={require('../../assets/images/clock.png')} />
                  </View>
                  <View>
                    <AppText style={styles.details}>{`${moment(startDateTime).tz('America/New_York').format('hh:mm a [–]')}${moment(endDateTime).tz('America/New_York').format('hh:mm a')}`}</AppText>
                  </View>
                </View>
              </View>
            </View>
          </SwipeRow>
        ))
      }
      var bookmarksSaved = array.map(({ startDateTime, bookmarks }) => (
        <View >
          <View style={styles.conference}>
            <AppTextBold style={styles.date}>{`${moment(startDateTime).tz('America/New_York').format('dddd, MMM[.] D')}`}</AppTextBold>
          </View>
          {createBookmark(bookmarks)}

        </View>

      ));

      return (
        <ScrollView vertical={true}>
          {bookmarksSaved}
        </ScrollView>
      );
    }}
  </Query>
);

const styles = StyleSheet.create({
  conference: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    borderBottomColor: '#9b9b9b',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  conferencename: {
    fontSize: 15,
    color: '#1b164a',
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 15
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 5

  },
  details: {
    marginLeft: 35,
    // marginBottom: 15,
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    marginBottom: 100,
    color: '#1b164a',
  },
  textContainer: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  info: {
    marginLeft: 10,
  },
  date: {
    color: '#1b164a',
    fontSize: 24,
    marginLeft: 10
  },
  standaloneRowFront: {
    backgroundColor: '#ffffff',
    height: 100,
    marginLeft: 15,
    marginRight: 15,
    borderBottomColor: '#9b9b9b',
    borderBottomWidth: 0.7,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#f6bb61',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginLeft: 35,
    marginRight: 15,
  },
  backTextWhite: {
    color: '#1b164a',
    fontFamily: 'Montserrat',
    fontSize: 15,
    fontWeight: 'bold'
  },
});

export default BookmarkDetailsQuery;

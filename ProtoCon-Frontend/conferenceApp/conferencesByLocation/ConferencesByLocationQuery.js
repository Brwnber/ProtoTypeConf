import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { StyleSheet, View, Dimensions, Image, ScrollView } from 'react-native';
import { AppText, AppTextBold } from '../../common/AppText';
import { TouchableOpacity } from 'react-native';

import { searchConferencesByLatLng } from '../../graphql/queries';

const ConferencesByLocationQuery = ({ lat, lon, dist, navigation }) => (
  <Query query={gql`${searchConferencesByLatLng}`} variables={{ lat, lon, dist }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return (<View><AppText>{'Error ConferencesByLocation: ' + JSON.stringify(error)}</AppText></View>);

      let conferences = data.searchConferencesByLatLng.map(({ id, name, city }) => (
        <TouchableOpacity activeOpacity={0.9} key={id} style={styles.conference} onPress={() => navigation.navigate('ConferenceDetails', { id: id })}>
          <Image style={styles.icon} source={{ uri: 'http://fillmurray.com/38/38' }} />
          <View style={styles.textContainer}>
            <View style={styles.name}><AppTextBold style={styles.nameText} numberOfLines={1}>{name}</AppTextBold></View>
            <View style={styles.location}><AppText style={styles.locationText}>{city}</AppText></View>
          </View>
        </TouchableOpacity>
      ));

      return (
        <ScrollView contentContainerStyle={styles.conferenceList}>
          {conferences}
        </ScrollView>
      );
    }}
  </Query>
);

const styles = StyleSheet.create({
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
    color: '#1b164a',
    fontSize: 15
  },
});

export default ConferencesByLocationQuery;
import React from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { Header } from '../../common/Header';
import { AppText, AppTextBold, AppTextBlack } from '../../common/AppText';
import BookmarkDetailsQuery from './BookmarkDetailsQuery';
import 'prop-types';
import { withApollo } from 'react-apollo';
import { withOAuth } from 'aws-amplify-react-native';
import { ScrollView } from 'react-native-gesture-handler';

export class BookmarkDetails extends React.Component  {

  constructor(props) {
  super(props);
  }
  
    render() {

      const {navigation, oAuthUser} = this.props;
      let username = null;
        console.log('eventdetails props', this.props);
        if (this.props.oAuthUser) {
            username = this.props.oAuthUser.signInUserSession.idToken.payload.email;
        }
        console.log('username', username);
        return (
          <View style={styles.container}>
            <Header navigation={navigation} leftButton={'menu'}></Header>
              <ScrollView>
                <BookmarkDetailsQuery navigation={this.props.navigation} id={username} client={this.props.client}></BookmarkDetailsQuery>
              </ScrollView>


          </View>
        );
    }
}

export default withOAuth(withApollo(BookmarkDetails));

const styles = StyleSheet.create({
   
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  conference: {
      marginTop: 10,
      marginLeft: 15, 
      marginRight: 15,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      height: 70,
      borderBottomColor: '#9b9b9b',
      borderBottomWidth: 1,
      paddingBottom: 10
    },
    date: {
      color: '#1b164a',
      fontSize: 24,
      marginLeft: 10
    }, 
  child: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'white',
    height: 100, 
  },
  bg: {
    backgroundColor: '#f6bb61',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    height: 50,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#f6bb61',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  backTextWhite: {
    color: '#1b164a',
   
    fontFamily: 'Montserrat',
    fontSize: 13,
    fontWeight: 'bold',
  },
  back:{
    backgroundColor: 'white',
  },
  textContainer: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
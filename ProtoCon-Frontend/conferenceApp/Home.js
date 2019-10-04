import React from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';

import { AppTextBold, AppTextBlack } from '../common/AppText';
import { Auth } from 'aws-amplify';
import { withOAuth } from 'aws-amplify-react-native';
import App from '../App';

//'Profile', {businessCard: true}
class Home extends React.Component {

  render() {

    const { navigate } = this.props.navigation;
    console.log('user info', this.props.oAuthUser);

    // let homeScreen = null;
    // let heading = null;
    // const login = 'login button content';
    // const landing = 'original home page content';
    // if (authState == 'signedIn') {
    //   homeScreen = landing;
    //   heading = 'Find a conference:'
    // }
    // else if (authState == 'signIn') {
    //   homeScreen = login;
    //   heading = "Looks like you're new here. Please login with your Accenture email:";
    // }

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.topPictureContainer}>
            <Image source={require('../assets/images/home.png')} style={styles.topPicture} />
          </View>
          <View style={styles.logoWithText}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <AppTextBlack style={styles.slogan}>Conferences that reach new heights</AppTextBlack>
          </View>

        </View>
        <View style={styles.conference}>
          <AppTextBlack style={styles.conferenceText}>Find a conference:</AppTextBlack>
        </View>
        <View style={styles.whiteContainer} >
          <View style={styles.btnContainer}>
            <TouchableOpacity activeOpacity={0.9} style={styles.buttonStyle} onPress={() => navigate('ConferencesByLocation')}>
              <AppTextBold style={styles.buttonText}>Browse by Location</AppTextBold>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity activeOpacity={0.9} style={styles.buttonStyle} onPress={() => navigate('ConferencesByName')}>
              <AppTextBold style={styles.buttonText}>Search by Name</AppTextBold>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default withOAuth(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  imageContainer: {
    flex: 0.95,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoWithText: {
    position: 'absolute',
    top: Dimensions.get('window').height < 2000 ?
      Dimensions.get('window').height * 0.05 : Dimensions.get('window').height * 0.1,
    height: 200,
    alignItems: 'center'
  },
  logo: {


  },
  slogan: {
    fontSize: 17,
    color: '#1b164a'
  },
  topPictureContainer: {
    position: 'absolute',
    alignItems: 'center'
  },
  topPicture: {
    resizeMode: 'cover',
    width: Dimensions.get('window').width
  },
  conference: {
    height: 75,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6bb61',
  },
  conferenceText: {
    fontSize: 26,
    color: '#1b164a'
  },
  whiteContainer: {
    flexDirection: 'column',
    height: Dimensions.get('window').height * 0.25
  },
  btnContainer: {
    flexDirection: 'row'
  },
  buttonStyle: {
    height: 50,
    width: Dimensions.get('window').width * 0.75,
    backgroundColor: '#e06162',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
});

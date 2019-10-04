import React from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';

import { ThemeContext } from '../../common/Themes';

import ConferenceDetailsInfo from './components/ConferenceDetailsInfo';
import ConferenceDetailsCountdown from './components/ConferenceDetailsCountdown';
import ConferenceDetailsButton from './components/ConferenceDetailsButton';

export default class ConferenceDetails extends React.Component {

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        now: new Date()
      })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { data } = this.props;

    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <ScrollView contentContainerStyle={[{ backgroundColor: theme.primary }, styles.container]} showsVerticalScrollIndicator={false}>
            <View style={styles.imagesContainer}>
              <Image style={styles.backgroundImage} source={require('../../assets/images/details.jpg')} />
              <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/group-28.png')} />
              </View>
            </View>
            <ConferenceDetailsInfo name={data.name} startTime={data.startDateTime} endTime={data.endDateTime}
              address={data.address} description={data.description} />
            <ConferenceDetailsCountdown startTime={data.startDateTime} />
            <ConferenceDetailsButton id={this.props.id} />
          </ScrollView>
        )}
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: Dimensions.get('window').width
  },
  imagesContainer: {
    height: 157,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  backgroundImage: {
    width: Dimensions.get('window').width
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'stretch',
    top: 45,
    left: 20
  }
});
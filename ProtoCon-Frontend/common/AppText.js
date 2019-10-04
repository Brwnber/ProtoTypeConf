import React from 'react';
import { Text, StyleSheet } from 'react-native';

export class AppText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[styles.myAppText, this.props.style]}>{this.props.children}</Text>
    )
  }
}

export class AppTextBold extends React.Component {
    render() {
        return (
            <Text {...this.props} style={[styles.myAppTextBold, this.props.style]}>{this.props.children}</Text>
        )
    }
}

export class AppTextBlack extends React.Component {
    render() {
        return(
            <Text {...this.props} style={[styles.myAppTextBlack, this.props.style]}>{this.props.children}</Text>
        )
    }
}

const styles = StyleSheet.create({
  myAppText: {
    fontFamily: 'Montserrat-Regular'
  },
  myAppTextBold: {
      fontFamily: 'Montserrat-Bold'
  },
  myAppTextBlack: {
      fontFamily: 'Montserrat-Black'
  }
});
import {Alert} from 'react-native';

export const ConferenceDetailsAlert = () => {
    Alert.alert(

      'Share Screen',
      'This is the temporary share screen. This will end up bring the share screen native to whichever OS is running.',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel') }
      ],
    );
  }
import { Dimensions, Animated, Easing } from 'react-native';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';

import { Menu } from './Menu';

import Home from '../conferenceApp/Home';
import ConferencesByLocation from '../conferenceApp/conferencesByLocation/ConferencesByLocation';
import ConferencesByName from '../conferenceApp/conferencesByName/ConferencesByName';
import Register from '../conferenceApp/register/Register';
import UserDetails from '../conferenceApp/userDetails/UserDetails';
import CalendarContainer from '../conferenceApp/calendar/CalendarContainer';
import ConferenceDetailsContainer from '../conferenceApp/ConferenceDetails/ConferenceDetailsContainer';
import EventDetailsContainer from '../conferenceApp/eventDetails/EventDetailsContainer';
import BookmarkDetails from '../conferenceApp/Bookmark/BookmarkDetails';
// import RegisterDetails from '../conferenceApp/register/Register';
import Profile from '../conferenceApp/profile/Profile';
import QRCodeReader from '../conferenceApp/profile/QRCodeReader';
import ContactDetailsContainer from '../conferenceApp/contactDetails/ContactDetailsContainer';

import ProfileContainer from '../conferenceApp/profile/ProfileContainer';

const drawerNavigator = createDrawerNavigator(
  {
    Calendar: { screen: CalendarContainer },
    EventDetails: { screen: EventDetailsContainer },
    Profile: { screen: ProfileContainer },
    UserDetails: { screen: UserDetails },
    ContactDetails: { screen: ContactDetailsContainer },
    BookmarkDetails: {screen: BookmarkDetails}
  },
  {
    contentComponent: Menu,
    drawerLockMode: 'locked-closed',
    drawerWidth: Dimensions.get('window').width * 0.8
    //drawerWidth: Math.min(height, width) * 0.8, // calculates 80% of the smaller side of the screen.
  }
);

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    ConferencesByLocation: { screen: ConferencesByLocation },
    ConferencesByName: { screen: ConferencesByName },
    ConferenceDetails: { screen: ConferenceDetailsContainer },
    Register: { screen: Register },
    Drawer: { screen: drawerNavigator },
    QRCodeReader: { screen: QRCodeReader },
  },
  {
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
    navigationOptions: {
      gestureResponseDistance: { horizontal: 100 } // default is 25
    }
  }
);

const Navigator = createAppContainer(MainNavigator);

export default Navigator;


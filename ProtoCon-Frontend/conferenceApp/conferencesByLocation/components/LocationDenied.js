import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

import { AppText, AppTextBold, AppTextBlack } from '../../../common/AppText';

export default class LocationDenied extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../../assets/images/sad-search.png')} style={styles.sadSearch}></Image>
                <AppTextBlack style={styles.text}>Enable Location Services in Settings</AppTextBlack>
                <AppTextBlack style={styles.textLine2}>to find conferences by location</AppTextBlack>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    text: {
        marginTop: 15,
        color: '#1b164a',
        fontSize: 18
    },
    textLine2: {
        marginTop: 5,
        color: '#1b164a',
        fontSize: 18
    },
    sadSearch: {
        marginTop: 20
    }
});
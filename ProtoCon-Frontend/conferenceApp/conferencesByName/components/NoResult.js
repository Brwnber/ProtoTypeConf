import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

import { AppText, AppTextBold, AppTextBlack } from '../../../common/AppText';

import { withNavigation } from 'react-navigation';

class NoResultsFound extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <AppTextBlack style={styles.text}>No results found</AppTextBlack>
                <Image source={require('../../../assets/images/sad-search.png')} style={styles.sadSearch}></Image>
                <TouchableOpacity activeOpacity={0.9} style={styles.findByLocContainer}
                                    onPress={() => this.props.navigation.navigate('ConferencesByLocation')}>
                    <View style={styles.flexRow}>
                        <AppTextBold style={styles.findByLocText}>Find a conference by location</AppTextBold>
                        <Icon name="md-arrow-forward" type='ionicon' color='#e06162'></Icon>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
export default withNavigation(NoResultsFound);

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
        marginTop: 10,
        color: '#1b164a',
        fontSize: 18
    },
    sadSearch: {
        marginTop: 20
    },
    findByLocContainer: {
        marginTop: 25,
        flexDirection: 'row'
    },
    findByLocText: {
        color: '#e06162',
        fontSize: 17,
        marginRight: 5
    },
    flexRow: {
        flexDirection: 'row'
    }
});
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';

import { AppTextBold } from '../../../common/AppText';
import { ThemeContext } from '../../../common/Themes';

class ConferenceDetailsButton extends React.Component {

    render() {
        return (
            <ThemeContext.Consumer>
                {(theme) => (
                    <View style={[{ backgroundColor: theme.primary }, styles.buttonContainer]}>
                        <TouchableOpacity activeOpacity={0.9} style={[{ backgroundColor: theme.circleColorTwo },
                                styles.viewConferenceBtn]}
                                onPress={() => this.props.navigation.navigate('Calendar', { id: this.props.id })}>
                            <AppTextBold style={styles.viewConferenceBtnText}>View Conference</AppTextBold>
                        </TouchableOpacity>
                    </View>
                )}
            </ThemeContext.Consumer>
        )
    }
}
export default withNavigation(ConferenceDetailsButton);

const styles = StyleSheet.create({
    buttonContainer: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewConferenceBtn: {
        height: 50,
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.75,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    viewConferenceBtnText: {
        fontSize: 20,
        color: 'white',
        marginLeft: 10
    },
});
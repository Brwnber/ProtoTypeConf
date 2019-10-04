import React from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback  } from 'react-native';
import { Icon } from 'react-native-elements';

import { AppText } from './AppText';

export class Header extends React.Component {

    left = null;
    right = null;

    render() {
        const {leftButton, rightButton, rightButtonCallback, navigation} = this.props;

        let leftInnerContainer = null;
        let leftPressFunction = () => {};

        if(leftButton) {
            if(leftButton === 'menu') {
                leftPressFunction = () => navigation.toggleDrawer();
                leftInnerContainer = <Icon name='bars' type='font-awesome' color='#fff' containerStyle={styles.menuContainer}/>
            } else if(leftButton === 'back') {
                leftPressFunction = () => this.props.navigation.goBack();
                leftInnerContainer = <AppText style={styles.sideBtnText}>Back</AppText>;
            }
        }

        this.left = <TouchableOpacity activeOpacity={0.8} style={styles.sideBtn} onPress={leftPressFunction}>
                            {leftInnerContainer}
                        </TouchableOpacity>

        let rightInnerContainer = null;
        let rightPressFunction = () => {};

        if(rightButton && rightButtonCallback) {
            if(rightButton === 'edit') {
                rightPressFunction = rightButtonCallback;
                rightInnerContainer = <AppText style={styles.sideBtnText}>Edit</AppText>;
            }
        }

        this.right = <TouchableOpacity activeOpacity={0.8} style={styles.sideBtn} onPress={rightPressFunction}>
                            {rightInnerContainer}
                        </TouchableOpacity>

        return (
            <View style={styles.header}>
                {this.left}
                <View style={styles.logo}>
                    <Image source={require('../assets/images/whiteLogo.png')} style={styles.logoImage} />
                </View>
                {this.right}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: Dimensions.get('window').height * 0.12,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b164a',
    },
    sideBtn: {
        width: Dimensions.get('window').width * 0.25,
        paddingLeft: 25,
        height: 85,
        justifyContent: 'center'
    },
    sideBtnText: {
        color: '#fff',
        fontSize: 20
    },
    logo: {
        width: Dimensions.get('window').width * 0.50,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    logoImage: {
        margin: 5,
        marginBottom: 15,
        resizeMode: 'contain',
        alignSelf: 'center',
        width: Dimensions.get('window').width * 0.30
    },
    menuContainer: {
        alignSelf: 'flex-start'
    }
});
import React from 'react';
import { Dimensions, ToastAndroid, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

export default class QRCodeReader extends React.Component {
    camera = null;
    state = {color: "#62B1F6"}

    navigateToContact(event) {
        try{
            const contact = JSON.parse(event.data);
            this.setState({
                color: '#3c8c0b'
            })
            setTimeout(() => {
                this.props.navigation.navigate('ContactDetails', contact);
            },500)
        } catch(e) {
        }
    }

    render() {
        const color = this.state.color;
        return (
            <RNCamera
                captureAudio={false}
                ref={(ref) => {
                    this.camera = ref;
                }}
                style={styles.fullscreen}
                type={RNCamera.Constants.Type.back}
                onBarCodeRead={(event) => this.navigateToContact(event)}
                barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            >
                <BarcodeMask
                    showAnimatedLine={false}
                    transparency={.2}
                    edgeColor={color}
                    showAnimatedLine={false}
                />
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => this.props.navigation.goBack()}
                    style={styles.closeBtn}
                >
                    <Image style={styles.closeBtnImage} source={require('../../assets/icons/x-circle.png')} />
                </TouchableOpacity>
            </RNCamera>
        );
    }
}

const styles = StyleSheet.create({
    fullscreen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    closeBtn: {
        position: 'absolute',
        left: 20,
        top: 20,
    },
    closeBtnImage: {
        width: Dimensions.get('window').width * .10,
        height: Dimensions.get('window').width * .10
    }
})
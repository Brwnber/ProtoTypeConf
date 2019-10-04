import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';

import { AppText, AppTextBold, AppTextBlack } from '../../../common/AppText';
import { ThemeContext, themes } from '../../../common/Themes';

export default class CalendarModal extends React.Component {

    dateEntries = [];

    submitDayChange(data, onClose, onChange) {
        return function() {
            onChange(data.value, data);
            onClose();
        };
    }

    constructor(props) {
        super(props);
        const {data, onClose, onChange} = this.props;

        for(let i=0; i < data.length; i++) {

            const entry =
                <ThemeContext.Consumer key={'modal'+i}>
                    {(theme) => { 
                        let borderStyle = {};

                        if (i !== data.length-1) {
                            borderStyle = {borderBottomWidth: 1, borderBottomColor: theme.border};
                        }

                        return (
                            <TouchableOpacity key={data[i].key}
                                    style={[{backgroundColor: theme.primary}, borderStyle, styles.entryContainer]}
                                    onPress={this.submitDayChange(data[i], onClose, onChange)}>
                                <AppTextBold style={[{color: theme.alt}, styles.entryText]}>{data[i].label}</AppTextBold>
                            </TouchableOpacity>
                        )
                    }}
                </ThemeContext.Consumer>
            this.dateEntries.push(entry);
        }
    }

    render() {
        const {open, onClose} = this.props;

        return (
            <ThemeContext.Consumer>
                {(theme) => (
                    <View>
                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={open}
                            onRequestClose={() => {
                                onClose();
                            }}>
                        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={onClose}>
                            <TouchableWithoutFeedback onPress={() => {}}>
                                <View onStartShouldSetResponder={() => true} style={[{backgroundColor: theme.primary}, styles.modalContainer]}>
                                    <ScrollView contentContainerStyle={[{backgroundColor: theme.primary}, styles.scrollContainer]} showsVerticalScrollIndicator={false}>
                                        {this.dateEntries}
                                    </ScrollView>
                                </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                        </Modal>
                    </View>
                )}
            </ThemeContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch'
    },
    entryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: 45,
    },
    entryText: {
        fontSize: 18
    },
    modalContainer: {
        marginTop: Dimensions.get('window').height * 0.12 + 50,
        height: 200,
        width: Dimensions.get('window').width * 0.4,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#9b9b9b',
        borderRadius: 13,
    },
    scrollContainer: {
        width: Dimensions.get('window').width * 0.34,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../common/AppText';
import ContactDetails from './ContactDetails';
import { getContactAccount } from '../../graphql/queries';
import { Header } from '../../common/Header';

const ContactQuery = ({ id, navigation }) => (
    <Query query = {gql`${getContactAccount}`} variables = {{ id }} onError={console.log}>
        {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return (<View><AppText>{'ERROR ContactDetails:' + JSON.stringify(error)}</AppText></View>);
            console.log('query data', data);

            return (
                <View style={styles.container}>
                    <Header navigation={navigation} leftButton={'menu'} />
                    <ContactDetails data={data.getAccount} id={id} />
                </View>
            );
        }}
    </Query>
);

export default ContactQuery;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    }
});
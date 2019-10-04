import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../common/AppText';

import Profile from './Profile';

import { getAccount } from '../../graphql/queries';
import { accountModified } from '../../graphql/subscriptions';

import { AccountConsumer } from '../../common/AccountContext';

const ProfileQuery = ({ id, screenToggle }) => (
    <AccountConsumer>
        {({ account, setAccount }) => {
            console.log('before query', account);
            return (
                <View style={styles.container}>
                    <Profile data={account} refetch={() => refetch()} screenToggle={screenToggle}
                    />
                </View>
            )
        }}
    </AccountConsumer>
);
export default ProfileQuery;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    }
});
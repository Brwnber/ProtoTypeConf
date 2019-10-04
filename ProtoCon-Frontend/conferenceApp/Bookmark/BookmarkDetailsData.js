import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import BookmarkDetails from './BookmarkDetails';
import { getAccount } from '../../graphql/queries';
import { AppText } from '../../common/AppText';
import {View} from 'react-native';

const BookmarkDetailsData = ({id, navigate}) => (
    <Query query={gql`${getAccount}`} variables={{ id }}>
    {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return (<View><AppText>{JSON.stringify(error)}</AppText></View>);

        return (
            <BookmarkDetails data={data}/>
        );
    }}
    </Query>
);

export default BookmarkDetailsData;
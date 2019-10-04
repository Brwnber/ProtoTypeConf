import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import { AppText } from '../../common/AppText';

import EventDetails from './EventDetails';
import { getEvent } from '../../graphql/queries';
import { ThemeContext, themes } from '../../common/Themes';

const EventDetailsQuery = ({id, conferenceId, theme}) => (
    <Query query={gql`${getEvent}`} variables={{ id, conferenceId }}>
    {({ loading, error, data }) => {
        if (loading) return (null);
        if (error) return (<View><AppText>{'ERROR :' + JSON.stringify(error) + 'id: ' + id + ', conferenceId: ' + conferenceId}</AppText></View>);

        return (
            <ThemeContext.Provider value={theme}>
                <EventDetails data={data.getEvent} id={id} conferenceId={conferenceId} />
            </ThemeContext.Provider>
        );
    }}
    </Query>
);
export default EventDetailsQuery;
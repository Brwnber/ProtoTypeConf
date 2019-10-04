import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import { AppText } from '../../common/AppText';
import { ThemeContext, themes } from '../../common/Themes';

import Calendar from './Calendar';

import { getConference } from '../../graphql/queries';

const CalendarQuery = ({id}) => (
    <Query query={gql`${getConference}`} variables={{ id }}>
    {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return (<View><AppText>{'Error CalendarQuery: ' + JSON.stringify(error)}</AppText></View>);

        const theme = data.getConference.theme ? themes[data.getConference.theme] : themes['light'];
        
        return (
            <ThemeContext.Provider value={theme}>
                <Calendar data={data} id={id} />
            </ThemeContext.Provider>
        );
    }}
  </Query>
);

export default CalendarQuery;
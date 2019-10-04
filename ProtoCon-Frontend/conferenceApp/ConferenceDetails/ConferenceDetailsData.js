import React from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ConferenceDetails from './ConferenceDetails';
import { getConference } from '../../graphql/queries';
import { AppText } from '../../common/AppText';
import { ThemeContext, themes } from '../../common/Themes';



const ConferenceDetailsData = ({ id }) => (
    <Query query={gql`${getConference}`} variables={{ id }}>
        {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return (<View><AppText>{JSON.stringify(error)}</AppText></View>);

            const theme = data.getConference.theme ? themes[data.getConference.theme] : themes['light'];

            return (
                <ThemeContext.Provider value={theme}>
                    <ConferenceDetails data={data.getConference} id={id} />
                </ThemeContext.Provider>
            );
        }}
    </Query>
);

export default ConferenceDetailsData;
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ScrollView } from 'react-native';
import { AppText } from '../../common/AppText';

import ResultsFound, { DefaultResult } from './components/Result';
import NoResultsFound from './components/NoResult';

import { searchConferencesByText } from '../../graphql/queries';

const ConferencesByNameQuery = ({text, lat, lon}) => (
    <Query query={gql`${searchConferencesByText}`} variables={{ text, lat, lon }}>
    {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return (<AppText>{'Error ConferencesByName: ' + error.message}</AppText>);

        resultContainer = null;
        results = null;

        if(data)
            results = data.searchConferencesByText;

        if (results.length === 0 && text === '') {
            //Nothing typed: Display "Find your event" text
            resultContainer = <DefaultResult></DefaultResult>;
        } else if (results.length === 0) {
            //No conferences found: Display "No results found" text
            resultContainer = <NoResultsFound></NoResultsFound>;
        } else {
            //Display the found conferences
            resultContainer = <ResultsFound results={results}></ResultsFound>
        }

        return (
            <ScrollView>
                {resultContainer}
            </ScrollView>
        );
    }}
  </Query>
);

export default ConferencesByNameQuery;
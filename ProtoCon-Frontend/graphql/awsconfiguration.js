const configData = {
    "ApiUrl": "https://2wfjjwhixnhmparnl5bgoeragq.appsync-api.us-east-1.amazonaws.com/graphql",
    "Region": "us-east-1",
    "AuthMode": "API_KEY",
    "ApiKey": "da2-jn3imcb23be33opchb5jh3qm5m",
    "ClientDatabasePrefix": "SummitApp_API_KEY"
};

export const config = {
    url: configData.ApiUrl,
    region: configData.Region,
    auth: {
        type: configData.AuthMode,
        apiKey: configData.ApiKey,
        // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
    }
}
export const options = {
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        }
    }
}
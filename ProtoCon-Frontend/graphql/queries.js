// eslint-disable
// this is an auto generated file. This will be overwritten

export const searchConferencesByLatLng = `query SearchConferencesByLatLng($lat: Float!, $lon: Float!, $dist: Float!) {
  searchConferencesByLatLng(lat: $lat, lon: $lon, dist: $dist) {
    id
    name
    location {
      lat
      lon
    }
    sponsor
    startDateTime
    endDateTime
    address
    city
    description
    theme
    events {
      id
      name
      tags
      description
      location
      startDateTime
      endDateTime
      speaker
      type
      notes
    }
  }
}
`;
export const searchConferencesByText = `query SearchConferencesByText($text: String!, $lat: Float, $lon: Float) {
  searchConferencesByText(text: $text, lat: $lat, lon: $lon) {
    id
    name
    location {
      lat
      lon
    }
    sponsor
    startDateTime
    endDateTime
    address
    city
    description
    theme
    events {
      id
      name
      tags
      description
      location
      startDateTime
      endDateTime
      speaker
      type
      notes
    }
  }
}
`;
export const getAccount = `query GetAccount($id: ID!) {
  getAccount(id: $id) {
    email
    qrCode
    firstName
    lastName
    location
    jobTitle
    phoneNumber
    linkedIn
    twitter
    website
    bookmarks {
      id
      name
      startDateTime
      endDateTime
    }
    contacts {
      email
      firstName
      lastName
      location
    }
  }
}
`;
export const getEvent = `query GetEvent($id: ID!, $conferenceId: ID!) {
  getEvent(id: $id, conferenceId: $conferenceId) {
    id
    name
    tags
    description
    location
    startDateTime
    endDateTime
    speaker
    type
    notes
  }
}
`;
export const getContactAccount = `query GetAccount($id: ID!) {
  getAccount(id: $id) {
    email
    qrCode
    firstName
    lastName
    location
    jobTitle
    phoneNumber
    linkedIn
    twitter
    website
  }
}
`;
export const getConference = `query GetConference($id: ID!) {
  getConference(id: $id) {
    id
    name
    location {
      lat
      lon
    }
    sponsor
    startDateTime
    endDateTime
    address
    city
    description
    theme
    events {
      id
      name
      tags
      description
      location
      startDateTime
      endDateTime
      speaker
      type
      notes
    }
  }
}
`;
export const listConferences = `query ListConferences($limit: Int, $nextToken: String) {
  listConferences(limit: $limit, nextToken: $nextToken) {
    id
    name
    location {
      lat
      lon
    }
    sponsor
    startDateTime
    endDateTime
    address
    city
    description
    theme
    events {
      id
      name
      tags
      description
      location
      startDateTime
      endDateTime
      speaker
      type
      notes
    }
  }
}
`;

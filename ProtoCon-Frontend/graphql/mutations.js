// eslint-disable
// this is an auto generated file. This will be overwritten

export const createConference = `mutation CreateConference($input: CreateConferenceInput) {
  createConference(input: $input) {
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
export const updateConference = `mutation UpdateConference($input: UpdateConferenceInput) {
  updateConference(input: $input) {
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
export const deleteConference = `mutation DeleteConference($input: DeleteConferenceInput) {
  deleteConference(input: $input) {
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
export const deleteBookmark = `mutation DeleteBookmark($email: String, $index: Int) {
  deleteBookmark(email: $email, index: $index) {
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
export const createEvent = `mutation CreateEvent($input: CreateEventInput) {
  createEvent(input: $input) {
    id
    conference {
      id
      name
      sponsor
      startDateTime
      endDateTime
      address
      city
      description
      theme
    }
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
export const updateEvent = `mutation UpdateEvent($input: UpdateEventInput) {
  updateEvent(input: $input) {
    id
    conference {
      id
      name
      sponsor
      startDateTime
      endDateTime
      address
      city
      description
      theme
    }
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
export const deleteEvent = `mutation DeleteEvent($input: DeleteEventInput) {
  deleteEvent(input: $input) {
    id
    conference {
      id
      name
      sponsor
      startDateTime
      endDateTime
      address
      city
      description
      theme
    }
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
export const createAccount = `mutation CreateAccount($input: CreateAccountInput) {
  createAccount(input: $input) {
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
export const updateAccount = `mutation UpdateAccount($email: ID!, $input: UpdateAccountInput) {
  updateAccount(email: $email, input: $input) {
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
export const deleteAccount = `mutation DeleteAccount($input: DeleteAccountInput) {
  deleteAccount(input: $input) {
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
export const addContact = `mutation AddContact($email: String, $contact: UpdateContactInput) {
  addContact(email: $email, contact: $contact) {
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
export const deleteContact = `mutation DeleteContact($email: String, $index: Int) {
  deleteContact(email: $email, index: $index) {
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
export const addBookmark = `mutation AddBookmark($email: String, $bookmarks: UpdateBookmarkInput) {
  addBookmark(email: $email, bookmarks: $bookmarks) {
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

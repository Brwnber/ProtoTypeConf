// eslint-disable
// this is an auto generated file. This will be overwritten

export const accountModified = `subscription AccountModified($email: String!) {
  accountModified(email: $email) {
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

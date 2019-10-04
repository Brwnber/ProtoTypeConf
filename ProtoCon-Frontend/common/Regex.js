const regex = {
    email: RegExp('[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,}'),
    password: RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!#%*?&])[A-Za-z\\d@$!#%*?&]{8,}$/),
    linkedIn: RegExp(/(?:http(?:s)?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_]+)/),
    twitter: RegExp(/(?:http(?:s)?:\/\/)?(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/),
    website: RegExp(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
}

export default regex;
export interface IPerson {
    gender: string,
    firstName: string,
    secondName: string,
    address: {
        index: number,
        region: string,
        city: string,
        street: string,
        house: string
    },
    age: number,
    birthday: {
        year: number,
        month: number,
        day: number
    },
    phone: string,
    email: string,
    username: string,
    workCompany: string,
    photo: string,
    aboutMe: string,
    bigText: string[],
    mediumText: string[],
    smallText: string[],
    rndNumber: number,
    picture: string
}



import enumerate = Reflect.enumerate;

const request = require('request');
// import * as Promise from 'bluebird';
const Promise = require('bluebird');
import {IPerson} from "./IPerson";

interface IOptions {
    count: number,
    rndNumMin: number,
    rndNumMax: number,
    bigTextParagraphs: number
    mediumTextSentences: number,
    smallTextSentences: number,
    smallTextNumber: number,
    pictureWidth: number,
    pictureHeight: number
}

export class PersonGenerator {
    /**
     * @description generation persons with fake information
     * @param options.count:number - number of persons
     * @param options.rndNumMin:number - minimum threshold of random number
     * @param options.rndNumMax:number - maximum threshold of random number
     * @param options.bigTextParagraphs:number - number of paragraphs in random text for one person. (Full text of article)
     *                                          Total number of paragraphs should not exceed 500
     * @param options.mediumTextSentences:number - number of sentences in random text for one person. (Preview text of article)
     *                                          Total number of sentences should not exceed 500
     * @param options.smallTextSentences:number - number of sentences in random text for one person. (Text of comment in article)
     *                                          Total number of sentences should not exceed 500
     * @param options.smallTextNumber:number - number of small text
     *
     * @returns array:IPerson[]
     */
    getPersons(options: IOptions) {
        return new Promise((res: any, rej: any) => {
            if (options.count < 1) options.count = 1;
            if (options.rndNumMin < 0) options.rndNumMin = 0;
            if (options.rndNumMax < 0) options.rndNumMax = 0;
            if (options.rndNumMax < options.rndNumMin) options.rndNumMax = options.rndNumMin;
            if (options.bigTextParagraphs < 1) options.bigTextParagraphs = 1;

            return Promise.mapSeries(new Array(options.count), () => PersonGenerator._getPersonInformation(options.rndNumMin, options.rndNumMax))
                .then((allPersons: IPerson[]) => {
                    let genders = [
                        {
                            gender: 'male',
                            number: 0
                        },
                        {
                            gender: 'female',
                            number: 0
                        }
                    ];
                    let male: IPerson[] = [], female: IPerson[] = [];

                    allPersons.map((person: IPerson) => {
                        if (person.gender === 'female') {
                            female.push(person);
                            genders[1].number++;
                        } else {
                            male.push(person);
                            genders[0].number++;
                        }
                    });

                    return Promise.mapSeries(genders, (gender: any) => PersonGenerator._getRightNameAndPhoto(gender))
                        .then((informations: any) => {
                            allPersons = PersonGenerator._getRightNameAndPhoto_sort(male, female, informations);

                            let mediumTextSentencesMultiplier = 3;

                            // TODO: Gulp ругается если поставить let. Почему?
                            enum seriesText {
                                small = options.smallTextNumber * options.smallTextSentences * options.count,
                                medium = options.mediumTextSentences * options.count * mediumTextSentencesMultiplier,
                                big = options.bigTextParagraphs * options.count
                            }

                            return Promise.mapSeries(Object.keys(seriesText).filter(k => typeof seriesText[k as any] === "number"), (typeText: any) => PersonGenerator._getText(typeText, seriesText[typeText]))
                                .then((result: any) => {
                                    let texts = Object.assign(result[0], result[1], result[2]);
                                    Object.keys(allPersons).map(index => {
                                        for (let i = 0; i < (options.smallTextSentences * options.smallTextNumber); i++) {
                                            allPersons[+index].smallText.push(texts.small[0]);
                                            texts.small.shift();
                                        }
                                        for (let i = 0; i < (options.mediumTextSentences * mediumTextSentencesMultiplier); i++) {
                                            allPersons[+index].mediumText.push(texts.medium[0]);
                                            texts.medium.shift();
                                        }
                                        for (let i = 0; i < options.bigTextParagraphs; i++) {
                                            allPersons[+index].bigText.push(texts.big[0]);
                                            texts.big.shift();
                                        }

                                        allPersons[+index].smallText = allPersons[+index].smallText.filter(Boolean);
                                        allPersons[+index].mediumText = allPersons[+index].mediumText.filter(Boolean);
                                        allPersons[+index].bigText = allPersons[+index].bigText.filter(Boolean);

                                    });

                                    return Promise.mapSeries(new Array(options.count), () => PersonGenerator._getPicture(options.pictureWidth, options.pictureHeight))
                                        .then((result: string) => {
                                            Object.keys(allPersons).map(index => {
                                                allPersons[+index].picture = result[+index];
                                            });

                                            return res(allPersons);
                                        })
                                        .catch((err: any) => rej(err));
                                })
                                .catch((err: any) => rej(err));
                        })
                        .catch((err: any) => rej(err));
                })
                .catch((err: any) => rej(err));
        })
    }

    static _getPersonInformation(rndNumMin: number, rndNumMax: number) {
        console.log('Getting person information...');
        return new Promise((resolve: any, reject: any) => {
            request({
                url: 'https://api.namefake.com/russian-russia/random',
                // У сайта нет ssl, поэтому приходится выключать защиту
                rejectUnauthorized: false
            }, (err: any, res: any, body: any) => {
                if (err) reject('Error in function _getPersonInformation');
                try {
                    JSON.parse(body);
                } catch (e) {
                    reject(e);
                }
                if (!JSON.parse(body)) reject('Error in function _getPersonInformation');

                let info = JSON.parse(body);

                let person = {
                    gender: (info.pict.includes('female') ? 'female' : 'male'),
                    firstName: "",
                    secondName: "",
                    address: {
                        index: info.address.split(', ')[0],
                        region: info.address.split(', ')[1],
                        city: info.address.split(', ')[2],
                        street: info.address.split(', ')[3],
                        house: info.address.split(', ')[4]
                    },
                    age: this._getPersonAge(info.birth_data),
                    birthday: {
                        year: info.birth_data.split('-')[0],
                        month: info.birth_data.split('-')[1],
                        day: info.birth_data.split('-')[2]
                    },
                    phone: info.phone_h,
                    email: info.email_u + '@' + info.email_d,
                    username: info.username,
                    workCompany: info.company,
                    photo: '',
                    smallText: [''],
                    mediumText: [''],
                    bigText: [''],
                    rndNumber: Math.round(rndNumMin - 0.5 + Math.random() * (rndNumMax - rndNumMin + 1)),
                    picture: ''
                };
                resolve(person);
            });
        })
    }

    static _getPersonAge(date: string) {
        let _year = parseInt(date.split('-')[0]);
        let _month = parseInt(date.split('-')[1]);
        let _day = parseInt(date.split('-')[2]);

        let today = new Date();
        let birthday = new Date(_year, _month - 1, _day);
        let differenceInMilisecond = today.valueOf() - birthday.valueOf();
        return Math.floor(differenceInMilisecond / 31536000000);
    }

    static _getRightNameAndPhoto(gender: any) {
        console.log('Getting photo and russian name...');
        return new Promise((resolve: any, reject: any) => {
            if (gender.number === 0) resolve();
            request({
                url: 'https://uinames.com/api/?amount=' + gender.number + '&gender=' + gender.gender + '&region=russia&ext',
            }, (err: any, res: any, body: any) => {
                if (err) reject('Error in function _getRightNameAndPhoto');
                try {
                    JSON.parse(body);
                } catch (e) {
                    reject(e);
                }
                if (!JSON.parse(body)) reject('Error in function _getRightNameAndPhoto');

                let persons;
                // Если запрос отправлен на одного человека, то приходит JSON, иначе массив из JSON
                if (Array.isArray(JSON.parse(body))) {
                    persons = JSON.parse(body).map((person: any) => {
                        return {
                            photo: person.photo,
                            firstName: person.name,
                            secondName: person.surname
                        }
                    })
                } else {
                    persons = [{
                        photo: JSON.parse(body).photo,
                        firstName: JSON.parse(body).name,
                        secondName: JSON.parse(body).surname
                    }];
                }
                resolve(persons);
            });
        })
    }

    static _getRightNameAndPhoto_sort(male: IPerson[], female: IPerson[], informations: any) {
        informations.map((gender: any, genderIndex: number) => {
            if (genderIndex === 0 && gender) {
                gender.map((info: any, index: number) => {
                    male[index].photo = info.photo;
                    male[index].firstName = info.firstName;
                    male[index].secondName = info.secondName;
                })
            } else if (genderIndex === 1 && gender) {
                gender.map((info: any, index: number) => {
                    female[index].photo = info.photo;
                    female[index].firstName = info.firstName;
                    female[index].secondName = info.secondName;
                })
            }
        });

        return male.concat(female);
    }

    static _getText(type: any, number: any) {
        return new Promise((resolve: any, reject: any) => {
            switch (type) {
                case 'small' :
                    this._getSmallText(number)
                        .then((result: any) => {
                            resolve(result);
                        })
                        .catch((err: any) => reject(err));
                    break;
                case 'medium':
                    this._getMediumText(number)
                        .then((result: any) => {
                            resolve(result);
                        })
                        .catch((err: any) => reject(err));
                    break;
                case 'big':
                    this._getBigText(number)
                        .then((result: any) => {
                            resolve(result);
                        })
                        .catch((err: any) => reject(err));
                    break;
            }
        })

    }

    static _getSmallText(sentences: any) {
        return new Promise((response: any, reject: any) => {
            console.log('Getting ' + sentences + ' sentences for small text...');

            request({
                url: 'https://fish-text.ru/get?type=sentence&format=json&number=' + sentences,
            }, (err: any, res: any, body: any) => {
                if (err) reject('Error in function _getSmallText');
                response({small: JSON.parse(body).text.split('.').filter(Boolean)});
            });
        })
    }

    static _getMediumText(sentences: any) {
        return new Promise((response: any, reject: any) => {
            console.log('Getting ' + sentences + ' sentences for medium text...');

            request({
                url: 'https://fish-text.ru/get?type=sentence&format=json&number=' + sentences,
            }, (err: any, res: any, body: any) => {
                if (err) reject('Error in function _getMediumText');
                response({medium: JSON.parse(body).text.split('.').filter(Boolean)});
            });
        })
    }

    static _getBigText(paragraphs: any) {
        return new Promise((response: any, reject: any) => {
            console.log('Getting ' + paragraphs + ' paragraphs for big text...');
            request({
                url: 'https://fish-text.ru/get?type=paragraph&format=json&number=' + paragraphs,
            }, (err: any, res: any, body: any) => {
                if (err) reject('Error in function _getBigText');
                response({big: JSON.parse(body).text.split('\\n').filter(Boolean)});
            });
        })
    }

    static _getPicture(pictureWidth: number, pictureHeight: number) {
        console.log('Getting picture...');
        return new Promise((response: any, reject: any) => {
            let url = 'https://picsum.photos/' + pictureWidth + '/' + pictureHeight+'.jpg';
            request({url}, (err: any, res: any, body: any) => {
                if (err) reject('Error in function _getPicture');
                response(res.request.uri.href);
            });
        })
    }
}





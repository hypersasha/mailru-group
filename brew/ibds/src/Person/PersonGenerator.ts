const request = require('request');
const Promise = require('bluebird');
import {IPerson} from "./IPerson";

interface IOptions {
    count: number,
    rndNumMin: number,
    rndNumMax: number,
    bigTextParagraphs: number
    mediumTextSentences: number,
    smallTextSentences: number,
    pictureWidth: number,
    pictureHeight: number
}
const MaxNumbersOfTry = 4;

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
     * @param options.pictureWidth:number - width of generated image
     * @param options.pictureHeight:number - height of generated image
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

            console.log('Getting person information...');
            return Promise.mapSeries(new Array(options.count), () => PersonGenerator._getPersonInformation(0, options.rndNumMin, options.rndNumMax))
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

                    console.log('Getting photo and russian name...');
                    return Promise.mapSeries(genders, (gender: any) => PersonGenerator._getRightNameAndPhoto(0, gender))
                        .then((informations: any) => {
                            allPersons = PersonGenerator._getRightNameAndPhoto_sort(male, female, informations);

                            let mediumTextSentencesMultiplier = 1;

                            // TODO: Gulp ругается если поставить let и сделать объект. Почему?
                            enum seriesText {
                                small = options.smallTextSentences * options.count,
                                medium = options.mediumTextSentences * options.count * mediumTextSentencesMultiplier,
                                big = options.bigTextParagraphs * options.count
                            }

                            return Promise.mapSeries(Object.keys(seriesText).filter(k => typeof seriesText[k as any] === "number"), (typeText: any) => PersonGenerator._getText(typeText, seriesText[typeText]))
                                .then((result: any) => {
                                    let texts = Object.assign(result[0], result[1], result[2]);
                                    Object.keys(allPersons).map(index => {
                                        for (let i = 0; i < (options.smallTextSentences); i++) {
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

                                    console.log('Getting picture...');
                                    return Promise.mapSeries(new Array(options.count), () => PersonGenerator._getPicture(0, options.pictureWidth, options.pictureHeight))
                                        .then((result: string) => {
                                            Object.keys(allPersons).map(index => {
                                                allPersons[+index].picture = result[+index];
                                            });

                                            return res(allPersons);
                                        })
                                        .catch((err: Error) => rej(err));
                                })
                                .catch((err: Error) => rej(err));
                        })
                        .catch((err: Error) => rej(err));
                })
                .catch((err: Error) => rej(err));
        })
    }

    static _getPersonInformation(NumberOfTry: number, rndNumMin: number, rndNumMax: number) {
        return new Promise((resolve: any, reject: any) => {
            if (NumberOfTry >= MaxNumbersOfTry) {
                reject(new Error('Exceeded number of try in "_getPersonInformation" method'));
                return;
            }

            request({
                url: 'https://api.namefake.com/russian-russia/random',
                // У сайта нет ssl, поэтому приходится выключать защиту
                rejectUnauthorized: false
            }, (err: any, res: any, body: any) => {
                if (err) {
                    console.log('\x1b[33m%s\x1b[0m', "Error in '_getPersonInformation' method: " + err.code + ". \nTrying to get it again...");
                    this._getPersonInformation((NumberOfTry + 1), rndNumMin, rndNumMax)
                        .then((result: any) => resolve(result))
                        .catch((err: Error) => reject(err))
                }
                else {
                    let success = true;
                    try {
                        JSON.parse(body);
                    } catch (e) {
                        console.log('\x1b[33m%s\x1b[0m', "Error in '_getPersonInformation' method during try parse body: " + e.message + ". \nTrying to get it again...");
                        success = false;
                        this._getPersonInformation((NumberOfTry + 1), rndNumMin, rndNumMax)
                            .then((result: any) => resolve(result))
                            .catch((err: Error) => reject(err))
                    }

                    if (success) {
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
                    }
                }
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

    static _getRightNameAndPhoto(NumberOfTry: number, gender: any) {
        return new Promise((resolve: any, reject: any) => {
            if (NumberOfTry >= MaxNumbersOfTry) {
                reject(new Error('Exceeded number of try in "_getRightNameAndPhoto" method'));
                return;
            }
            if (gender.number === 0) {
                resolve();
                return;
            }

            request({
                url: 'https://uinames.com/api/?amount=' + gender.number + '&gender=' + gender.gender + '&region=russia&ext',
            }, (err: any, res: any, body: any) => {
                if (err) {
                    console.log('\x1b[33m%s\x1b[0m', "Error in '_getRightNameAndPhoto' method: " + err.code + ". \nTrying to get it again...");
                    this._getRightNameAndPhoto((NumberOfTry + 1), gender)
                        .then((result: any) => resolve(result))
                        .catch((err: Error) => reject(err))
                }
                else {
                    let success = true;
                    try {
                        JSON.parse(body);
                    } catch (e) {
                        console.log('\x1b[33m%s\x1b[0m', "Error in '_getRightNameAndPhoto' method during try parse body: " + e.message + ". \nTrying to get it again...");
                        success = false;
                        this._getRightNameAndPhoto((NumberOfTry + 1), gender)
                            .then((result: any) => resolve(result))
                            .catch((err: Error) => reject(err))
                    }

                    if (success) {
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
                    }
                }
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
                    console.log('Getting ' + number + ' sentences for small text...');
                    this._getSmallText(0, number)
                        .then((result: any) => {
                            resolve(result);
                        })
                        .catch((err: Error) => reject(err));
                    break;
                case 'medium':
                    console.log('Getting ' + number + ' sentences for medium text...');
                    this._getMediumText(0, number)
                        .then((result: any) => {
                            resolve(result);
                        })
                        .catch((err: Error) => reject(err));
                    break;
                case 'big':
                    console.log('Getting ' + number + ' paragraphs for big text...');
                    this._getBigText(0, number)
                        .then((result: any) => {
                            resolve(result);
                        })
                        .catch((err: any) => reject(err));
                    break;
            }
        })
    }

    static _getSmallText(NumberOfTry: number, sentences: number) {
        return new Promise((resolve: any, reject: any) => {
            if (NumberOfTry >= MaxNumbersOfTry) {
                reject(new Error('Exceeded number of try in "_getSmallText" method'));
                return;
            }

            request({
                url: 'https://fish-text.ru/get?type=sentence&format=json&number=' + sentences,
            }, (err: any, res: any, body: any) => {
                if (err) {
                    console.log('\x1b[33m%s\x1b[0m', "Error in '_getSmallText' method: " + err.code + ". \nTrying to get it again...");
                    this._getSmallText((NumberOfTry + 1), sentences)
                        .then((result: any) => resolve(result))
                        .catch((err: Error) => reject(err))
                }
                else {
                    let success = true;
                    try {
                        JSON.parse(body);
                    }
                    catch (e) {
                        console.log('\x1b[33m%s\x1b[0m', "Error in '_getSmallText' method during try parse body: " + e.message + ". \nTrying to get it again...");
                        success = false;
                    }

                    if (success) {
                        resolve({small: JSON.parse(body).text.split('.').filter(Boolean)});
                    }
                }
            });
        })
    }

    static _getMediumText(NumberOfTry: number, sentences: number) {
        return new Promise((resolve: any, reject: any) => {
            if (NumberOfTry >= MaxNumbersOfTry) {
                reject(new Error('Exceeded number of try in "_getMediumText" method'));
                return;
            }

            request({
                url: 'https://fish-text.ru/get?type=sentence&format=json&number=' + sentences,
            }, (err: any, res: any, body: any) => {
                if (err) {
                    console.log('\x1b[33m%s\x1b[0m', "Error in '_getSmallText' method: " + err.code + ". \nTrying to get it again...");
                    this._getMediumText((NumberOfTry + 1), sentences)
                        .then((result: any) => resolve(result))
                        .catch((err: Error) => reject(err))
                }
                else {
                    let success = true;
                    try {
                        JSON.parse(body);
                    } catch (e) {
                        console.log('\x1b[33m%s\x1b[0m', "Error in '_getMediumText' method during try parse body: " + e.message + ". \nTrying to get it again...");
                        success = false;
                    }

                    if (success) {
                        resolve({medium: JSON.parse(body).text.split('.').filter(Boolean)});
                    }
                }
            });
        })
    }

    static _getBigText(NumberOfTry: number, paragraphs: number) {
        return new Promise((resolve: any, reject: any) => {
            if (NumberOfTry >= MaxNumbersOfTry) {
                reject(new Error('Exceeded number of try in "_getBigText" method'));
                return;
            }

            request({
                url: 'https://fish-text.ru/get?type=paragraph&format=json&number=' + paragraphs,
            }, (err: any, res: any, body: any) => {

                if (err) {
                    console.log('\x1b[33m%s\x1b[0m', "Error in '_getBigText' method: " + err.code + ". \nTrying to get it again...");
                    this._getBigText((NumberOfTry + 1), paragraphs)
                        .then((result: any) => resolve(result))
                        .catch((err: Error) => reject(err))
                }
                else {
                    let success = true;
                    try {
                        JSON.parse(body);
                    }
                    catch (e) {
                        console.log('\x1b[33m%s\x1b[0m', "Error in '_getBigText' method during try parse body: " + e.message + ". \nTrying to get it again...");
                        success = false;
                    }

                    if (success) {
                        resolve({big: JSON.parse(body).text.split('\\n').filter(Boolean)});
                    }
                }
            });
        })
    }

    static _getPicture(NumberOfTry: number, pictureWidth: number, pictureHeight: number) {
        return new Promise((resolve: any, reject: any) => {
            if (NumberOfTry >= MaxNumbersOfTry) {
                reject(new Error('Exceeded number of try in "_getPicture" method'));
                return;
            }

            let url = 'https://picsum.photos/' + pictureWidth + '/' + pictureHeight+'.jpg';
            request({url}, (err: any, res: any) => {
                if (err) {
                    console.log('\x1b[33m%s\x1b[0m', "Error in '_getPicture' method: " + err.code + ". \nTrying to get it again...");
                    this._getPicture((NumberOfTry + 1), pictureWidth, pictureHeight)
                        .then((result: any) => resolve(result))
                        .catch((err: Error) => reject(err))
                }
                else {
                    resolve(res.request.uri.href);
                }
            });
        })
    }
}





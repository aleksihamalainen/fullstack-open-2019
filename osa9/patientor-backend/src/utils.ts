/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseField = (field: any): string => {
    if (!field || !isString(field)) {
        throw new Error('Incorrect of missing field ');
    }
    return field;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect gendert');
    }
    return gender;
};

const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseField(object.name),
        dateOfBirth: parseField(object.dateOfBirth),
        ssn: parseField(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseField(object.occupation)
    };
    return newPatient;
};

export default toNewPatient;
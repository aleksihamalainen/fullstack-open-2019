import patients from '../../data/patients';
import { NewPatient, NonSensitivePatientInfo } from '../types';

const getNonSensitiveInfo = (): NonSensitivePatientInfo[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): NonSensitivePatientInfo => {
    const id = Math.random().toString(36).substring(7);
    const newPatient = {
        id,
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default { getNonSensitiveInfo, addPatient };
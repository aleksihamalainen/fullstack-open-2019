type ratingNumber = 1 | 2 | 3;

interface exerciseObject {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: ratingNumber,
    ratingDescription: string,
    target: number,
    average: number
}

interface exerciseValues {
    exerciseHours: Array<number>,
    target: number
}

const parseExercise = (args: Array<string>): exerciseValues => {
    const filteredArgs = args.slice(2, 2).concat(args.slice(2, args.length));
    if (filteredArgs.map(a => isNaN(Number(a))).includes(true)) throw new Error("Provided values were not numbers");
    if (filteredArgs.length < 2) throw new Error("Not enough arguments");
    return {
        exerciseHours: filteredArgs.slice(1).map(a => Number(a)),
        target: Number(filteredArgs[0])
    };
};

export const calculateExercises = (exerciseHours: Array<number>, target: number): exerciseObject => {
    const periodLength: number = exerciseHours.length;
    const trainingDays: number = exerciseHours.filter(h => h !== 0).length;
    const sum: number = exerciseHours.reduce((a, b) => a + b, 0);
    const average: number = (sum / periodLength) || 0;
    const success: boolean = average >= target ? true : false;
    const ratingDescription = "not too bad but could do better";
    let rating: ratingNumber = 1;
    if (trainingDays === periodLength && success) {
        rating = 3;
    } else if (success) {
        rating = 2;
    } else {
        rating = 1;
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const {exerciseHours, target} = parseExercise(process.argv);
    console.log(calculateExercises(exerciseHours, target));
} catch (e) {
    console.log('error');
}
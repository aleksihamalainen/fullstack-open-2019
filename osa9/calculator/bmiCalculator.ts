interface Values {
    height: number,
    weight: number
}

const parseBMI = (args: Array<string>): Values => {
    if (args.length !== 4) throw new Error("Invalid number of arguments");
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error("Provided values were not numbers");
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / Math.pow(height / 100, 2);
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal weight";
    } else if (bmi >= 25 && bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
};

try {
    const {height, weight} = parseBMI(process.argv);
    console.log(`You are: ${calculateBmi(height, weight)}`);
} catch (e) {
    console.log('error');
}
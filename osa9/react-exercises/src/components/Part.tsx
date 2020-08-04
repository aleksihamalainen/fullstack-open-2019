import React from "react";
import { CoursePart } from "../index";

const Part: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    
    return (
        <div>
            {courseParts.map(part => {
                switch (part.name) {
                    case "Fundamentals":
                        return <p key={part.name}>
                            {part.name} {part.exerciseCount} {part.description}
                            </p>
                    case "Using props to pass data":
                        return <p key={part.name}>
                            {part.name} {part.exerciseCount} {part.groupProjectCount}
                            </p>
                    case "Deeper type usage":
                        return <p key={part.name}>
                            {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}
                            </p>
                    case "Test":
                        return <p key={part.name}>
                            {part.name} {part.exerciseCount} {part.description} {part.data}
                            </p>
                    default:
                        return assertNever(part)
                }
            })}
        </div>
    );
};

export default Part;
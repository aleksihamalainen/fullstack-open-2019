import React from "react";
import { CoursePart } from "../index";

const Total: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
    <div>
        <p>
          Number of exercises{" "}
          {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    </div>
);

export default Total;
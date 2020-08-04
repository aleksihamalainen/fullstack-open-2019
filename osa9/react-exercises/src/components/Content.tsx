import React from "react";
import { CoursePart } from "../index";
import Part from "./Part";

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
  <div>
    <Part courseParts={courseParts} />
  </div>
);

export default Content;
import React from 'react'

const Header = (props) => (
  <h2>{props.course}</h2>
)

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

const Content = (props) => (
  <div>
    {props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
  </div>
)

const Total = (props) => (
  <b>total of {props.parts.reduce((s, p) => s + p.exercises, 0)} exercises</b>
)

const Course = (props) => (
  <div>
    <Header course={props.course.name} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />
  </div>
)

export default Course
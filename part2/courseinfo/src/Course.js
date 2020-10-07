import React from 'react';

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const intialValue = 0;
  const sum = course.parts.reduce(
    (preVal, currentVal) => preVal + currentVal.exercises,
    intialValue
  );
  return <h3>total of {sum} exercises</h3>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;

const Header = (props) => {
  console.log("Header: ", props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  console.log("Part: ", props);
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  console.log("Content: ", props);
  return (
    <div>
      {props.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  );
};

const Total = (props) => {
  console.log("Total: ", props);
  return (
    <div>
      <h2>
        Number of exercises {props.parts.reduce((s, p) => s + p.exercises, 0)}
      </h2>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
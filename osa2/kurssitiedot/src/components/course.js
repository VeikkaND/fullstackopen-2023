const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}
  
  const Part = (props) => {
    return(
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
  const Content = ({parts}) => {
    return(
      <div>
        {parts.map((part) => 
          <Part part={part} key={part.id}/>)}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((a,c) => a + c)
    return(
      <p><strong>Number of exercises: {total}</strong></p>
    )
  }
  
  const Course = ({course}) => {
    return(
      <div>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts.map(part => part.exercises)}/>
      </div>
    )
  }

export default Course
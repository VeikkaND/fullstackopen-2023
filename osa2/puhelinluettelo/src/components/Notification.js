const Notification = ({message, name}) => {
    if(message == "") {
      return null
    } else if (message == "Added") {
      return(
        <div className="added">
          <p>{message} {name}</p>
        </div>
      )
    } else if (message == "Deleted") {
      return(
        <div className="removed">
          <p>{message} {name}</p>
        </div>
      )
    } else if (message == "Updated") {
      return(
        <div className="changed">
          <p>{message} {name}</p>
        </div>
      )
    } else if (message == "Information") {
      return(
        <div className="error">
          <p>{message} {name}</p>
        </div>
      )
    } 
}

export default Notification
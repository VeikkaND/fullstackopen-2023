const Names = ({names, numberService, setPersons, setNamesToShow,
setNotiMessage, setNotiPerson}) => {
    return (
        <div>
            {names.map(name => 
            <p key={name.name}>
                {name.name} {name.number}
                <button onClick={
                    () => {
                        if(window.confirm(`Delete ${name.name} ?`)){
                            numberService.remove(name.id)
                                .then(() => {
                                    const newNames = names.filter(
                                        n => n.name != name.name)
                                    setPersons(newNames)
                                    setNamesToShow(newNames)
                                    setNotiMessage("Deleted")
                                    setNotiPerson(name.name)
                                    setTimeout(() => {
                                        setNotiMessage(null)
                                    }, 3000)
                                })
                                .catch(error => {
                                    setNotiMessage("Information")
                                    setNotiPerson(`of ${name.name} has already been removed from server!`)
                                    setTimeout(() => {
                                        setNotiMessage(null)
                                    }, 3000)
                                })
                        }
                    }}>
                    delete
                </button>
            </p>)}
            
        </div>
    )
}

export default Names
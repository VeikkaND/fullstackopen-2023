const ShowButton = ({country, setSearch, setMatchingCountries}) => {

    const handleShow = () => {
        setSearch(country.toLowerCase())
        setMatchingCountries([country])
    }

    return (
        <button onClick={handleShow}>show</button>
    )
} 

export default ShowButton
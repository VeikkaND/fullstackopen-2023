const Filter = ({newFilter, handleFiltering}) => {
    return (
        <div>
        filter shown with <input
                            value={newFilter}
                            onChange={handleFiltering}
                            />
        </div>
    )
}

export default Filter
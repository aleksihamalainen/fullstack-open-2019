import React from 'react'

const Filter = ({ newFilter, handleFilterChange }) => (
    <form>
        <div>
            filter shown with <input value={newFilter} onChange={handleFilterChange} />
        </div>
    </form>
)

export default Filter
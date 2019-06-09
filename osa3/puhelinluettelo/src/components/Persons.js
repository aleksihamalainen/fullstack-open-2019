import React from 'react'

const Persons = ({ persons, newFilter, deletePerson }) => (
    persons
        .filter(person =>
            person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map(person =>
            <div key={person.id}>
                {person.name}
                {person.number}
                <button id={person.id} name={person.name} onClick={deletePerson}>
                    delete
                    </button>
            </div>
        )
)


export default Persons
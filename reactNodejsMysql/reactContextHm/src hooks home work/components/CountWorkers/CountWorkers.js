import React, { useContext } from 'react'
import EmployeeContext from '../Contexts/EmployeeContext'

const CountWorkers = () => {
    const context = useContext(EmployeeContext);
    let { EmployeeCount } = context

    return (
        <h1>
            Total employees in company: <strong style={{ color: 'red' }}>{'' + EmployeeCount + ''}</strong>
        </h1>
    )
}

export default CountWorkers;
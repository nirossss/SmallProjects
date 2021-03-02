import React, { Component } from 'react'
import EmployeeContext from '../Contexts/EmployeeContext'

const CountWorkers = () => {
    return (
        <EmployeeContext.Consumer>
            {({ EmployeeCount }) => (
                <h1>
                    Total employees in company: <strong style={{ color: 'red' }}>{'' + EmployeeCount + ''}</strong>
                </h1>
            )}
        </EmployeeContext.Consumer>
    )
}

export default CountWorkers;
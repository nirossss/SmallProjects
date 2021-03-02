import React, { useContext } from 'react'
import EmployeeContext from '../Contexts/EmployeeContext'

const PaginationHooks = (props) => {
    const context = useContext(EmployeeContext);
    let { EmployeeCount } = context

    const paginationMaker = () => {
        let numberOfPages = EmployeeCount / 6
        const arrOfPageNum = []

        for (let i = 1; i <= numberOfPages; i++) {
            arrOfPageNum.push(i)
        }

        return arrOfPageNum.map((item) => <button className="page-link" key={'page' + item} value={item} onClick={props.changePage}>{item}</button>)
    }

    return (
        <div id='pagination'>
            <ul className="pagination pagination-lg">
                {paginationMaker()}
            </ul>
        </div>
    )
}

export default PaginationHooks;
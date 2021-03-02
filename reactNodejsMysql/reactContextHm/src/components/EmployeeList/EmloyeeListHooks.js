import React, { useState, useEffect } from 'react';
import EmployeeContext from '../Contexts/EmployeeContext'
import CountWorkers from '../CountWorkers/CountWorkers';
import PaginationHooks from '../Pagination/PaginationHooks';
import useShowTime from '../costumHook/showTime'

const EmployeeListHooks = () => {

    const [mydata, setMydata] = useState({
        workerDataForKeys: {},
        workersData: {},
        EmployeeCount: {},
        dataRecived: false
    });
    const [page, setPage] = useState('1')
    const [api, setApi] = useState({
        pageStr: 'https://reqres.in/api/users?page=' + page
    })

    const showTime = useShowTime()
    const [time, setTime] = useState('show time')

    const getWorkersData = async () => {
        const workersJson = await fetch(api.pageStr);
        const { data, total } = await workersJson.json();

        setMydata({ workerDataForKeys: data[0], workersData: data, EmployeeCount: total, dataRecived: true });
    }

    useEffect(() => {
        getWorkersData();
        setApi({ pageStr: 'https://reqres.in/api/users?page=' + page })
    }, [page, mydata]);

    const tableHeader = () => {
        const workerDataKeyArr = Object.keys(mydata.workerDataForKeys);

        return workerDataKeyArr.map((item) => <th key={item} scope="col">{item}</th>)
    }

    const tableBody = () => {
        return mydata.workersData.map((worker, index) => {
            return (<tr key={worker.id}>
                <td>{worker.id}</td>
                <td>{worker.email}</td>
                <td>{worker.first_name}</td>
                <td>{worker.last_name}</td>
                <td><img src={worker.avatar} alt='' /></td>
            </tr>)
        })
    }

    const changePage = (e) => {
        setPage(e.target.value);
    }

    return (
        <div className='container'>
            <EmployeeContext.Provider value={mydata}>

                <CountWorkers />

                <table className='table table-hover'>
                    <thead>
                        <tr>
                            {tableHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {mydata.dataRecived && tableBody()}
                    </tbody>
                </table>

                <button className='btn btn-success' onClick={() => setTime(showTime)}>{time}</button>

                <PaginationHooks changePage={changePage} />

            </EmployeeContext.Provider>
        </div >
    )
}

export default EmployeeListHooks;
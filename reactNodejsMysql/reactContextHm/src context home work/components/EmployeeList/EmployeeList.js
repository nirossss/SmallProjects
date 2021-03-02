import React, { Component } from 'react'
import EmployeeContext from '../Contexts/EmployeeContext'
import CountWorkers from '../CountWorkers/CountWorkers';
import Pagination from '../Pagination/Pagination';

export default class EmployeeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workerDataForKeys: {},
            workersData: {},
            EmployeeCount: {},
            pageStr: 'https://reqres.in/api/users?page=1',
            dataRecived: false
        }
    }

    componentDidMount() {
        this.getWorkersData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pageStr !== this.state.pageStr) {
            this.getWorkersData();
        }
    }

    getWorkersData = async () => {
        let { pageStr } = this.state;

        const workersJson = await fetch(pageStr);
        const { data, total } = await workersJson.json();

        this.setState({ workerDataForKeys: data[0], workersData: data, EmployeeCount: total, dataRecived: true });
    }

    tableHeader() {
        let { workerDataForKeys } = this.state;
        const workerDataKeyArr = Object.keys(workerDataForKeys);

        return workerDataKeyArr.map((item) => <th key={item} scope="col">{item}</th>)
    }

    changePage1 = () => {
        this.setState({ pageStr: 'https://reqres.in/api/users?page=1' });
    }

    changePage2 = () => {
        this.setState({ pageStr: 'https://reqres.in/api/users?page=2' });
    }

    render() {
        const { EmployeeCount, workersData, dataRecived } = this.state;

        return (
            <div className='container'>
                <EmployeeContext.Provider value={{ EmployeeCount, workersData }}>

                    <CountWorkers />

                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                {this.tableHeader()}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataRecived && workersData.map((worker, index) => {
                                    return <tr key={worker.id}>
                                        <td>{worker.id}</td>
                                        <td>{worker.email}</td>
                                        <td>{worker.first_name}</td>
                                        <td>{worker.last_name}</td>
                                        <td><img src={worker.avatar} /></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>

                    <Pagination onClick1={this.changePage1} onClick2={this.changePage2} />

                </EmployeeContext.Provider>
            </div >
        )
    }
}

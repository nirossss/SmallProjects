import React, { Component } from 'react'

export default class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='pagination'>
                <ul className="pagination pagination-lg">
                    <button className="page-link" onClick={this.props.onClick1}>&laquo;</button>
                    <button className="page-link" onClick={this.props.onClick2}>&raquo;</button>
                </ul>
            </div>
        )
    }
}

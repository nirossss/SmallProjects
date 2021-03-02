import React, { useState } from 'react';
import ProductStock from '../ProductStock/ProductStock';
import StockContext from '../Context/StockContext'
import './Products.css'

const Product = (props) => {
    const { id, name, price, units, time_updated, producer_name } = props
    const [realUnits, setRealUnit] = useState(units)
    const [isUpdated, setIsUpdated] = useState(false)
    const [isModify, setIsModify] = useState(false)

    return (
        <StockContext.Provider value={{ realUnits, setRealUnit, isUpdated, setIsUpdated }}>
            <div className='container'>
                <p>{id}) {name}: <strong>{producer_name}</strong></p>
                <p><strong>{price}$</strong></p>
                <p>Only {units} Left!!!</p>
                <div className="isUpdated">{isUpdated ? `✓ now ${realUnits} Refresh page` : ''}</div>
                <p>Last update: {new Date(time_updated).toLocaleString()}</p>

                {isModify || <button onClick={() => setIsModify(true)}>Modify</button>}
                {isModify &&
                    <div className='container'>
                        <ProductStock id={id} />
                    </div>
                }
            </div>
        </StockContext.Provider>
    )
}

export default Product
import React, { useContext } from 'react';
import StockContext from '../Context/StockContext';

const ProductStock = (props) => {
    const { id } = props
    const { realUnits, setRealUnit, setIsUpdated } = useContext(StockContext);

    const handleClick = async () => {
        const res = await fetch(`http://localhost:3001/api/products/${id}/units`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                units: realUnits
            })
        })

        const { success } = await res.json();
        if (success) {
            setIsUpdated(true)
        }
    }

    return (
        <div>
            <h4>Update number of units in stock</h4>
            <input type="number" value={realUnits} onChange={(e) => setRealUnit(e.target.value)} />
            <button onClick={handleClick} >Confirm</button>
        </div>
    )
}

export default ProductStock
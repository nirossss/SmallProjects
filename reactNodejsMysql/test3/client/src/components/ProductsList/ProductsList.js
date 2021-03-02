import React, { useEffect, useState } from 'react';
import Product from '../Product/Product'
import './ProductList.css'


const ProductList = (props) => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false);
    const [isUnitSort, setIsUnitSort] = useState(false)
    const [searchInput, setSearchInput] = useState([false, ``])

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:3001/api/products');
                const { success, data } = await res.json();

                if (success) {
                    setProducts(data);
                    setError(false);
                } else {
                    setError(true);
                }

            } catch (e) {
                setError(true);
            }
        })();
    }, []);

    const renderProductsList = () => {
        let actualProducts = [...products]

        if (isUnitSort) {
            actualProducts = actualProducts.sort((a, b) => {
                return a.units - b.units;
            });
        }
        if (searchInput[0]) {
            actualProducts = actualProducts.filter(product => {
                return product.name.toUpperCase().includes(searchInput[1].toUpperCase())
            });
        }

        return actualProducts.map(product => <Product key={product.id} {...product} />)
    }

    return (
        <div>
            <header className="sort-header">
                <div className="sort-units">
                    Sort by units: <input
                        type="checkbox"
                        checked={isUnitSort}
                        onChange={() => setIsUnitSort(!isUnitSort)}
                    />
                </div>
                <div className="sort-search">
                    Search product: <input
                        type="text"
                        value={searchInput[1]}
                        onChange={(e) => setSearchInput([true, e.target.value])}
                    />
                </div>
            </header>
            {renderProductsList()}
            {error && <div>Error</div>}
        </div>
    )
}

export default ProductList
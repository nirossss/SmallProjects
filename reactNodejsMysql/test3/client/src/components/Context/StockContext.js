import React from 'react';

const StockContext = React.createContext({ realUnits: 0, SetRealUnits: () => { }, isUpdated: false, setIsUpdated: () => { } });

export default StockContext;
import React, { useEffect } from 'react';

const getTime = () => new Date().toLocaleTimeString();

const useShowTime = () => {
    return getTime();
}

export default useShowTime
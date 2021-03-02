import React from 'react';

const GamesDataContext = React.createContext({ servers: [], setServers: () => { }, isGame: [false, 0], setIsGame: () => { } });

export default GamesDataContext;
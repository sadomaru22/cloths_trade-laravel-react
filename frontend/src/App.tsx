//import React, { useEffect } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

// import { initializeAuthState, isReady } from './utils/auth';
// import { useAppSelector } from './utils/hooks';
//import { Loading, FlashNotification } from './layouts';
import Routes from './Routes';

const App: React.FC = () => {

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;

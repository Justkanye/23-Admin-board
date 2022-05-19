import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';
import ScrollToTop from './components/Widgets/ScrollToTop';

const App = () => {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <React.Fragment>
                <Router basename={BASENAME}>{renderRoutes(routes)}</Router>
                <ScrollToTop />
            </React.Fragment>
        </Suspense>
    );
};

export default App;

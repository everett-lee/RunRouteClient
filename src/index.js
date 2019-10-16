import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'semantic-ui-css/semantic.min.css';

import { ApiProvider } from './components/providers/ApiProvider';
import { CoordProvider } from './components/providers/CoordProvider';
import { RouteProvider } from './components/providers/RouteProvider';

ReactDOM.render(<ApiProvider> 
                    <CoordProvider>
                        <RouteProvider>
                            <App /> 
                        </RouteProvider>
                    </CoordProvider>
                </ApiProvider>
                ,
                document.querySelector('#app-root')); 
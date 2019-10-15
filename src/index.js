import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'semantic-ui-css/semantic.min.css';

import { ApiProvider } from './components/api/ApiProvider';
import { CoordProvider } from './components/CoordProvider';

ReactDOM.render(<ApiProvider> 
                    <CoordProvider>
                        <App /> 
                    </CoordProvider>
                </ApiProvider>
                ,
                document.querySelector('#app-root')); 
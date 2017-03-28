import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import router from './router';

ReactDOM.render((
  <BrowserRouter>
    {renderRoutes(router)}
  </BrowserRouter>
), document.getElementById('app'))

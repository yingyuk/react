/* eslint-disable global-require */
/* eslint-global NAME */
import { renderRoutes } from 'react-router-config'

// 每个页面单独打包
// import app from 'bundle-loader?lazy!../App';
// import home from 'bundle-loader?lazy!../views/home/home';
// import detail from 'bundle-loader?lazy!../views/detail/detail';
// import child from 'bundle-loader?lazy!../views/detail/child/child';

import app from 'src/App';
import home from 'src/views/home/home';
import detail from 'src/views/detail/detail';
import child from 'src/views/detail/child/child';

const routes = [{
    component: app,
    routes: [{
        path: '/react',
        exact: true,
        component: home,
    }, {
        path: '/detail',
        component: detail,
        routes: [{
            path: '/detail/:id',
            component: child,
        }]
    }],
}];


export default routes;

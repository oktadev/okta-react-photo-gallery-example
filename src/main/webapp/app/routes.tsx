import * as React from 'react';
import { Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';

import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import { AUTHORITIES } from 'app/config/constants';

const Admin = Loadable({
  loader: () => import('app/modules/administration'),
  loading: () => <div>loading ...</div>
});

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorBoundaryRoute path="/logout" component={Logout} />
      <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/entity" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <ErrorBoundaryRoute path="/" component={Home} />
    </Switch>
  </div>
);

export default Routes;

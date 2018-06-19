import * as React from 'react';
// tslint:disable-next-line:no-unused-variable
import { Route, Switch } from 'react-router-dom';

import Album from './album';
import Photo from './photo';
import Tag from './tag';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <Route path={`${match.url}/album`} component={Album} />
      <Route path={`${match.url}/photo`} component={Photo} />
      <Route path={`${match.url}/tag`} component={Tag} />
      <ErrorBoundaryRoute path={`${match.url}/photo`} component={Photo} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;

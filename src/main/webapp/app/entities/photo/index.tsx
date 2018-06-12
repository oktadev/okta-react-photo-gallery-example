import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Photo from './photo';
import PhotoDetail from './photo-detail';
import PhotoUpdate from './photo-update';
import PhotoDeleteDialog from './photo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={PhotoUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={PhotoUpdate} />
      <Route exact path={`${match.url}/:id`} component={PhotoDetail} />
      <Route path={match.url} component={Photo} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={PhotoDeleteDialog} />
  </>
);

export default Routes;

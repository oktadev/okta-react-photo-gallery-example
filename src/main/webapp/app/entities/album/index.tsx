import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Album from './album';
import AlbumDetail from './album-detail';
import AlbumUpdate from './album-update';
import AlbumDeleteDialog from './album-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={AlbumUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={AlbumUpdate} />
      <Route exact path={`${match.url}/:id`} component={AlbumDetail} />
      <Route path={match.url} component={Album} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={AlbumDeleteDialog} />
  </>
);

export default Routes;

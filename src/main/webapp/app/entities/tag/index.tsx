import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Tag from './tag';
import TagDetail from './tag-detail';
import TagUpdate from './tag-update';
import TagDeleteDialog from './tag-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={TagUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={TagUpdate} />
      <Route exact path={`${match.url}/:id`} component={TagDetail} />
      <Route path={match.url} component={Tag} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={TagDeleteDialog} />
  </>
);

export default Routes;

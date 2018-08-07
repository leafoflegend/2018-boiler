import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router';
import { Home, Settings } from '../pages';

interface StateProps {}

type Props = StateProps;

class RootRouter extends Component<Props> {
  public render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Fragment>
    );
  }
}

export default RootRouter;

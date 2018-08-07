import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Home, Settings } from '../pages';
import history from '../../redux/history';
import { State } from '../../@types/redux-types';

interface StateProps {
  location: string;
  hash: string;
}

type Props = StateProps;

class RootRouter extends Component<Props> {
  public render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/settings" component={Settings} />
          <Route component={Home} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

type MapStateToProps = (state: State) => StateProps;

const mapStateToProps: MapStateToProps = ({ router }) => ({
  location:
    typeof router === 'object' &&
    typeof router.location === 'object' &&
    typeof router.location.pathname === 'string'
      ? router.location.pathname
      : '',
  hash:
    typeof router === 'object' &&
    typeof router.location === 'object' &&
    typeof router.location.hash === 'string'
      ? router.location.hash
      : '',
});

const ConnectedRootRouter = connect<StateProps, void, void, State>(mapStateToProps)(RootRouter);

export default ConnectedRootRouter;

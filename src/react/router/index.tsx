import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { Home, Settings } from '../pages';
import { State } from '../../@types/redux-types';

interface StateProps {
  location: string;
  hash: string;
}

type Props = StateProps;

class RootRouter extends Component<Props> {
  shouldComponentUpdate(nextProps: Props): boolean {
    if (this.props.location !== nextProps.location) return true;
    if (this.props.hash !== nextProps.hash) return true;
    return false;
  }

  public render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/settings" component={Settings} />
          <Route component={Home} />
        </Switch>
      </Fragment>
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

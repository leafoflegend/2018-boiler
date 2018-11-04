import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Home, Settings } from '../pages';
import HistoryProvider from '../../redux/history';
import { State } from '../../@types/redux-types';

interface StateProps {
  location: string;
  hash: string;
}

type Props = StateProps;

class RootRouter extends Component<Props> {
  static propTypes = {
    location: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
  };

  componentDidUpdate() {
    const { location, hash } = this.props;

    if (process.env.NODE_ENV !== 'production') {
      console.log('New Location: ', location);
      console.log('New Hash: ', hash);
    }
  }

  public render() {
    return (
      <HistoryProvider.Consumer>
        {history => (
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/settings" component={Settings} />
              <Route component={Home} />
            </Switch>
          </ConnectedRouter>
        )}
      </HistoryProvider.Consumer>
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

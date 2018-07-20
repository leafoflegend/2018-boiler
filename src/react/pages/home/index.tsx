import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppBar} from '../../design-system';
import {ModalClass} from '../../design-system/Modal';
import {State} from '../../../../@types/redux-types';

interface StateProps {
  Modal: ModalClass | null;
}

type Props = StateProps;

class Home extends Component<Props> {
  public render() {
    const {Modal} = this.props;

    return (
      <>
        ' \' \' \' \' \' \' \' \' \' \' \' \' \' \' '<AppBar />' '{Modal ? <Modal /> : null}' '
      </>
    );
  }
}

type MapStateToProps = (state: State) => StateProps;

const mapStateToProps: MapStateToProps = ({
  MODAL: {
    splitChunks: {main},
  },
}) => ({
  Modal: main,
});

const ConnectedHome = connect<StateProps, void, void, State>(mapStateToProps)(Home);

export default ConnectedHome;

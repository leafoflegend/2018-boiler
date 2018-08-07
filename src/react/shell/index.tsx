import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core';
import { AppBar, Drawer } from '../design-system';
import { ModalClass } from '../design-system/Modal';
import { State } from '../../@types/redux-types';

interface StateProps {
  Modal: ModalClass | null;
}

interface NormalProps {
  children?: ReactNode;
}

type Props = StateProps & NormalProps;

const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: '100%',
      height: '100vh',
    },
    hiddentoolbar: {
      ...theme.mixins.toolbar,
    },
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
    },
  });

class Shell extends Component<Props & WithStyles<typeof styles>> {
  public render() {
    const { Modal, children, classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar />
        <Drawer />
        {Modal ? <Modal /> : null}
        <main className={classes.main}>
          <div className={classes.hiddentoolbar} />
          {children ? children : null}
        </main>
      </div>
    );
  }
}

const StyledShell = withStyles(styles)(Shell);

type MapStateToProps = (state: State) => StateProps;

const mapStateToProps: MapStateToProps = ({
  MODAL: {
    splitChunks: { main },
  },
}) => ({
  Modal: main,
});

const StyledConnectedShell = connect<StateProps, void, void, State>(mapStateToProps)(StyledShell);

export default StyledConnectedShell;

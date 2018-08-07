import React, { Component, ReactNode } from 'react';
import ApplicationTheme from './themes';
import Shell from './shell';
import Router from './router';

interface Props {
  children?: ReactNode;
}

class RootReactContainer extends Component<Props> {
  public render() {
    const { children } = this.props;

    return <ApplicationTheme>{children}</ApplicationTheme>;
  }
}

const rootRenderFunction: () => Promise<JSX.Element> = async () => (
  <RootReactContainer>
    <Shell>
      <Router />
    </Shell>
  </RootReactContainer>
);

export default rootRenderFunction;

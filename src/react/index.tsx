import React, {
	Component,
	ReactNode,
} from 'react';
import ApplicationTheme from './themes';
import {
	AppBar,
} from './design-system';

interface Props {
	children?: ReactNode;
}

class RootReactContainer extends Component<Props> {
	public render () {
		const { children } = this.props;

		return (
			<ApplicationTheme>
				{ children }
			</ApplicationTheme>
		);
	}
}

const rootRenderFunction: () => Promise<JSX.Element> = async () => (
	<RootReactContainer>
		<AppBar />
	</RootReactContainer>
);

export default rootRenderFunction;

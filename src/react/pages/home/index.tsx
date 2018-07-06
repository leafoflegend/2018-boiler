import React, {
	Component,
	ComponentClass,
} from 'react';
import { connect } from 'react-redux';
import {
	AppBar,
} from '../../design-system';
import { MapStateToProps } from '../../../../@types/redux-types';

interface StateProps {
	Modal: ComponentClass | null;
}

type Props = StateProps;

class Home extends Component<Props> {
	public render () {
		const { Modal } = this.props;

		return (
			<>
				<AppBar />
				{ Modal ? <Modal /> : null }
			</>
		);
	}
}

const mapStateToProps: MapStateToProps<StateProps> = ({ MODAL: { splitChunks: { main } } }) => ({
	Modal: main,
});

const ConnectedHome = connect<StateProps>(mapStateToProps)(Home);

export default ConnectedHome;

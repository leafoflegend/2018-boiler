import React, {
	Component,
} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { toggleAppBarMenu } from '../../../redux/action-creators';
import {
	MapStateToProps,
	MapDispatchToProps,
	Dispatch,
} from '../../../../@types/redux-types';

interface StateProps {
	open: boolean;
	title: string;
}

interface DispatchProps {
	toggleMenu: (isOpen: boolean) => void;
}

type Props = StateProps & DispatchProps;

class ApplicationBar extends Component<Props> {
	public render () {
		const {
			open,
			title,
			toggleMenu,
		} = this.props;

		return (
			<AppBar
				position={ 'static' }
			>
				<Toolbar>
					<IconButton
						color={ 'inherit' }
						onClick={ () => { toggleMenu(open); } }
					>
						<Menu />
					</IconButton>
					<Typography
						variant={ 'title' }
						color={ 'inherit' }
					>
						{ title }
					</Typography>
				</Toolbar>
			</AppBar>
		);
	}
}

const mapStateToProps: MapStateToProps<StateProps> = ({ APP_BAR: { menu: { open }, title } }) => ({
	open,
	title,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps> = (dispatch: Dispatch) => ({
	toggleMenu: (isOpen: boolean) => { dispatch(toggleAppBarMenu(!isOpen)); },
});

const ConnectedApplicationBar = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ApplicationBar);

export default ConnectedApplicationBar;

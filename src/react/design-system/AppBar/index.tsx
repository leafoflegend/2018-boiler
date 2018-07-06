import React, {
	Component,
} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {
	withStyles,
	WithStyles,
	createStyles,
} from '@material-ui/core/styles';
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

const styles = createStyles({
	root: {
		flexGrow: 1,
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
});

class ApplicationBar extends Component<Props & WithStyles<typeof styles>> {
	public render () {
		const {
			open,
			title,
			toggleMenu,
			classes,
		} = this.props;

		return (
			<AppBar
				position={ 'static' }
			>
				<Toolbar>
					<IconButton
						color={ 'inherit' }
						onClick={ () => { toggleMenu(open); } }
						className={ classes.menuButton }
					>
						<Menu />
					</IconButton>
					<Typography
						variant={ 'title' }
						color={ 'inherit' }
						className={ classes.flex }
					>
						{ title }
					</Typography>
				</Toolbar>
			</AppBar>
		);
	}
}

const decorateApplicationBar = withStyles(styles);

const StyledApplicationBar = decorateApplicationBar<Props>(ApplicationBar);

const mapStateToProps: MapStateToProps<StateProps> = ({ APP_BAR: { menu: { open }, title } }) => ({
	open,
	title,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps> = (dispatch: Dispatch) => ({
	toggleMenu: (isOpen: boolean) => { dispatch(toggleAppBarMenu(!isOpen)); },
});

const ConnectedApplicationBar = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(StyledApplicationBar);

export default ConnectedApplicationBar;

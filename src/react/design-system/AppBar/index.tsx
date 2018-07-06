import React, {
	Component,
} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {
	withStyles,
	WithStyles,
	createStyles,
} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import {
	toggleAppBarMenu,
	toggleAppBarUserMenu,
} from '../../../redux/action-creators';
import {
	MapStateToProps,
	MapDispatchToProps,
	Dispatch,
} from '../../../../@types/redux-types';

interface StateProps {
	open: boolean;
	title: string;
	userAnchor: HTMLElement | null;
	userOpen: boolean;
	userMenuItems: { title: string }[];
}

interface DispatchProps {
	toggleMenu: (isOpen: boolean) => void;
	toggleUserMenu: (data: { open: boolean, node: Node | null }) => void;
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
	get UserMenu () {
		const {
			toggleUserMenu,
			userAnchor,
			userOpen,
			userMenuItems,
		} = this.props;

		if (userMenuItems && userMenuItems.length) {
			return (
				<div>
					<IconButton
						aria-owns={ open ? 'user-menu-appbar' : null }
						aria-haspopup={ 'true' }
						color={ 'inherit' }
						onClick={ ({ currentTarget }) => { toggleUserMenu({ open: true, node: currentTarget }); } }
					>
						<AccountCircle />
					</IconButton>
					<Menu
						id={ 'user-menu-appbar' }
						anchorEl={ userAnchor }
						anchorOrigin={ {
							vertical: 'top',
							horizontal: 'right',
						} }
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={ userOpen }
						onClose={ () => { toggleUserMenu({ open: false, node: null }); } }
					>
						{
							userMenuItems.map(({ title }) => (
								<MenuItem
									key={ title }
								>
									{ title }
								</MenuItem>
							))
						}
					</Menu>
				</div>
			);
		}

		return null;
	}

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
						<MenuIcon />
					</IconButton>
					<Typography
						variant={ 'title' }
						color={ 'inherit' }
						className={ classes.flex }
					>
						{ title }
					</Typography>
					{ this.UserMenu }
				</Toolbar>
			</AppBar>
		);
	}
}

const decorateApplicationBar = withStyles(styles);

const StyledApplicationBar = decorateApplicationBar<Props>(ApplicationBar);

const mapStateToProps: MapStateToProps<StateProps> = ({
	APP_BAR: {
		menu: {
			open,
		},
		title,
		userMenu,
	},
}) => ({
	open,
	title,
	userAnchor: userMenu.anchorEl,
	userOpen: userMenu.open,
	userMenuItems: userMenu.menuItems,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps> = (dispatch: Dispatch) => ({
	toggleMenu: (isOpen: boolean) => { dispatch(toggleAppBarMenu(!isOpen)); },
	toggleUserMenu: ({ open, node = null }: { open: boolean, node: HTMLElement | null }) => {
		dispatch(toggleAppBarUserMenu({ node, open }));
	},
});

const ConnectedApplicationBar = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(StyledApplicationBar);

export default ConnectedApplicationBar;

import React, {
	Component,
	ReactNode,
} from 'react';
import { Dispatch } from 'redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {
	withStyles,
	WithStyles,
	createStyles,
} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	State,
} from '../../../../@types/redux-types';
import { closeModal } from '../../../redux/action-creators';

const styles = createStyles({});

interface StateProps {
	open: boolean;
	title: string | ReactNode | null;
	content: string | ReactNode | null;
	actions: string | ReactNode | null;
}

interface DispatchProps {
	modalClose: () => void;
}

interface MuiProps {
	fullScreen: boolean;
}

type Props = StateProps & DispatchProps & MuiProps;

class Modal extends Component<Props & WithStyles<typeof styles>> {
	public render () {
		const {
			fullScreen,
			open,
			modalClose,
			title,
			content,
			actions,
		} = this.props;

		return (
			<Dialog
				fullScreen={ fullScreen }
				open={ open }
				onClose={ modalClose }
				maxWidth={ 'sm' }
				fullWidth
				aria-labelledby={ 'responsive-dialog-title' }
			>
				<DialogTitle
					id={ 'responsive-dialog-title' }
				>
					{ title }
				</DialogTitle>
				<DialogContent>
					{ content }
				</DialogContent>
				<DialogActions>
					{ actions }
				</DialogActions>
			</Dialog>
		);
	}
}

const decorateModal = withStyles(styles);

const StyledModal = decorateModal<Props>(Modal);

const ResponsiveStyledModal = withMobileDialog<any>()(StyledModal);

type MapStateToProps = (state: State) => StateProps;

const mapStateToProps: MapStateToProps = ({
	MODAL: {
		open,
		title,
		content,
		actions,
	},
}) => ({
	open,
	title,
	content,
	actions,
});

type MapDispatchToProps = (dispatch: Dispatch) => DispatchProps;

const mapDispatchToProps: MapDispatchToProps = dispatch => ({
	modalClose: () => { dispatch(closeModal()); },
});

const ConnectedResponsiveStyledModal = connect<StateProps, DispatchProps, void, State>(mapStateToProps, mapDispatchToProps)(ResponsiveStyledModal);

export type ModalClass = typeof ConnectedResponsiveStyledModal;

export default ConnectedResponsiveStyledModal;

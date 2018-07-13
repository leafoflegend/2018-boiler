import React, {
	ReactNode,
} from 'react';
import { Dispatch } from 'redux';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { closeModal } from '../redux/action-creators';

type ModalHydrationObj = {
	title: null | string | ReactNode;
	content: null | string | ReactNode;
	actions: null | string | ReactNode;
};

// TODO: Again, type feels like it should be an ENUM.
const hydrateModal = ({ type, dispatch }: { type: string, dispatch: Dispatch }): ModalHydrationObj => {
	switch (type) {
	case 'login':
		return {
			title: 'Login',
			content: (
				<DialogContentText>
					{ 'WIP' }
				</DialogContentText>
			),
			actions: (
				<Button
					onClick={ () => { dispatch(closeModal()); } }
					variant={ 'raised' }
				>
					{ 'Close' }
				</Button>
			),
		};
	default:
		return {
			title: 'Default Modal',
			content: (
				<DialogContentText>
					{ 'This is what a modal looks like when it receives no information about what type of modal it should be.' }
				</DialogContentText>
			),
			actions: (
				<Button
					onClick={ () => { dispatch(closeModal()); } }
					variant={ 'raised' }
				>
					{ 'Close' }
				</Button>
			),
		};
	}
};

export default hydrateModal;

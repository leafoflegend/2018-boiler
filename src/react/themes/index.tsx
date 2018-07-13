import React, {
	Component,
	ReactNode,
} from 'react';
import {
	createMuiTheme,
	Theme,
	MuiThemeProvider,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';

// @ts-ignore
const themeColor: string = process.env.APPLICATION_THEME_COLOR;
// @ts-ignore
const themeSecondaryColor: string = process.env.APPLICATION_THEME_SECONDARY_COLOR;
// @ts-ignore
const themeType: 'light' | 'dark' = process.env.APPLICATION_THEME_TYPE;
// @ts-ignore
const themeFonts: string = process.env.APPLICATION_THEME_FONTS;

const applicationTheme: Theme = createMuiTheme({
	palette: {
		type: themeType,
		primary: {
			main: themeColor,
		},
		secondary: {
			main: themeSecondaryColor,
		},
		error: red,
		contrastThreshold: 3,
		tonalOffset: 0.2,
	},
	typography: {
		fontFamily: themeFonts,
		fontSize: 12,
	},
});

interface Props {
	children?: ReactNode;
}

class ApplicationTheme extends Component<Props> {
	public render () {
		const { children } = this.props;
		const { muiTheme }: { muiTheme?: Theme } = this.context;

		return (
			<>
				{
					(!muiTheme && children)
						?
						(
							<MuiThemeProvider
								theme={ applicationTheme }
							>
								{ children }
							</MuiThemeProvider>
						)
						: children
							? children
							: null
				}
			</>
		);
	}
}

export default ApplicationTheme;

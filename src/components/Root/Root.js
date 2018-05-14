import React from 'react';
import App from '../App';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: orange[800],
			dark: orange[700]
		},
	},
});

const Root = () =>
	<MuiThemeProvider theme={theme}>
		<App />
	</MuiThemeProvider>;

export default Root;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
/***
 * import from the dashboard
 */

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// optional configuration

import MainhLayout from "./Dashboard/Routes";
import { types } from "react-alert";

function App() {
	const options = {
		// you can also just use 'bottom center'
		position: positions.TOP_RIGHT,
		timeout: 5000,
		offset: "30px",

		// you can also just use 'scale'
		transition: transitions.SCALE,
	};
	return (
		<>
			<AlertProvider template={AlertTemplate} {...options}>
				<MainhLayout />
			</AlertProvider>
		</>
	);
}

export default App;

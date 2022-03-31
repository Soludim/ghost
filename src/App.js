import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
/***
 * import from the dashboard
 */

import MainhLayout from "./Dashboard/Routes";
import LogIn from "./Dashboard/views/auth/Login";

function App() {
	return (
		<>
			<MainhLayout />
		</>
	);
}

export default App;

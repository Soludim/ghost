import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
const useAuth = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	return user ? <Outlet /> : <Navigate to="/" replace />;
};

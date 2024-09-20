import { useState, createContext } from "react";

export const AllUsersContext = createContext();

export const AllUsersProvider = ({ children }) => {
	const [allUsers, setAllUsers] = useState([]);
	const [page, setPage] = useState(1);
	return (
		<AllUsersContext.Provider value={{ allUsers, setAllUsers, page, setPage }}>
			{children}
		</AllUsersContext.Provider>
	);
};

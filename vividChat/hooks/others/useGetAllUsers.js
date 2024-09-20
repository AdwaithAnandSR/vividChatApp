import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../contexts/socketContext.js";

const useGetAllUsers = ({ page, limit, setPage, setAllUsers, userId }) => {
	const [loading, setLoading] = useState(true);
	const socket = useContext(SocketContext);

	useEffect(() => {
		if (!socket || !page || !limit || !setPage || !setAllUsers || !userId)
			return;
		setLoading(true);
		const handleResponse = users => {
			if (users.length > 0) {
				setAllUsers(prev => {
					const newUsers = users.filter(
						newUser =>
							!prev.some(
								existingUser => existingUser._id === newUser._id
							)
					);

					const updatedUsers = newUsers.map(user => {
						if (user._id === userId) {
							return { ...user, username: "You" };
						}
						return user;
					});

					return [...prev, ...updatedUsers];
				});
				setPage(prev => prev + 1);
			}
			setLoading(false);
		};

		socket.emit("getAllUsers", { page, limit });
		socket.on("getAllUsersResponse", handleResponse);

		return () => {
			socket.off("getAllUsersResponse", handleResponse);
		};
	}, [socket, page, limit, setPage, setAllUsers, userId]);

	return { loading };
};

export default useGetAllUsers;

const formatTime = timestamp => {
	const date = new Date(timestamp);
	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12;
	hours = hours.toString().padStart(2, "0");
	return `${hours}:${minutes} ${ampm}`;
};

export default formatTime;

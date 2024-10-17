import { useState, useEffect } from "react";

export default function UseCountryData() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	async function getApi() {
		try {
			const response = await fetch("./asset/data.json");
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const resData = await response.json();
			setData(resData);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	// useEffect to call getApi on component mount
	useEffect(() => {
		getApi();
	}, []);

	return { data, loading, error };
}

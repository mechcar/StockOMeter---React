import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form/Form";

function App() {
	// useState to track keystrokes
	const [userInput, setUserInput] = useState("");
	// useState to track stock searched in text input
	const [searchStock, setSearchStock] = useState("AAPL");
	// useState to track the JSON objects returned
	const [stockData, setStockData] = useState([]);

	// Handles input from keyboard into text search
	const handleChange = (e) => {
		setUserInput(e.target.value);
	};

	// handles the submission of the form and handles the error thrown by an empty search query
	const handleSubmit = (e) => {
		e.preventDefault();
		if (userInput === "") {
			Swal.fire({
				title: "Error!",
				text: "Please enter a symbol!",
				icon: "error",
				confirmButtonText: "OK",
				confirmButtonColor: "#002442",
			});
		} else {
			setSearchStock(userInput);
		}
	};

	useEffect(() => {
		// creating an empty array to store an individual weather object
		const stockObjectArray = [];
		// API information from: https://rapidapi.com/apidojo/api/yahoo-finance1
		const apiKey = "57edb9d42emsh2e21cedcaa1cecbp1f2a9ajsn8c9fb7947387";
		const apiHost = "apidojo-yahoo-finance-v1.p.rapidapi.com";
		const summaryURL =
			"https://yh-finance.p.rapidapi.com/stock/v2/get-summary";

		const options = {
			method: "GET",
			url: summaryURL,
			params: { symbol: searchStock, region: "US" },
			headers: {
				"x-rapidapi-host": apiHost,
				"x-rapidapi-key": apiKey,
			},
		};

		axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
				setUserInput("");
			})
			.catch(() => {
				setUserInput("");
				setSearchStock("");
				Swal.fire({
					title: "Error!",
					text: "Unable to find that stock. Please try again!",
					icon: "error",
					confirmButtonText: "OK",
					confirmButtonColor: "#002442",
				});
			});
	}, [searchStock]);

	return (
		<div className="App">
			<h1>StockOMeter</h1>
			<Form
				handleSubmit={handleSubmit}
				handleChange={handleChange}
				userInput={userInput}
			/>
		</div>
	);
}

export default App;

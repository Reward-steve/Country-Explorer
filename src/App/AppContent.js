import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { PiMoonFill } from "react-icons/pi";
import { BsFillSunFill } from "react-icons/bs";
import "../scssComponent/index.scss";
import Navbar from "../Component/Navbar/Navbar";
import { Box } from "@chakra-ui/react";
import Main from "../Component/Main/Main";
import useCountryData from "../Component/data/data";
import CountryCard from "../Component/Country/CountryCard";

export default function AppContent() {
	// Fetch country data using a custom hook
	const { data, loading, error } = useCountryData();

	// Theme state management
	const [mode, setMode] = useState("Light Mode");
	const [bg, setBg] = useState("hsl(207, 26%, 17%)");
	const [color, setColor] = useState({
		bgColor: "hsl(209, 23%, 22%)",
		textColor: "hsl(0deg 0% 85.54%)",
	});

	// Update body background color based on theme
	document.body.style.background = bg;

	// Search and filter state
	const [inputValue, setInputValue] = useState("");
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [selectedRegion, setSelectedRegion] = useState("All");
	const [filteredData, setFilteredData] = useState([]);

	// Toggle theme mode
	const Icon = mode === "Light Mode" ? BsFillSunFill : PiMoonFill;
	const toggleMode = () => {
		setMode((prevMode) =>
			prevMode === "Dark Mode" ? "Light Mode" : "Dark Mode"
		);
		if (mode === "Dark Mode") {
			setBg("hsl(207, 26%, 17%)");
			setColor({
				bgColor: "hsl(209, 23%, 22%)",
				textColor: "hsl(0deg 0% 85.54%)",
			});
		} else {
			setBg("hsl(0, 0%, 80%)");
			setColor({
				bgColor: "hsl(0deg 0% 85.54%)",
				textColor: "hsl(200, 15%, 8%)",
			});
		}
	};

	// Handle search input change
	const handleInputChange = (e) => {
		const searchValue = e.target.value;
		setInputValue(searchValue);

		if (searchValue) {
			const filtered = data.filter((country) =>
				country.name.toLowerCase().includes(searchValue.toLowerCase())
			);
			if (filtered) {
				setFilteredCountries(filtered);
				setFilteredData(filtered);
			} else {
			}
		} else {
			const paste = <p>Country Not Found</p>;
			setFilteredCountries([]);
			setFilteredData(data); // Reset to full data when search is empty
		}
	};

	// Handle search on clicking the search icon
	const handleSearchClick = () => {
		const searchValue = inputValue.toLowerCase();

		if (searchValue) {
			const filtered = data.filter((country) =>
				country.name.toLowerCase().includes(searchValue)
			);
			setFilteredData(filtered);
		} else {
			setFilteredCountries([]);
			setFilteredData(data); // Reset when search is empty
		}
		setInputValue("");
	};

	// Handle region selection
	const handleRegionChange = (region) => {
		setSelectedRegion(region);
	};

	// Close dropdown on selecting a country
	const handleOptionClick = (country) => {
		if (country) {
			setInputValue(country.name);
			setFilteredCountries([]); // Close dropdown
		}
	};

	// Filter countries by region
	useEffect(() => {
		if (selectedRegion === "All") {
			setFilteredData(data);
		} else {
			const filtered = data.filter(
				(country) => country.region === selectedRegion
			);
			setFilteredData(filtered);
		}
	}, [selectedRegion, data]);
	// Display loading or error states
	if (loading) {
		return (
			<>
				<p style={{ color: color.textColor, textAlign: "center" }}>
					{"Loading............"}
				</p>
			</>
		);
	}
	if (error) {
		return (
			<>
				<p style={{ color: color.textColor, textAlign: "center" }}>
					Error fetching data: <span>redirecting...</span>
				</p>
				{/* Redirect to the homepage */}
				{location.replace(`${window.location.origin}/`)}
			</>
		);
	}

	return (
		<BrowserRouter>
			<Box className='body' bg={bg}>
				{/* Navbar */}
				<Navbar
					toggleMode={toggleMode}
					color={color.textColor}
					bgColor={color.bgColor}
					modeTitle={mode}
					modeIcon={
						<Icon
							size={18}
							style={{ marginRight: "10px", transition: "0.2s" }}
							rotate={mode === "Light Mode" ? "235deg" : "0deg"}
						/>
					}
				/>
			</Box>
			<Routes>
				{/* Main Country Display */}
				<Route
					path='/'
					element={
						<Main
							bgColor={color.bgColor}
							color={color.textColor}
							filteredData={filteredData}
							bg={bg}
							handleRegionChange={handleRegionChange}
							selectedRegion={selectedRegion}
							filteredCountries={filteredCountries}
							inputValue={inputValue}
							handleInputChange={handleInputChange}
							handleOptionClick={handleOptionClick}
							searchCountryByName={handleSearchClick}
						/>
					}
				/>

				{/* Country Details */}
				<Route
					path='/Country/:name'
					element={
						<CountryCard
							data={data}
							bgColor={color.bgColor}
							color={color.textColor}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import CountryContainer from "../SearchBox/Container";

export default function CountryList({
	bg,
	color,
	bgColor,
	filteredData,
	handleRegionChange,
	selectedRegion,
	filteredCountries,
	inputValue,
	handleInputChange,
	handleOptionClick,
	searchCountryByName,
}) {
	function formattedNumber(num) {
		return Number(num).toLocaleString();
	}
	// Filter countries based on inputValue
	const filteredCountriesList = filteredData.filter((country) => {
		return country.name.toLowerCase().includes(inputValue.toLowerCase());
	});

	const MapList = filteredData.map((country) => {
		return (
			<NavLink key={country.name} to={`/Country/${country.name}`}>
				<Box color={color} bg={bgColor} className='card'>
					<Box className='flag'>
						<img src={country.flags.svg} alt='flag' />
					</Box>
					<Box className='card-details'>
						<h3 className='country-name'>{country.name}</h3>
						<p>
							Population: <span>{formattedNumber(country.population)}</span>
						</p>
						<p>
							Region: <span>{country.region}</span>
						</p>
						<p>
							Capital: <span>{country.capital}</span>
						</p>
					</Box>
				</Box>
			</NavLink>
		);
	});

	return (
		<>
			<CountryContainer
				color={color}
				bgColor={bg}
				bg={bgColor}
				handleRegionChange={handleRegionChange}
				selectedRegion={selectedRegion}
				countries={filteredCountries}
				inputValue={inputValue}
				handleInputChange={handleInputChange}
				handleOptionClick={handleOptionClick}
				searchCountryByName={searchCountryByName}
			/>

			<Box
				w={"100%"}
				h={"auto"}
				display={"flex"}
				justifyContent={"center"}
				flexWrap={"wrap"}
				className='country-list'>
				{filteredCountriesList.length === 0 ? (
					<p style={{ color: color, fontWeight: "bold" }}>Country Not Found</p>
				) : (
					MapList
				)}
			</Box>
		</>
	);
}

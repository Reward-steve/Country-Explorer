import { Box } from "@chakra-ui/react";
import CountryList from "../Country/CountryList.js";
import ScrollToTop from "../scroll/Scroll";

export default function Main({
	color,
	bgColor,
	bg,
	filteredData,
	handleRegionChange,
	selectedRegion,
	filteredCountries,
	inputValue,
	handleInputChange,
	handleOptionClick,
	searchCountryByName,
}) {
	return (
		<Box w={"100%"} className='main'>
			<Box className='main-content'>
				<ScrollToTop bgColor={bgColor} color={color} />
				<Box className='content'></Box>

				<CountryList
					color={color}
					bgColor={bgColor}
					bg={bg}
					filteredData={filteredData}
					filteredCountries={filteredCountries}
					handleRegionChange={handleRegionChange}
					selectedRegion={selectedRegion}
					countries={filteredCountries}
					inputValue={inputValue}
					handleInputChange={handleInputChange}
					handleOptionClick={handleOptionClick}
					searchCountryByName={searchCountryByName}
				/>
			</Box>
		</Box>
	);
}

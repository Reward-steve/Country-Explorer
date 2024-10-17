import { Box, Flex } from "@chakra-ui/react";
import FilterBox from "./FilterBox";
import SearchBar from "./SearchBar";

export default function CountryContainer({
	bg,
	color,
	bgColor,
	handleRegionChange,
	selectedRegion,
	countries,
	handleOptionClick,
	handleInputChange,
	inputValue,
	searchCountryByName,
}) {
	return (
		<div>
			<Flex justifyContent={"center"} w={"100%"} className='search-box-holder'>
				<Box className='search-box' color={color} bg={bgColor}>
					<SearchBar
						bg={bg}
						bgColor={bgColor}
						color={color}
						filteredCountries={countries}
						handleInputChange={handleInputChange}
						inputValue={inputValue}
						handleOptionClick={handleOptionClick}
						searchCountryByName={searchCountryByName}
					/>
					<FilterBox
						bg={bg}
						color={color}
						onRegionChange={handleRegionChange}
						selectedRegion={selectedRegion}
					/>
				</Box>
			</Flex>
		</div>
	);
}

import { Box, Input, Icon, List, ListItem } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({
	bgColor,
	color,
	bg,
	filteredCountries,
	handleOptionClick,
	handleInputChange,
	inputValue,
	searchCountryByName,
}) {
	return (
		<Box className='search-bar' bg={bg} color={color} position='relative'>
			<Icon
				as={FaSearch}
				size={25}
				className='icon'
				marginRight='8px'
				onClick={searchCountryByName}
			/>
			<Input
				className='text'
				type='text'
				placeholder='Search for a country...'
				background={"initial"}
				color={color}
				value={inputValue}
				onChange={handleInputChange}
				autoComplete='off'
			/>
			{filteredCountries.length > 0 && (
				<Box
					className='dropdown'
					position='absolute'
					top='60px'
					width='100%'
					bg={bg}
					style={{ scrollbarColor: `${color} ${bg}` }}
					zIndex='1'
					scrollBehavior={"smooth"}
					borderRadius='5px'
					maxHeight='200px'
					overflowY='auto'>
					<List spacing={2}>
						{filteredCountries.map((country) => (
							<ListItem
								key={country.name}
								padding='8px'
								cursor='pointer'
								_hover={{ backgroundColor: bgColor }}
								onClick={() => handleOptionClick(country)}>
								{country.name}
							</ListItem>
						))}
					</List>
				</Box>
			)}
		</Box>
	);
}

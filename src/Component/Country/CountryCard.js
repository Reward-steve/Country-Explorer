import {
	Box,
	Heading,
	Text,
	Flex,
	Image,
	Tag,
	VStack,
	HStack,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";

export default function CountryCard({ data, bgColor, color }) {
	const { name } = useParams(); // Extract country name from params

	// Find the selected country using params
	const country = data.find(
		(country) => country.name.toLowerCase() === name.toLowerCase()
	);

	const {
		nativeName,
		population,
		region,
		subregion,
		capital,
		topLevelDomain,
		currencies,
		languages,
	} = country;

	const countriesDetails = [
		{ title: "Native Name", value: nativeName },
		{ title: "Population", value: population?.toLocaleString() },
		{ title: "Region", value: region },
		{ title: "Subregion", value: subregion },
		{ title: "Capital", value: capital },
		{ title: "Top Level Domain", value: topLevelDomain?.join(", ") },
		{ title: "Currencies", value: currencies?.map((c) => c.name).join(", ") },
		{ title: "Languages", value: languages?.map((l) => l.name).join(", ") },
	];

	// Helper function to convert alpha3Code to country name
	const getBorderCountryNames = (borderCountries) => {
		return borderCountries.map((alpha3Code) => {
			const borderCountry = data.find(
				(country) => country.alpha3Code === alpha3Code
			);
			return borderCountry ? borderCountry.name : alpha3Code;
		});
	};

	return (
		<Flex
			justify='center'
			align='center'
			minH='80vh'
			bg={bgColor}
			p={5}
			className='details-container'>
			<Box
				className='details-content'
				bg={bgColor}
				color={color}
				borderRadius='12px'
				boxShadow='lg'
				maxW='1200px'
				w='100%'
				p={8}>
				<NavLink to='/' className='homepage-button'>
					<HStack
						mb={20}
						color={color}
						cursor='pointer'
						p={10}
						w={70}
						borderRadius={6}
						border={`1px solid ${color}`}>
						<FaArrowLeft size={20} className='back-arrow' />
						<Text fontSize='md'>Back</Text>
					</HStack>
				</NavLink>

				{country ? (
					<Flex
						className='inner-content'
						justifyContent={"center"}
						alignItems={"center"}
						direction={{ base: "column", lg: "row" }}
						justify='space-between'
						gap={8}>
						<Box
							flex='1.5'
							h='full'
							overflow='hidden'
							borderRadius={10}
							className='image-container'>
							<Image
								src={country.flag}
								alt={`${country.name}'s flag`}
								borderRadius='10px'
								width='100%'
								height='350px'
								objectFit='cover'
							/>
						</Box>

						<Box flex='1.5' className='details-holder'>
							<Heading fontWeight='bold' fontSize='3xl' mb={6}>
								{country.name}
							</Heading>

							<VStack align='start' spacing={8} className='VS-details'>
								{countriesDetails.map(
									(detail, idx) =>
										detail.value && (
											<HStack key={idx} spacing={4} align='start'>
												<Text
													className='HV-title'
													fontWeight='bold'
													fontSize='lg'
													minW='150px'
													ml={40}>
													{detail.title}:
												</Text>
												<Tag
													className='HV-value'
													size='lg'
													fontSize='md'
													variant='outline'
													colorScheme='teal'>
													{detail.value}
												</Tag>
											</HStack>
										)
								)}
							</VStack>

							<Box mt={8} className='border-country'>
								<Heading fontSize='xl' mb={4}>
									<b>Border Countries:</b>
								</Heading>
								{country.borders?.length ? (
									<Flex wrap='wrap' gap={4}>
										{getBorderCountryNames(country.borders).map(
											(borderCountry) => (
												<NavLink
													key={borderCountry}
													to={`/country/${borderCountry}`}>
													<Tag
														size='md'
														colorScheme='teal'
														padding='8px'
														borderRadius='8px'
														cursor='pointer'
														color={color}
														boxShadow={"inset 0 0 12px -7px"}>
														{borderCountry}
													</Tag>
												</NavLink>
											)
										)}
									</Flex>
								) : (
									<Text fontSize='md' color={color} textAlign={"center"}>
										No bordering countries
									</Text>
								)}
							</Box>
						</Box>
					</Flex>
				) : (
					<Text fontSize='lg' color={color}>
						Country data not found.
					</Text>
				)}
			</Box>
		</Flex>
	);
}

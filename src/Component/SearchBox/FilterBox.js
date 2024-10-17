import React, { useState, useEffect, useRef } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

export default function FilterBox({
	bg,
	color,
	onRegionChange,
	selectedRegion,
}) {
	const [display, setDisplay] = useState(true); // Dropdown toggle state
	const dropdownRef = useRef(null); // Ref to track clicks outside dropdown

	// Close dropdown if clicked outside
	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setDisplay(true);
		}
	};

	// Toggle dropdown visibility
	const toggleContent = () => setDisplay((prev) => !prev);

	// Add/remove click event listener for outside clicks
	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	// Handle region selection
	const handleRegionClick = (region) => {
		onRegionChange(region);
		setDisplay(false);
	};

	const icon = display ? BsCaretUpFill : BsCaretDownFill; // Toggle icon based on display state

	return (
		<Box className='filter' bg={bg} onClick={toggleContent} ref={dropdownRef}>
			{`Region: ${selectedRegion} `}
			<Icon as={icon} size={24} marginLeft={10} />
			<Box
				className='filter-content'
				bg={bg}
				display={display ? "none" : "flex"}>
				{["All", "Africa", "Americas", "Asia", "Europe", "Oceania"].map(
					(region) => (
						<li
							key={region}
							onClick={() => handleRegionClick(region)}
							style={{
								cursor: "pointer",
								color: selectedRegion === region ? "#0081ac" : color,
								listStyle: selectedRegion === region ? "disc" : "circle",
							}}>
							{region}
						</li>
					)
				)}
			</Box>
		</Box>
	);
}

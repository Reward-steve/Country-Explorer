import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop({ color }) {
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScroll((s) => (s = window.scrollY));
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scroll]);

	return (
		<>
			{scroll > 150 && (
				<Box className='scroll-to-top'>
					<Box
						color={color}
						borderRadius={50}
						w={"100%"}
						h={"100%"}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						border={`1px solid ${color}`}
						cursor='pointer'
						boxShadow={`inset 0 0 20px -3px`}
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
						<FaArrowUp className='arrow' />
					</Box>
				</Box>
			)}
		</>
	);
}

import { Box } from "@chakra-ui/react";
import Mode from "./Mode";

export default function NavBar({
	color,
	modeIcon,
	modeTitle,
	toggleMode,
	bgColor,
	rotate,
}) {
	return (
		<>
			<Box className='Navbar' bg={bgColor} color={color}>
				<h2>Where in the world?</h2>
				<Mode
					toggleMode={toggleMode}
					modeIcon={modeIcon}
					title={modeTitle}
					color={color}
					rotate={rotate}
				/>
			</Box>
		</>
	);
}

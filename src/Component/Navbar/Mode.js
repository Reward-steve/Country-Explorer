import { Box } from "@chakra-ui/react";

export default function ChangeMode({
	toggleMode,
	modeIcon,
	title,
	color,
	rotate,
}) {
	return (
		<Box
			className='mode'
			onClick={toggleMode}
			display='flex'
			alignItems='center'
			cursor='pointer'
			color={color}>
			<Box
				display={"flex"}
				alignItems={"center"}
				justifyContent={"center"}
				rotate={rotate}>
				{modeIcon}
			</Box>
			<p>{title}</p>
		</Box>
	);
}

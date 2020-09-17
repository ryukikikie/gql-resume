import React from "react";
import { Moon, Sun } from "react-feather";

import Toggle from "./Toggle";
import useDarkMode from "use-dark-mode";

const DarkModeToggle = () => {
	const darkMode = useDarkMode(false);

	return (
		<div className="dark-mode-toggle">
			{darkMode.value ? (
				<button type="button" onClick={darkMode.disable}>
					<Sun />
				</button>
			) : (
				<button type="button" onClick={darkMode.enable}>
					<Moon />
				</button>
			)}
		</div>
	);
};

export default DarkModeToggle;

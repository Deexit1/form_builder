"use client";

import { InputsProvider } from "./InputProvider";

interface AppProvidersProps {
	children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
	return <InputsProvider>{children}</InputsProvider>;
};

export default AppProviders;

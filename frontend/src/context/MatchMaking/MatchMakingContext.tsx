import { createContext, Dispatch, SetStateAction, useState } from 'react';

type Props = {
	children: React.ReactNode;
};
export enum Platform {
	PC = 'PC',
	Xbox = 'Xbox',
	Playstation = 'Playstation'
}
type Context = {
	platform: Platform;
	level: number;
	maxUpgrade: number;
	maxSomberUpgrade: number;
	globalMaxUpgrade: number;
	setMatchMakingDetails: Dispatch<SetStateAction<Context>>;
};

const initialContext: Context = {
	platform: Platform.PC,
	level: 1,
	maxUpgrade: 0,
	maxSomberUpgrade: 0,
	globalMaxUpgrade: 0,
	setMatchMakingDetails: (): void => {
		throw new Error('setMatchMakingDetails function must be overridden');
	}, // noop default callback
};
export const MatchMakingContext = createContext<Context>(initialContext);

export const MatchMakingProvider = ({ children }: Props): JSX.Element => {
	const [contextState, setMatchMakingDetails] = useState<Context>(initialContext);

	return (
		<MatchMakingContext.Provider value={{ ...contextState, setMatchMakingDetails }}>
			{children}
		</MatchMakingContext.Provider>
	);
};

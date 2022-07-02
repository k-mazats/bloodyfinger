import { useContext, useEffect, useState } from 'react';
import { MatchMakingContext } from '../../context/MatchMaking/MatchMakingContext';

import Grace from '../../components/Grace/Grace';

import { getGraces, } from '../../api/api';
const Maps = () => {
	const matchMakingDetails = useContext(MatchMakingContext);
	const [graces, setGraces] = useState([]);
	const [mapMode, setMapMode] = useState('Overworld');
	useEffect(() => {
		(async () => {
			const gracesData = await getGraces();
			setGraces(gracesData);
		})();
	}, []);
	const selectMap = (e: any) => {
		setMapMode(e.target.value);
	};
	
	return (
		<>
			<div>
				<select onChange={selectMap}>
					<option value="Overworld">Overworld</option>
					<option value="Underworld">Underworld</option>
					<option value="Endgame">Endgame</option>
				</select>
			</div>
			{graces.length > 0 ? (
				<table>
					<tbody>
						{graces.map((grace: any, index: number) => {
							switch (mapMode) {
								case 'Overworld':
									if (
										!grace.attributes.endgame &&
										!grace.attributes.underground
									) {
										return (
											<Grace
												key={`grace-${grace.id}`}
												grace={grace}
												matchMakingDetails={matchMakingDetails}
											></Grace>
										);
									}
									break;
								case 'Underworld':
									if (grace.attributes.underground) {
										return (
											<Grace
												key={`grace-${grace.id}`}
												grace={grace}
												matchMakingDetails={matchMakingDetails}
											></Grace>
										);
									}
									break;
								case 'Endgame':
									if (grace.attributes.endgame) {
										return (
											<Grace
												key={`grace-${grace.id}`}
												grace={grace}
												matchMakingDetails={matchMakingDetails}
											></Grace>
										);
									}
									break;
							}
						})}
					</tbody>
				</table>
			) : null}
		</>
	);
};

export default Maps;

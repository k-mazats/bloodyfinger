import { useContext, useEffect, useState } from 'react';
import { MatchMakingContext } from '../../context/MatchMaking/MatchMakingContext';
import { getGraces, postTry } from '../../api/api';
const Maps = () => {
	const matchMakingDetails = useContext(MatchMakingContext);
	const [graces, setGraces] = useState([]);
	useEffect(() => {
		(async () => {
			const gracesData = await getGraces();
			setGraces(gracesData);
		})();
	}, []);
	const submitTry =
		(
			platform: string,
			grace: number,
			success: boolean,
			level: number,
			maxUpgrade: number
		) =>
		() => {
			postTry(platform, grace, success, level, maxUpgrade);
		};
	return (
		<>
			{graces.length > 0 ? (
				<table>
					<tbody>
						{graces.map((grace: any, index: number) => {
							return (
								<tr key={`grace-${index}`}>
									<td>{grace.attributes.name}</td>
									<td>
										<button
											onClick={submitTry(
												matchMakingDetails.platform.toLowerCase(),
												grace.id,
												false,
												matchMakingDetails.level,
												matchMakingDetails.globalMaxUpgrade
											)}
										>
											Unsuccesful
										</button>
									</td>
									<td>
										<button
											onClick={submitTry(
												matchMakingDetails.platform.toLowerCase(),
												grace.id,
												true,
												matchMakingDetails.level,
												matchMakingDetails.globalMaxUpgrade
											)}
										>
											Successful
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : null}
		</>
	);
};

export default Maps;

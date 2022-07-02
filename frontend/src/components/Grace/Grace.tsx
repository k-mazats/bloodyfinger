import { useEffect, useState } from 'react';
import { getTries, postTry } from '../../api/api';
const Grace = (props: any) => {
	const [tries, setTries] = useState([]);
	const [success, setSuccess] = useState('');
	const [reload, setReload] = useState(false);
	const submitTry =
		(
			platform: string,
			grace: number,
			success: boolean,
			level: number,
			maxUpgrade: number
		) =>
		() => {
			postTry(platform, grace, success, level, maxUpgrade).then(() =>
				setReload(!reload)
			);
		};
	useEffect(() => {
		(async () => {
			const triesData = await getTries(
				props.matchMakingDetails.platform.toLowerCase(),
				props.grace.attributes.name,
				props.matchMakingDetails.level,
				props.matchMakingDetails.globalMaxUpgrade
			);
			setTries(triesData);
		})();
	}, [
		props.grace.attributes.name,
		props.matchMakingDetails.globalMaxUpgrade,
		props.matchMakingDetails.level,
		props.matchMakingDetails.platform,
		reload,
	]);
	useEffect(() => {
		const totalTries = tries.length;
		console.log(totalTries);
		if (totalTries > 0) {
			const successfulTries = tries.reduce(
				(acc, cur: any) => (cur.attributes.try.success === true ? ++acc : acc),
				0
			);
			console.log(successfulTries);
			const successRate = (successfulTries / totalTries) * 100;
			setSuccess(`${successRate}% success`);
		} else {
			setSuccess('No datas available');
		}
	}, [tries]);
	return (
		<tr>
			<td>{props.grace.attributes.name}</td>
			<td>
				<button
					onClick={submitTry(
						props.matchMakingDetails.platform.toLowerCase(),
						props.grace.id,
						false,
						props.matchMakingDetails.level,
						props.matchMakingDetails.globalMaxUpgrade
					)}
				>
					Unsuccesful
				</button>
			</td>
			<td>
				<button
					onClick={submitTry(
						props.matchMakingDetails.platform.toLowerCase(),
						props.grace.id,
						true,
						props.matchMakingDetails.level,
						props.matchMakingDetails.globalMaxUpgrade
					)}
				>
					Successful
				</button>
			</td>
			<td>{success}</td>
		</tr>
	);
};

export default Grace;

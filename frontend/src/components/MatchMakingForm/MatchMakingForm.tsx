import { useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { Platform, MatchMakingContext } from '../../context/MatchMaking/MatchMakingContext';

const MatchMakingForm = () => {
	const navigate = useNavigate();
	const {
		platform,
		level,
		maxUpgrade,
		maxSomberUpgrade,
		globalMaxUpgrade,
		setMatchMakingDetails,
	} = useContext(MatchMakingContext);
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setMatchMakingDetails(
			(prevState) => ({
				...prevState,
				[name]: parseInt(value),
			}),
		);
	};
	const selectPlatform = (e:any) => {
		setMatchMakingDetails((prevState) => ({
			...prevState,
			platform: e.target.value,
		}));
	}
	const handleSubmit = (e: any) =>{
		e.preventDefault();
		 navigate('../maps', { replace: false });
	}
	useEffect(() => {
		const max = Math.max(maxUpgrade, Math.floor(maxSomberUpgrade * 2.5));
		setMatchMakingDetails((prevState) => ({
			...prevState,
			globalMaxUpgrade: max,
		}));
	}, [maxSomberUpgrade, maxUpgrade, setMatchMakingDetails]);
	return (
		<form onSubmit={handleSubmit}>
			<label>
				Platform :
				<select name="" id="" onChange={selectPlatform}>
					<option value="PC">PC</option>
					<option value="Xbox">Xbox</option>
					<option value="Playstation">Playstation</option>
				</select>
			</label>
			<label htmlFor="">
				Rune level :
				<input
					type="number"
					value={level}
					onChange={handleChange}
					name="level"
				/>
			</label>
			<label htmlFor="">
				Max weapon upgrade :
				<input
					type="number"
					min="0"
					max="25"
					value={maxUpgrade}
					onChange={handleChange}
					name="maxUpgrade"
				/>
			</label>
			<label htmlFor="">
				Max somber weapon upgrade :
				<input
					type="number"
					min="0"
					max="10"
					value={maxSomberUpgrade}
					onChange={handleChange}
					name="maxSomberUpgrade"
				/>
			</label>
			<button>Search on the map</button>
		</form>
	);
};

export default MatchMakingForm;

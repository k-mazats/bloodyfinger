const axios = require('axios').default;
const qs = require('qs');
const baseUrl = 'http://localhost:1337/api';
const getGraces = async () => {
	const response = await axios({
		method: 'get',
		url: `${baseUrl}/graces`,
	});
	return response.data.data;
};
const postTry = async (
	platform: string,
	grace: number,
	success: boolean,
	level: number,
	maxUpgrade: number
) => {
	const response = await axios({
		method: 'post',
		url: `${baseUrl}/${platform}s`,
		data: { data: { try: { grace, success, level, maxUpgrade } } },
	});
	return response.data.data;
};
const getTries = async (
	platform: string,
	grace: number,
	level: number,
	maxUpgrade: number
) => {
	const params = {
		filters: {
			$and: [
				{
					try: {
						level: {
							$between: [level - 5 > 0 ? level - 5 : 1, level + 5],
						},
					},
				},
				{
					try: {
						grace: {
							name: { $eq: grace },
						},
					},
				},
				{
					try: {
						maxUpgrade: {
							$eq: maxUpgrade,
						},
					},
				},
			],
		},
		populate: '*',
	};
	const response = await axios({
		method: 'get',
		url: `${baseUrl}/${platform}s`,
		params,
		paramsSerializer: (params: object) =>
			qs.stringify(params, { encodeValuesOnly: true }),
	});
	return response.data.data;
};
export { getGraces, postTry, getTries };

// http://localhost:1337/api/playstations?filters[try][level][$between][0]=1&filters[try][level][$between][1]=5&filters[try][maxUpgrade][$eq]=4&populate=*
// http://localhost:1337/api/pcs?filters[try][level][$between][0]=1&filters[try][level][$between][1]=6&filters[try][maxUpgrade][$eq]=0&filters[try][grace][$eq]=256&populate=*

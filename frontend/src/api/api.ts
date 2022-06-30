const axios = require('axios').default;
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
	console.log(response);
};
export { getGraces, postTry };

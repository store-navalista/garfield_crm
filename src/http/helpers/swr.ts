import useSWR from 'swr';

const getContent = (url: string) => {
	const fetcher = async () => {
		const response = await fetch(url);
		return await response.json();
	};
	return useSWR(url, fetcher);
}

export default getContent;
import fetcher from './fetcher';

export const auth = (
	mode: 'signin' | 'signup',
	body: any
) => {
  return fetcher(`/${mode}`, body)
};


const token = (): string | null =>
{
	return localStorage.getItem('accessToken');
};

export { token };

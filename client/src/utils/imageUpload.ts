export const checkImage = (file: File) => {
	const types = ['image/png', 'image/jpeg'];

	let err = '';

	if (!file) return 'Файл не существует';

	if (file.size > 1024 * 1024) err = 'Максимальный размер изображения 1mb';

	if (!types.includes(file.type)) err = 'Формат изображения png/jpeg';

	return err;
};

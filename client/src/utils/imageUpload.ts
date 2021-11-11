export const checkImage = (file: File) => {
    let err = '';

    if (!file) return err = "Файл не существует";

    if (file.size > 1024 * 1024) err = "Максимальный размер изображения 1mb"

    return err;
}
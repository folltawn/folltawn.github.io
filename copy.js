async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Текст скопирован: ', text);
        return true;
    } catch (err) {
        console.error('Ошибка копирования: ', err);
        return false;
    }
}
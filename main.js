const config = require('./config');

document.addEventListener("DOMContentLoaded", function() {
    const translateButton = document.querySelectorAll('.btn');
    const inputText = document.querySelector('input[name="text"]');
    const translatedText = document.querySelector('.translatedTextContainer p');
    const selectedLanguage = document.querySelector('.translatedTextContainer h5');

    translateButton.forEach(button => {
        button.addEventListener('click', function() {
            const language = button.textContent;
            if (language === 'ELIMINA') {
                inputText.value = '';
                translatedText.textContent = '';
                selectedLanguage.textContent = '';
            } else {
                const textToTranslate = inputText.value;
                const translatedLanguage = language.toLowerCase();
                translateText(textToTranslate, translatedLanguage);
            }
        });
    });

    async function translateText(text, language) {
        try {
            const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${config.apiKey}&q=${text}&target=${language}`);
            const data = await response.json();
            const translatedTextResult = data.data.translations[0].translatedText;
            translatedText.textContent = translatedTextResult;
            selectedLanguage.textContent = `Lingua selezionata: ${language}`;
        } catch (error) {
            console.error('Si è verificato un errore durante la traduzione:', error);
        }
    }
});
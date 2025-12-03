import LocalizedStrings from 'react-localization'

let strings = new LocalizedStrings({
    ru: {
        empty: 'Пока пусто',
        empty_span: 'Запиши свою первую заметку!',
        empty_button: 'Создать заметку'
    },
    en: {
        empty: 'Not found',
        empty_span: 'Write down your first note!',
        empty_button: 'Create a note'
    },
})

export default strings
import LocalizedStrings from 'react-localization'

let strings = new LocalizedStrings({
    ru: {
        note: 'Заметка',

        // Все заметки
        notesEmpty: 'Пока пусто',
        notesEmptySpan: 'Запиши свою первую заметку!',
        notesEmptyButton: 'Создать заметку',

        // Настройки
        settingsTitle: 'Настройки',
        settingsAppTheme: 'Тема приложения',
        settingsAppLanguage: 'Язык приложения',
        settingsLightTheme: 'Светлая тема',
        settingsDarkTheme: 'Темная тема',
        settingsImport: 'Импортировать заметку',
        settingsImportError: 'Невозможно импортировать файл. Он недействителен',
    },
    en: {
        note: 'Note',

        // Все заметки
        notesEmpty: 'Not found',
        notesEmptySpan: 'Write down your first note!',
        notesEmptyButton: 'Create a note',

        // Настройки
        settingsTitle: 'Settings',
        settingsAppTheme: 'Application theme',
        settingsAppLanguage: 'Application language',
        settingsLightTheme: 'Light theme',
        settingsDarkTheme: 'Dark theme',
        settingsImport: 'Import a note',
        settingsImportError: 'The file cannot be imported. It is invalid',
    },
})

export default strings
import LocalizedStrings from 'react-localization'

let strings = new LocalizedStrings({
    ru: {
        note: 'Заметка',
        create: 'Создать',
        search: 'Найти заметку',
        cancel: 'Отмена',
        edit: 'Редактировать',
        notfound: 'Заметка не найдена',

        // Создать / редактировать
        createText: 'Текст',
        createNameNote: 'Название заметки',
        createSave: 'Сохранить',
        createSetPassword: 'Установить пароль',
        createResetPassword: 'Сбросить пароль',
        createMicrophone: 'Микрофон',
        createOn: 'включен',
        createOff: 'выключен',

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

        // Сортировка
        sortTitle: 'Отсортировать',
        sortTabTitle: 'По заголовку',
        sortTabCreated: 'По дате создания',
        sortTabUpdated: 'По дате изменения',

        // Сохранение
        saveTitle: 'Заметка сохранена',
        saveTitleButton: 'Все заметки',

        // Ввод пароля
        password: 'Пароль',
        passwordTitle: 'Введите пароль',
        passwordSpan: 'На заметку',
        passwordInput: 'Пароль',
        passwordUnblock: 'Разблокировать',
        passwordAddTitle: 'Установка пароля',
        passwordAddButton: 'Установить',

        // Удаление заметки
        delete: 'Удалить',
        deteteWarn: 'Вы уверены, что хотите удалить заметку',

        // Скачать
        download: 'Скачать',
        downloadNote: 'Заметку',
        downloadTxt: 'Текстовой файл',
        downloadDocx: 'Файл Word',
        downloadJson: 'Экспорт JSON',
    },
    en: {
        note: 'Note',
        create: 'Create',
        search: 'Find a note',
        cancel: 'Cancel',
        edit: 'Edit',
        notfound: 'Note not found',

        // Создать / редактировать
        createText: 'Text',
        createNameNote: 'Name of the note',
        createSave: 'Save',
        createSetPassword: 'Set a password',
        createResetPassword: 'Reset password',
        createMicrophone: 'Microphone',
        createOn: 'on',
        createOff: 'off',

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

        // Сортировка
        sortTitle: 'Sort',
        sortTabTitle: 'By title',
        sortTabCreated: 'By creation date',
        sortTabUpdated: 'By date of change',

        // Сохранение
        saveTitle: 'The note is saved',
        saveTitleButton: 'All notes',

        // Ввод пароля
        password: 'Password',
        passwordTitle: 'Enter the password',
        passwordSpan: 'For the note',
        passwordInput: 'Password',
        passwordUnblock: 'Unblock',
        passwordAddTitle: 'Setting a password',
        passwordAddButton: 'Set',

        // Удаление заметки
        delete: 'Delete',
        deteteWarn: 'Are you sure you want to delete the note',

        // Скачать
        download: 'Download',
        downloadNote: 'A note',
        downloadTxt: 'Text file',
        downloadDocx: 'File Word',
        downloadJson: 'Export JSON',
    },
})

export default strings
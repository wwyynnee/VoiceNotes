import { createContext } from "react"

const NotesContext = createContext({
    searchQuery: String,
    setSearchQuery: () => {},
    filteredNotes: Array,

    onOpenSort: () => {},
    onCloseSort: () => {},
    onSortNotes: () => {},

    onOpenSettings: () => {},
    onCloseSettings: () => {},
    savedLang: String,

    onOpenDownload: () => {},
    onCloseDownload: () => {},

    onOpenDelete: () => {},
    onCloseDelete: () => {},
    onDelete: () => {},

    activeNote: {},
    passwordOpen: Boolean,
    onOpenPassword: () => {},
    onClosePassword: () => {},

    onOpenSave: () => {},
    onCloseSave: () => {},
    onSave: () => {},

    onOpenAddPassword: () => {},
    onCloseAddPassword: () => {},
    password: String,
    setPassword: () => {},
    
    saveTitle: String,
    isSortActive: Boolean,
    isSettingsActive: Boolean,
    isDownloadActive: Boolean,
    isDeleteActive: Boolean,
    isPasswordActive: Boolean,
    isSaveActive: Boolean,
    noteId: Number,
    noteTitle: String,
    noteIdDownload: Number,
    noteTitleDownload: String,
    notes: Array,
})

export default NotesContext

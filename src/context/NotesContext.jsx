import { createContext } from "react"

const NotesContext = createContext({
    onOpenSort: () => {},
    onCloseSort: () => {},

    onOpenSettings: () => {},
    onCloseSettings: () => {},

    onOpenDownload: () => {},
    onCloseDownload: () => {},

    onOpenDelete: () => {},
    onCloseDelete: () => {},
    onDelete: () => {},

    onOpenPassword: () => {},
    onClosePassword: () => {},

    onOpenSave: () => {},
    onCloseSave: () => {},
    onSave: () => {},

    onOpenAddPassword: () => {},
    onCloseAddPassword: () => {},
    
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

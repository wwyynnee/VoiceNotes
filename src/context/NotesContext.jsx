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
    saveTitle: String,
    isSortActive: Boolean,
    isSettingsActive: Boolean,
    isDownloadActive: Boolean,
    isDeleteActive: Boolean,
    noteId: Number,
    noteTitle: String,
    notes: Array,
})

export default NotesContext

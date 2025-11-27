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
    onOpenPassword: () => {},
    onClosePassword: () => {},
    isSortActive: Boolean,
    isSettingsActive: Boolean,
    isDownloadActive: Boolean,
    isDeleteActive: Boolean
})

export default NotesContext

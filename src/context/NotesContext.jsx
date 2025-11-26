import { createContext } from "react";

const NotesContext = createContext({
    onOpenSort: () => {},
    onCloseSort: () => {},
    isSortActive: Boolean,
    onOpenSettings: () => {},
    onCloseSettings: () => {},
    isSettingsActive: Boolean,
    onOpenDownload: () => {},
    onCloseDownload: () => {},
    isDownloadActive: Boolean,
})

export default NotesContext

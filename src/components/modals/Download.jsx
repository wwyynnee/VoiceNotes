import { useContext } from 'react'
import NotesContext from '../../context/NotesContext'
import { downloadTxt, downloadDocx, downloadJson } from '../../utils/download'
import strings from '../../utils/localization'
import styles from './Modals.module.scss'

function Download() {
    const { onCloseDownload, noteToDownload } = useContext(NotesContext)

    if(!noteToDownload) return null

    const { title, content } = noteToDownload

    return (
        <div className={styles.modal} onClick={onCloseDownload}>
            <div className={`${styles.modalBlock} ${styles.modalDownload}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.modalBlockContainer} ${styles.modalDownloadContainer}`}>
                    <p>{strings.download}</p>
                    <svg onClick={onCloseDownload} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5284 7.67245L7.59286 11.5498L0 4.06914L3.74776 0.00685056L11.5284 7.67245ZM16.9379 13.0021L25.9944 4.07941L22.2641 0L0.0048672 21.9302L3.74498 26L13.0024 16.8794L22.2599 26L26 21.9302L16.9379 13.0021Z" fill="#222222"/>
                    </svg>
                </div>
                <div className={`${styles.modalBlockContainer} ${styles.modalDownloadContainer}`}>
                    <span>{strings.downloadNote} «{title}»</span>
                    <button onClick={() => downloadTxt(title, content)}>{strings.downloadTxt}</button>
                    <button onClick={() => downloadDocx(title, content)}>{strings.downloadDocx}</button>
                    <button onClick={() => downloadJson(noteToDownload)}>{strings.downloadJson}</button>
                </div>
            </div>
        </div>
    )
}

export default Download
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import NotesContext from '../../context/NotesContext'
import strings from '../../utils/localization'
import styles from './Modals.module.scss'

function Save() {
    const { saveTitle, onCloseSave } = useContext(NotesContext)
    const navigate = useNavigate()

    async function saveNote() {
        await onCloseSave()
        navigate('/')
    }

    return (
        <div className={styles.modal}>
            <div className={`${styles.modalBlock} ${styles.modalDefault}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer}`}>
                    <p>{strings.saveTitle}!</p>
                    <span>«{saveTitle}»</span>
                </div>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer} ${styles.modalDefaultContainerFull}`}>
                    <button onClick={saveNote}>{strings.saveTitleButton}</button>
                </div>
            </div>
        </div>
    )
}

export default Save
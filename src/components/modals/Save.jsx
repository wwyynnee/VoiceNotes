import { useContext } from 'react'
import { useNavigate } from 'react-router'
import NotesContext from '../../context/NotesContext'
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
                    <p>Заметка сохранена!</p>
                    <span>«{saveTitle}»</span>
                </div>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer} ${styles.modalDefaultContainerFull}`}>
                    <button onClick={saveNote}>Все заметки</button>
                </div>
            </div>
        </div>
    )
}

export default Save
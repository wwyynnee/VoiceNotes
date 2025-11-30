import { useContext } from 'react'
import { useNavigate } from 'react-router'
import NotesContext from '../../context/NotesContext'
import styles from './Modals.module.scss'

function Delete() {
    const { noteId, noteTitle, onDelete, onCloseDelete } = useContext(NotesContext)
    const navigate = useNavigate()

    async function deleteNote() {
        await onDelete(noteId)
        navigate('/')
    }

    return (
        <div className={styles.modal} onClick={onCloseDelete}>
            <div className={`${styles.modalBlock} ${styles.modalDefault}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer}`}>
                    <p>Вы уверены, что хотите удалить заметку?</p>
                    <span>«{noteTitle}»</span>
                </div>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer}`}>
                    <button onClick={deleteNote}>Удалить</button>
                    <button onClick={onCloseDelete}>Отмена</button>
                </div>
            </div>
        </div>
    )
}

export default Delete
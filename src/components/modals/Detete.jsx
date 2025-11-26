import { useContext } from 'react'
import NotesContext from '../../context/NotesContext'
import styles from './Modals.module.scss'

function Delete() {
    const { onCloseDelete } = useContext(NotesContext)

    return (
        <div className={styles.modal} onClick={onCloseDelete}>
            <div className={`${styles.modalBlock} ${styles.modalDefault}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer}`}>
                    <p>Вы уверены, что хотите удалить заметку?</p>
                    <span>«Название заметки»</span>
                </div>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer}`}>
                    <button>Удалить</button>
                    <button onClick={onCloseDelete}>Отмена</button>
                </div>
            </div>
        </div>
    )
}

export default Delete
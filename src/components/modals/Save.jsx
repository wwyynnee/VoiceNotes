import { useContext } from 'react'
import { useNavigate } from 'react-router'
import NotesContext from '../../context/NotesContext'
import styles from './Modals.module.scss'

function Save() {
    const { noteTitle } = useContext(NotesContext)
    const navigate = useNavigate()

    return (
        <div className={styles.modal}>
            <div className={`${styles.modalBlock} ${styles.modalDefault}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer}`}>
                    <p>Заметка сохранена!</p>
                    <span>«{noteTitle}»</span>
                </div>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer} ${styles.modalDefaultContainerFull}`}>
                    <button onClick={() => navigate('/')}>Все заметки</button>
                </div>
            </div>
        </div>
    )
}

export default Save
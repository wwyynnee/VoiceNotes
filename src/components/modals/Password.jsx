import { useContext } from 'react'
import NotesContext from '../../context/NotesContext'
import styles from './Modals.module.scss'

function Password() {
    const { onClosePassword } = useContext(NotesContext)

    return (
        <div className={styles.modal} onClick={onClosePassword}>
            <div className={`${styles.modalBlock} ${styles.modalDefault}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer}`}>
                    <p>Введите пароль</p>
                    <span>На заметку «Название заметки»</span>
                </div>
                <input type="text" placeholder="Пароль" />
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer} ${styles.modalPasswordContainer}`}>
                    <button className={styles.modalPasswordContainerOpacity}>Разблокировать</button>
                    <button onClick={onClosePassword}>Отмена</button>
                </div>
            </div>
        </div>
    )
}

export default Password
import { useContext } from 'react'
import NotesContext from '../../context/NotesContext'
import styles from './Modals.module.scss'

function AddPassword() {
    const { onCloseAddPassword } = useContext(NotesContext)

    return (
        <div className={styles.modal} onClick={onCloseAddPassword}>
            <div className={`${styles.modalBlock} ${styles.modalDefault}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer} ${styles.modalAddPasswordContainer}`}>
                    <p>Установка пароля</p>
                </div>
                <input type="text" placeholder="Пароль" />
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer} ${styles.modalPasswordContainer}`}>
                    <button className={styles.modalPasswordContainerOpacity}>Установить</button>
                    <button onClick={onCloseAddPassword}>Отмена</button>
                </div>
            </div>
        </div>
    )
}

export default AddPassword
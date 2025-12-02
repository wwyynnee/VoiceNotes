import { useContext } from 'react'
import NotesContext from '../../context/NotesContext'
import styles from './Modals.module.scss'

function RemovePassword() {
    const { onCloseRemovePassword } = useContext(NotesContext)

    return (
        <div className={styles.modal} onClick={onCloseRemovePassword}>
            <div className={`${styles.modalBlock} ${styles.modalDefault}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer} ${styles.modalAddPasswordContainer}`}>
                    <p>Сброс пароля</p>
                </div>
                <input type="text" placeholder="Введите пароль" />
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer} ${styles.modalPasswordContainer}`}>
                    <button className={styles.modalPasswordContainerOpacity}>Сбросить</button>
                    <button onClick={onCloseRemovePassword}>Отмена</button>
                </div>
            </div>
        </div>
    )
}

export default RemovePassword
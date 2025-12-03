import { useContext, useEffect, useState } from 'react'
import NotesContext from '../../context/NotesContext'
import styles from './Modals.module.scss'

function AddPassword() {
    const { onCloseAddPassword, password, setPassword } = useContext(NotesContext)
    const [value, setValue] = useState(password || '')

    useEffect(() => {
        setValue(password || '')
    }, [password])
    
    async function handleSet() {
        const v = value.trim()

        if (!v) return
        setPassword(v)
        onCloseAddPassword()
    }

    return (
        <div className={styles.modal} onClick={onCloseAddPassword}>
            <div className={`${styles.modalBlock} ${styles.modalDefault}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer} ${styles.modalAddPasswordContainer}`}>
                    <p>Установка пароля</p>
                </div>
                <input type="text" placeholder="Введите пароль" value={value} onChange={e => setValue(e.target.value)} />
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer} ${styles.modalPasswordContainer}`}>
                    <button
                        className={!value.trim() ? styles.modalPasswordContainerOpacity : ''}
                        onClick={handleSet}
                        disabled={!value.trim()}
                    >
                        Установить
                    </button>
                    <button onClick={onCloseAddPassword}>Отмена</button>
                </div>
            </div>
        </div>
    )
}

export default AddPassword
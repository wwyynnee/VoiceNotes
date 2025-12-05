import { useContext, useState, useEffect } from 'react'
import NotesContext from '../../context/NotesContext'
import strings from '../../utils/localization'
import styles from './Modals.module.scss'

function Password() {
    const { onClosePassword, activeNote } = useContext(NotesContext)
    const [input, setInput] = useState('')
    const [valid, setValid] = useState(false)

    useEffect(() => {
        if (activeNote?.password) {
            try {
                const decoded = atob(activeNote.password)
                setValid(input === decoded)
            } catch {
                setValid(false)
            }
        } else {
            setValid(true)
        }
    }, [input, activeNote])

    const handleUnlock = () => {
        if (!valid) return
        if (activeNote.onUnlock) activeNote.onUnlock()
        onClosePassword()
    }

    return (
        <div className={styles.modal} onClick={onClosePassword}>
            <div className={`${styles.modalBlock} ${styles.modalDefault}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer}`}>
                    <p>{strings.passwordTitle}</p>
                    <span>{strings.passwordSpan} «{activeNote?.title}»</span>
                </div>
                <input type="text" placeholder={strings.password} value={input} onChange={e => setInput(e.target.value)} />
                <div className={`${styles.modalBlockContainer} ${styles.modalDefaultContainer} ${styles.modalPasswordContainer}`}>
                    <button className={!valid ? styles.modalPasswordContainerOpacity : ''} onClick={handleUnlock} disabled={!valid}>{strings.passwordUnblock}</button>
                    <button onClick={onClosePassword}>{strings.cancel}</button>
                </div>
            </div>
        </div>
    )
}

export default Password
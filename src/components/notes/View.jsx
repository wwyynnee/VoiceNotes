import styles from './View.module.scss'
import ViewButtons from './ViewButtons'

function View() {
    return (
        <div className={styles.view}>
            <ViewButtons />
            <div className={styles.viewContainer}>
                <h1>Название заметки</h1>
            </div>
            <div className={styles.viewContainer}>
                <p>Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст</p>
                <p>Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст</p>
            </div>
        </div>
    )
}

export default View
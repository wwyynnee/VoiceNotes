import styles from './Sort.module.scss'

function Sort() {
    return (
        <div className={styles.modal}>
            <div className={styles.modalBlock}>
                <div className={styles.modalBlockContainer}>
                    <p>Отсортировать</p>                
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5284 7.67245L7.59286 11.5498L0 4.06914L3.74776 0.00685056L11.5284 7.67245ZM16.9379 13.0021L25.9944 4.07941L22.2641 0L0.0048672 21.9302L3.74498 26L13.0024 16.8794L22.2599 26L26 21.9302L16.9379 13.0021Z" fill="#222222"/>
                    </svg>
                </div>
                <div className={styles.modalBlockContainer}>
                    <button>По заголовку</button>
                    <button>По дате создания</button>
                    <button>По дате изменения</button>
                </div>
            </div>
        </div>
    )
}

export default Sort
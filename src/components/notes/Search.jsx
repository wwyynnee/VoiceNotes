import styles from './Search.module.scss'

function Search({ type }) {
    return (
        <div className={`${styles.search} ${type === 'mobile' && styles.searchMobile}`}>
            <button>                       
                <svg width="30" height="16" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="2" fill="#222222"/>
                    <rect y="7" width="23" height="2" fill="#222222"/>
                    <rect y="14" width="16" height="2" fill="#222222"/>
                </svg>
            </button>
            <input type="text" name="search" placeholder='Найти заметку' />
        </div>
    )
}

export default Search
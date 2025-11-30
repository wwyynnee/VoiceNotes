import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router'
import NotesContext from '../../context/NotesContext'
import styles from './List.module.scss'

function Notes() {
    const { onOpenDownload, isDownloadActive, onOpenDelete, isDeleteActive, noteId, notes } = useContext(NotesContext)
    const navigate = useNavigate()   

    function formatDate(timestamp) {
        const date = new Date(timestamp)
    
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
    
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
    
        return `${day}.${month}.${year} ${hours}:${minutes}`
    }

    // при нажатии на кнопки блокируем переход на заметку
    function linkNote(e) {
        if (e.target.closest('button')) {
            e.preventDefault()
        }
    }

    function linkButtonEdit(id) {
        navigate(`/edit/${id}`)
    }

    return (
        <div className={styles.notes}>

            {notes.length === 0 && (
                <div className={styles.notesEmpty}>
                    <p>Пока пусто</p>
                    <p>Запиши свою первую заметку!</p>
                    <NavLink to="/create">Создать заметку</NavLink>
                </div>
            )}

            {notes.map(note => (
                <NavLink key={note.id} to={`/note/${note.id}`} className={styles.notesItem}
                onClick={linkNote}>
                    <div className={styles.notesItemContainer}>
                        <p>
                            {note.title}
                            {/* <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.77109 9.02405C1.51474 9.11726 1.04867 9.49012 0.722417 9.83968C0.139823 10.4456 0.139823 10.5155 0.0699113 15.2229L0 20.0001L7.57372 19.9302L15.1708 19.8603L15.9165 19.0913L16.6855 18.3456L16.7554 13.5683L16.8253 8.79101L9.53124 8.81432C5.52299 8.81432 2.02743 8.90753 1.77109 9.02405ZM5.15013 13.4518C5.40647 13.7081 5.61621 14.1276 5.61621 14.3839C5.61621 14.9898 4.82388 15.7821 4.21798 15.7821C3.61208 15.7821 2.81976 14.9898 2.81976 14.3839C2.81976 14.1276 3.02949 13.7081 3.28583 13.4518C3.54217 13.1954 3.96164 12.9857 4.21798 12.9857C4.47432 12.9857 4.89379 13.1954 5.15013 13.4518ZM9.34481 13.4518C9.60115 13.7081 9.81088 14.1276 9.81088 14.3839C9.81088 14.9898 9.01856 15.7821 8.41266 15.7821C7.80676 15.7821 7.01443 14.9898 7.01443 14.3839C7.01443 14.1276 7.22417 13.7081 7.48051 13.4518C7.73685 13.1954 8.15632 12.9857 8.41266 12.9857C8.669 12.9857 9.08847 13.1954 9.34481 13.4518ZM13.5395 13.4518C13.7958 13.7081 14.0056 14.1276 14.0056 14.3839C14.0056 14.9898 13.2132 15.7821 12.6073 15.7821C12.351 15.7821 11.9315 15.5724 11.6752 15.3161C11.4188 15.0597 11.2091 14.6403 11.2091 14.3839C11.2091 14.1276 11.4188 13.7081 11.6752 13.4518C11.9315 13.1954 12.351 12.9857 12.6073 12.9857C12.8637 12.9857 13.2831 13.1954 13.5395 13.4518Z" fill="#222222"/>
                                <path d="M6.78132 0.145229C5.12675 0.681216 3.70522 1.89301 2.9362 3.43106C2.70316 3.87383 2.47012 4.9458 2.40021 5.80804L2.28369 7.3927H3.72852H5.15005V6.27412C5.15005 4.96911 5.75595 3.85053 6.82793 3.19802C8.99518 1.86971 11.6751 3.64079 11.6751 6.39064V7.3927H13.0966H14.5415L14.425 5.80804C14.2618 3.43106 13.0966 1.61337 11.0925 0.588001C10.0905 0.0753179 7.73677 -0.181024 6.78132 0.145229Z" fill="#222222"/>
                            </svg> */}
                        </p>
                        <span>{formatDate(note.createdAt)}</span>
                    </div>
                    <div className={styles.notesItemContainer}>
                        <button onClick={onOpenDownload} className={isDownloadActive ? styles.notesItemContainerActive : ''}>                  
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.625 0.625C8.025 1.225 8 1.325 8 5.125V9H10H12V4.5V0H10.625C9.475 0 9.125 0.0999994 8.625 0.625Z" fill="white"/>
                                <path d="M4.75 10.65C4.75 10.725 5.925 11.95 7.375 13.325L10 15.875L12.625 13.325C14.075 11.95 15.25 10.725 15.25 10.65C15.25 10.575 12.9 10.5 10 10.5C7.1 10.5 4.75 10.575 4.75 10.65Z" fill="white"/>
                                <path d="M0 15.5V20H10H20V15.5V11H19.375C19.025 11 18.45 11.275 18.125 11.625C17.55 12.2 17.5 12.4 17.5 14.875V17.5H10H2.5V14.875C2.5 12.4 2.45 12.2 1.875 11.625C1.55 11.275 0.975 11 0.625 11H0V15.5Z" fill="white"/>
                            </svg>
                        </button>
                        <button onClick={() => linkButtonEdit(note.id)}>                     
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.0697 0C16.3231 4.88037e-08 15.5764 0.283062 15.0006 0.854065L13.9026 1.95692L18.0409 6.0957L19.1436 4.99762C20.2855 3.85073 20.2855 2.00095 19.1436 0.854065C18.5727 0.283062 17.8212 0 17.0697 0ZM12.8676 2.99209L3.48923 12.3725L7.62751 16.5113L17.0058 7.13087L12.8676 2.99209ZM2.45419 13.4067L0 20L6.59247 17.5455L2.45419 13.4067Z" fill="white"/>
                            </svg>
                        </button>
                        <button onClick={() => onOpenDelete(note)} className={isDeleteActive && noteId === note.id ? styles.notesItemContainerActive : ''}>
                            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.08333 0C6.30086 0 5.66667 0.639524 5.66667 1.42857V2.38095H1.88889C0.84575 2.38095 0 3.23381 0 4.28571V4.7619H15.1111C16.1542 4.7619 17 3.90905 17 2.85714V2.38095H11.3333V0H7.08333ZM15.5833 6.12816C15.4322 6.17102 15.2764 6.19048 15.1111 6.19048H1.41667V20H13.6944C14.7381 20 15.5833 19.1476 15.5833 18.0952V6.12816ZM4.72222 8.09524C5.24403 8.09524 5.66667 8.52143 5.66667 9.04762V18.0952H3.77778V9.04762C3.77778 8.52143 4.20042 8.09524 4.72222 8.09524ZM8.5 8.09524C9.02181 8.09524 9.44444 8.52143 9.44444 9.04762V18.0952H7.55556V9.04762C7.55556 8.52143 7.97819 8.09524 8.5 8.09524ZM12.2778 8.09524C12.7996 8.09524 13.2222 8.52143 13.2222 9.04762V18.0952H11.3333V9.04762C11.3333 8.52143 11.756 8.09524 12.2778 8.09524Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default Notes
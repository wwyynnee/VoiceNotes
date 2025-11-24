import { NavLink, useNavigate } from 'react-router'
import styles from './List.module.scss'

function Notes() {
    const navigate = useNavigate()

    function linkNote(e) {
        if (e.target.closest('button')) {
            e.preventDefault();
        }
    }
    function linkButtonEdit() {
        navigate('/edit')
    }

    return (
        <div className={styles.notes}>
            <NavLink to='/note' className={styles.notesItem}
            onClick={linkNote}>
                <div className={styles.notesItemContainer}>
                    <p>Название заметки</p>
                    <span>19.11.2025 14:40</span>
                </div>
                <div className={styles.notesItemContainer}>
                    <button>                  
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.625 0.625C8.025 1.225 8 1.325 8 5.125V9H10H12V4.5V0H10.625C9.475 0 9.125 0.0999994 8.625 0.625Z" fill="white"/>
                            <path d="M4.75 10.65C4.75 10.725 5.925 11.95 7.375 13.325L10 15.875L12.625 13.325C14.075 11.95 15.25 10.725 15.25 10.65C15.25 10.575 12.9 10.5 10 10.5C7.1 10.5 4.75 10.575 4.75 10.65Z" fill="white"/>
                            <path d="M0 15.5V20H10H20V15.5V11H19.375C19.025 11 18.45 11.275 18.125 11.625C17.55 12.2 17.5 12.4 17.5 14.875V17.5H10H2.5V14.875C2.5 12.4 2.45 12.2 1.875 11.625C1.55 11.275 0.975 11 0.625 11H0V15.5Z" fill="white"/>
                        </svg>
                    </button>
                    <button onClick={linkButtonEdit}>                     
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.0697 0C16.3231 4.88037e-08 15.5764 0.283062 15.0006 0.854065L13.9026 1.95692L18.0409 6.0957L19.1436 4.99762C20.2855 3.85073 20.2855 2.00095 19.1436 0.854065C18.5727 0.283062 17.8212 0 17.0697 0ZM12.8676 2.99209L3.48923 12.3725L7.62751 16.5113L17.0058 7.13087L12.8676 2.99209ZM2.45419 13.4067L0 20L6.59247 17.5455L2.45419 13.4067Z" fill="white"/>
                        </svg>
                    </button>
                    <button>
                        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.08333 0C6.30086 0 5.66667 0.639524 5.66667 1.42857V2.38095H1.88889C0.84575 2.38095 0 3.23381 0 4.28571V4.7619H15.1111C16.1542 4.7619 17 3.90905 17 2.85714V2.38095H11.3333V0H7.08333ZM15.5833 6.12816C15.4322 6.17102 15.2764 6.19048 15.1111 6.19048H1.41667V20H13.6944C14.7381 20 15.5833 19.1476 15.5833 18.0952V6.12816ZM4.72222 8.09524C5.24403 8.09524 5.66667 8.52143 5.66667 9.04762V18.0952H3.77778V9.04762C3.77778 8.52143 4.20042 8.09524 4.72222 8.09524ZM8.5 8.09524C9.02181 8.09524 9.44444 8.52143 9.44444 9.04762V18.0952H7.55556V9.04762C7.55556 8.52143 7.97819 8.09524 8.5 8.09524ZM12.2778 8.09524C12.7996 8.09524 13.2222 8.52143 13.2222 9.04762V18.0952H11.3333V9.04762C11.3333 8.52143 11.756 8.09524 12.2778 8.09524Z" fill="white"/>
                        </svg>
                    </button>
                </div>
            </NavLink>
        </div>
    )
}

export default Notes;
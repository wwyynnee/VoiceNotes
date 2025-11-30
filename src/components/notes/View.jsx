import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getNoteById } from '../../utils/db'
import styles from './View.module.scss'
import ViewButtons from './ViewButtons'

function View() {
    const { id } = useParams()
    const [note, setNote] = useState(null)

    useEffect(() => {
        async function loadNote() {
            const data = await getNoteById(Number(id))
            setNote(data)
        }
        loadNote()
    }, [id])

    return (
        <div className={styles.view}>
            <ViewButtons note={note} />
            <div className={styles.viewContainer}>
                <h1>{note?.title}</h1>
            </div>
            <div className={styles.viewContainer} dangerouslySetInnerHTML={{ __html: note?.content }}></div>
        </div>
    )
}

export default View
export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('notes-db', 1)

        request.onupgradeneeded = () => {
            const db = request.result
            if (!db.objectStoreNames.contains('notes')) {
                db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true })
            }
        }

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

// добавление заметки
export async function addNote(note) {
    const db = await openDB()
    
    return new Promise((resolve, reject) => {
        const tx = db.transaction('notes', 'readwrite')
        const store = tx.objectStore('notes')

        const request = store.add(note)

        request.onsuccess = () => {
            const newId = request.result

            // Если заголовок не задан
            if (!note.title || note.title.trim() === '') {
                const updated = { ...note, id: newId, title: `Заметка №${newId}` }

                store.put(updated)
            }

            resolve(newId)
        }

        request.onerror = () => reject(request.error)
    })
}

// получение всех заметок
export async function getNotes() {
    const db = await openDB()
    
    return new Promise((resolve, reject) => {
        const tx = db.transaction('notes', 'readonly')
        const store = tx.objectStore('notes')
        const request = store.getAll()

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

// получение заметок по id
export async function getNoteById(id) {
    const db = await openDB()

    return new Promise((resolve, reject) => {
        const tx = db.transaction('notes', 'readonly')
        const store = tx.objectStore('notes')
        const request = store.get(id)

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

// удаление заметки
export async function deleteNote(id) {
    const db = await openDB()

    return new Promise((resolve, reject) => {
        const tx = db.transaction('notes', 'readwrite')
        const store = tx.objectStore('notes')
        const request = store.delete(id)

        request.onsuccess = () => resolve(true)
        request.onerror = () => reject(request.error)
    })
}

// обновление заметки
export async function updateNote(id, updatedFields) {
    const db = await openDB()

    return new Promise((resolve, reject) => {
        const tx = db.transaction('notes', 'readwrite')
        const store = tx.objectStore('notes')

        // Получаем текущую заметку
        const getReq = store.get(id)

        getReq.onsuccess = () => {
            const existing = getReq.result
            if (!existing) {
                reject(new Error('Заметка не найдена'))
                return
            }

            const updatedNote = {
                ...existing,
                ...updatedFields,
                id,
                updatedAt: Date.now()
            }

            const putReq = store.put(updatedNote)

            putReq.onsuccess = () => resolve(updatedNote)
            putReq.onerror = () => reject(putReq.error)
        }

        getReq.onerror = () => reject(getReq.error)
    })
}

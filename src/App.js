import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { getNotes, deleteNote } from './utils/db';
import NotesContext from './context/NotesContext'

import Nav from './components/UI/Nav'

// Страницы
import Main from './components/pages/Main'
import Note from './components/pages/Note'
import Create from './components/pages/Create'

// Модальные окна
import Sort from './components/modals/Sort'
import Settings from './components/modals/Settings'
import Download from './components/modals/Download'
import Delete from './components/modals/Detete'
import Password from './components/modals/Password'
import Save from './components/modals/Save'

import './App.scss'

function App() {
  const [notes, setNotes] = useState([])

  // загружаем заметки при открытии страницы
  useEffect(() => {
    async function load() {
        const data = await getNotes()
        // сортируем по дате создания
        data.sort((a, b) => b.id - a.id)
        setNotes(data)
    }
    
    load()
  }, [])

  const [sortOpen, setSortOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)

  // модальное окно - ввод пароля заметки
  const toggleSortModal = () => setSortOpen(!sortOpen)
  const closeSortModal = () => setSortOpen(false)

  // модальное окно - настройки
  const toggleSettingsModal = () => setSettingsOpen(!settingsOpen)
  const closeSettingsModal = () => setSettingsOpen(false)

  // модальное окно - скачать заметку
  const toggleDownloadModal = () => setDownloadOpen(!downloadOpen)
  const closeDownloadModal = () => setDownloadOpen(false)

  // модальное окно - удаление заметки
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteNoteId, setDeleteNoteId] = useState(null)
  const [deleteNoteTitle, setDeleteNoteTitle] = useState('')

  function openDeleteModal(note)  {
    setDeleteNoteId(note.id)
    setDeleteNoteTitle(note.title)
    setDeleteOpen(true)
  }
  function closeDeleteModal() {
    setDeleteOpen(false)
  }
  async function handleDelete() {
    if (deleteNoteId !== null) {
      await deleteNote(deleteNoteId)
      setNotes(prev => prev.filter(note => note.id !== deleteNoteId))
      closeDeleteModal()
      setDeleteNoteId(null)
      setDeleteNoteTitle('')
    }
  }

  // модальное окно - ввод пароля заметки
  const togglePasswordModal = () => setPasswordOpen(!passwordOpen)
  const closePasswordModal = () => setPasswordOpen(false)

  // модальное окно - сохранение заметки
  const [saveOpen, setSaveOpen] = useState(false)
  const [saveTitle, setSaveTitle] = useState('')

  function openSaveModal(title) {
    setSaveTitle(title)
    setSaveOpen(true)
  }
  function closeSaveModal() {
    setSaveTitle('')
    setSaveOpen(false)
  }

  const contextValue = {
    onOpenSort: toggleSortModal,
    onCloseSort: closeSortModal,
    onOpenSettings: toggleSettingsModal,
    onCloseSettings: closeSettingsModal,
    onOpenDownload: toggleDownloadModal,
    onCloseDownload: closeDownloadModal,
    onOpenDelete: openDeleteModal,
    onCloseDelete: closeDeleteModal,
    onDelete: handleDelete,
    onOpenPassword: togglePasswordModal,
    onClosePassword: closePasswordModal,
    onOpenSave: openSaveModal,
    onCloseSave: closeSaveModal,
    saveTitle: saveTitle,
    isSortActive: sortOpen,
    isSettingsActive: settingsOpen,
    isDownloadActive: downloadOpen,
    isDeleteActive: deleteOpen,
    noteId: deleteNoteId,
    noteTitle: deleteNoteTitle,
    notes: notes,
  }

  return (
    <NotesContext.Provider value={contextValue}>
      <BrowserRouter>
          <div className="App">
            <Nav />
            
            <Routes>
              <Route index element={<Main />} />
              <Route path="/note/:id" element={<Note />} />
              <Route path="/create" element={<Create />} />
            </Routes>

            {sortOpen && <Sort />}
            {settingsOpen && <Settings />}
            {downloadOpen && <Download />}
            {deleteOpen && <Delete />}
            {passwordOpen && <Password />}
            {saveOpen && <Save />}
          </div>
      </BrowserRouter>
    </NotesContext.Provider>
  )
}

export default App

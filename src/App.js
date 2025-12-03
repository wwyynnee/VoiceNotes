import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { getNotes, getNoteById, addNote, deleteNote } from './utils/db';
import NotesContext from './context/NotesContext'
import strings from './utils/localization'

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
import AddPassword from './components/modals/AddPassword';

import './App.scss'

function App() {
  const [notes, setNotes] = useState([])

  // загружаем заметки при открытии страницы
  useEffect(() => {
    async function load() {
      const data = await getNotes()
      setNotes(data)

      // сортировка по сохраненному tab
      const savedTab = localStorage.getItem('sortTab') || 'createdAt'
      if (savedTab === 'title') data.sort((a,b) => a.title.localeCompare(b.title))
      if (savedTab === 'createdAt') data.sort((a,b) => b.createdAt - a.createdAt)
      if (savedTab === 'updatedAt') data.sort((a,b) => b.updatedAt - a.updatedAt)

      setNotes(data)
    }
    
    load()
  }, [])

  ///////////////////////////////////////////////////////

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "ru"
    strings.setLanguage(savedLang)

    // чтобы все компоненты могли обновиться при первой загрузке
    window.dispatchEvent(new Event('language-change'))
  }, [])

  ///////////////////////////////////////////////////////

  // модальное окно - сортировка
  const [sortOpen, setSortOpen] = useState(false)

  const toggleSortModal = () => setSortOpen(!sortOpen)
  const closeSortModal = () => setSortOpen(false)

  function sortNotes(tab) {
    setNotes(prevNotes => {
      const sorted = [...prevNotes]
  
      if (tab === 'title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title))
      } else if (tab === 'createdAt') {
        sorted.sort((a, b) => b.createdAt - a.createdAt)
      } else if (tab === 'updatedAt') {
        sorted.sort((a, b) => b.updatedAt - a.updatedAt)
      }
  
      return sorted
    })
  }

  // Поиск по заметкам
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // модальное окно - настройки
  const [settingsOpen, setSettingsOpen] = useState(false)

  const toggleSettingsModal = () => setSettingsOpen(!settingsOpen)
  const closeSettingsModal = () => setSettingsOpen(false)

  // модальное окно - скачать заметку
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [downloadNoteId, setDownloadNoteId] = useState(null)
  const [downloadNoteTitle, setDownloadNoteTitle] = useState('')

  function openDownloadModal(note) {
    setDownloadOpen(true)
    setDownloadNoteId(note.id)
    setDownloadNoteTitle(note.title)
  }

  const closeDownloadModal = () => setDownloadOpen(false)

  // модальное окно - удаление заметки
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteNoteId, setDeleteNoteId] = useState(null)
  const [deleteNoteTitle, setDeleteNoteTitle] = useState('')

  function openDeleteModal(note) {
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
  const [passwordOpen, setPasswordOpen] = useState(false)

  const togglePasswordModal = () => setPasswordOpen(!passwordOpen)
  const closePasswordModal = () => setPasswordOpen(false)

  // модальное окно - сохранение заметки
  const [saveOpen, setSaveOpen] = useState(false)
  const [saveTitle, setSaveTitle] = useState('')

  function openSaveModal(title) {
    setSaveTitle(title)
    setSaveOpen(true)
  }
  async function closeSaveModal() {
    setSaveTitle('')
    setSaveOpen(false)
  }
  async function handleSave(note) {
    const id = await addNote(note)
    const saved = await getNoteById(id)
  
    setNotes(prev => {
      const newNotes = [...prev, saved]

      const savedTab = localStorage.getItem('sortTab') || 'createdAt'

      if (savedTab === 'title') {
        newNotes.sort((a, b) => a.title.localeCompare(b.title))
      } else if (savedTab === 'createdAt') {
        newNotes.sort((a, b) => b.createdAt - a.createdAt)
      } else if (savedTab === 'updatedAt') {
        newNotes.sort((a, b) => b.updatedAt - a.updatedAt)
      }

      return newNotes
    })
  
    return id
  }

  // модальное окно - установка пароля
  const [addPassword, setAddPassword] = useState(false)

  const toggleAddDownloadModal = () => setAddPassword(!addPassword)
  const closeAddDownloadModal = () => setAddPassword(false)

  ///////////////////////////////////////////////////////

  // убираем прокрутку страницы при открытии модального окна
  useEffect(() => {
    const modals = sortOpen || settingsOpen || downloadOpen || deleteOpen || passwordOpen || saveOpen || addPassword
  
    if (modals) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [sortOpen, settingsOpen, downloadOpen, deleteOpen, passwordOpen, saveOpen, addPassword])

  ///////////////////////////////////////////////////////

  const contextValue = {
    searchQuery,
    setSearchQuery,
    filteredNotes,

    onOpenSort: toggleSortModal,
    onCloseSort: closeSortModal,
    onSortNotes: sortNotes,

    onOpenSettings: toggleSettingsModal,
    onCloseSettings: closeSettingsModal,

    onOpenDownload: openDownloadModal,
    onCloseDownload: closeDownloadModal,

    onOpenDelete: openDeleteModal,
    onCloseDelete: closeDeleteModal,
    onDelete: handleDelete,

    onOpenPassword: togglePasswordModal,
    onClosePassword: closePasswordModal,

    onOpenSave: openSaveModal,
    onCloseSave: closeSaveModal,
    onSave: handleSave,

    onOpenAddPassword: toggleAddDownloadModal,
    onCloseAddPassword: closeAddDownloadModal,
    
    saveTitle: saveTitle,
    isSortActive: sortOpen,
    isSettingsActive: settingsOpen,
    isDownloadActive: downloadOpen,
    isDeleteActive: deleteOpen,
    isPasswordActive: addPassword,
    isSaveActive: saveOpen,
    noteId: deleteNoteId,
    noteTitle: deleteNoteTitle,
    noteIdDownload: downloadNoteId,
    noteTitleDownload: downloadNoteTitle,
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
            {addPassword && <AddPassword />}
          </div>
      </BrowserRouter>
    </NotesContext.Provider>
  )
}

export default App

import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { getNotes, getNoteById, addNote, deleteNote, updateNote } from './utils/db';
import NotesContext from './context/NotesContext'
import strings from './utils/localization'

import Nav from './components/UI/Nav'

// Страницы
import Main from './components/pages/Main'
import Note from './components/pages/Note'
import Create from './components/pages/Create'
import Edit from './components/pages/Edit'

// Модальные окна
import Sort from './components/modals/Sort'
import Settings from './components/modals/Settings'
import Download from './components/modals/Download'
import Delete from './components/modals/Detete'
import Password from './components/modals/Password'
import Save from './components/modals/Save'
import AddPassword from './components/modals/AddPassword'

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

  // Локализация приложения
  const savedLang = localStorage.getItem("lang") || "ru"

  useEffect(() => {
    strings.setLanguage(savedLang)

    // чтобы все компоненты могли обновиться при первой загрузке
    window.dispatchEvent(new Event('language-change'))
  }, [savedLang])

  ///////////////////////////////////////////////////////

  // модальное окно - сортировка
  const [sortOpen, setSortOpen] = useState(false)

  const openSortModal = () => setSortOpen(true)
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

  const openSettingsModal = () => setSettingsOpen(!settingsOpen)
  const closeSettingsModal = () => setSettingsOpen(false)

  // модальное окно - скачать заметку
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [noteToDownload, setNoteToDownload] = useState(null)

  function openDownloadModal(note) {
    setDownloadOpen(true)
    setNoteToDownload(note)
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
  const [activeNote, setActiveNote] = useState(null)
  const [passwordOpen, setPasswordOpen] = useState(false)

  function openPasswordModal(note, callback) {
    setActiveNote({ ...note, onUnlock: callback })
    setPasswordOpen(true)
  }
  
  function closePasswordModal() {
    setActiveNote(null)
    setPasswordOpen(false)
  }

  // модальное окно - установка пароля
  const [password, setPassword] = useState('')
  const [addPassword, setAddPassword] = useState(false)

  const openAddPasswordModal = () => setAddPassword(true)
  const closeAddPasswordModal = () => setAddPassword(false)

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

  function encodeBase64(str) {
    return btoa(unescape(encodeURIComponent(str)))
  }

  async function handleSave(note) {
    const encodedPassword = password 
        ? encodeBase64(password) 
        : undefined

    const noteToSave = {
      ...note,
      password: note.password ?? encodedPassword,
      createdAt: note.createdAt ?? Date.now()
    }

    const id = await addNote(noteToSave)
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

    setPassword('')
    closeAddPasswordModal()
  
    return id
  }

  ///////////////////////////////////////////////////////

  // Обновление заметки
  async function onUpdate(id, data) {
    const updatedNote = await updateNote(id, data)

    setNotes(prev => {
      const newNotes = prev.map(n => n.id === id ? updatedNote : n)

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

    return updatedNote
  }

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

    onOpenSort: openSortModal,
    onCloseSort: closeSortModal,
    onSortNotes: sortNotes,
    isSortActive: sortOpen,

    onOpenSettings: openSettingsModal,
    onCloseSettings: closeSettingsModal,
    savedLang,
    isSettingsActive: settingsOpen,

    onOpenDownload: openDownloadModal,
    onCloseDownload: closeDownloadModal,
    noteToDownload,
    isDownloadActive: downloadOpen,

    onOpenDelete: openDeleteModal,
    onCloseDelete: closeDeleteModal,
    onDelete: handleDelete,
    isDeleteActive: deleteOpen,
    noteId: deleteNoteId,
    noteTitle: deleteNoteTitle,

    activeNote,
    passwordOpen,
    onOpenPassword: openPasswordModal,
    onClosePassword: closePasswordModal,

    onOpenSave: openSaveModal,
    onCloseSave: closeSaveModal,
    onSave: handleSave,
    isSaveActive: saveOpen,

    onOpenAddPassword: openAddPasswordModal,
    onCloseAddPassword: closeAddPasswordModal,
    password,
    setPassword,
    isPasswordActive: addPassword,
    
    saveTitle,
    notes,
    onUpdate,
    getNoteById
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
              <Route path="/edit/:id" element={<Edit />} />
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

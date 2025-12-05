import { useContext, useState, useEffect } from 'react'
import NotesContext from '../../context/NotesContext'
import { LocalizationContext } from '../../context/LocalizationContext'
import { ThemeContext } from '../../context/ThemeContext'
import strings from '../../utils/localization'
import styles from './Modals.module.scss'

function Settings() {
    const { onSave, getNoteById, onCloseSettings, onOpenSave } = useContext(NotesContext)
    const { changeLanguage } = useContext(LocalizationContext)
    const { theme, setTheme } = useContext(ThemeContext)

    const [tabLang, setTabLang] = useState(localStorage.getItem('lang') || 'ru')

    useEffect(() => {
        strings.setLanguage(tabLang)
    }, [tabLang])

    function changeLang(lang) {
        changeLanguage(lang)
        localStorage.setItem("lang", lang)
    }

    function CheckIcon() {
        return (
            <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2986 12.1905L6.55723 15.942L0 9.36693L1.6988 7.49782C2.71676 6.37767 4.45522 6.33128 5.52605 7.40502L10.2986 12.1905ZM30 2.74881L28.3177 0.876381C27.3037 -0.251715 25.5547 -0.296786 24.4839 0.776298L7.95858 17.3465L9.83056 19.2235C10.8631 20.2588 12.5374 20.2588 13.5699 19.2235L30 2.74881Z" fill="#A19EFF"/>
            </svg>
        )
    }

    async function handleFile(e) {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()

        reader.onload = async (event) => {
            try {
                const note = JSON.parse(event.target.result)

                const id = await onSave(note)
                const saved = await getNoteById(id)

                onCloseSettings()
                onOpenSave(saved.title)
            } catch (err) {
                alert(`${strings.settingsImportError}`)
                console.error(err)
            }
        }

        reader.readAsText(file)
    }

    return (
        <div className={styles.modal} onClick={onCloseSettings}>
            <div className={styles.modalBlock} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalBlockContainer}>
                    <p>{strings.settingsTitle}</p>                
                    <svg onClick={onCloseSettings} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5284 7.67245L7.59286 11.5498L0 4.06914L3.74776 0.00685056L11.5284 7.67245ZM16.9379 13.0021L25.9944 4.07941L22.2641 0L0.0048672 21.9302L3.74498 26L13.0024 16.8794L22.2599 26L26 21.9302L16.9379 13.0021Z" fill="#222222"/>
                    </svg>
                </div>
                <div className={`${styles.modalBlockContainer} ${styles.modalBlockDefault}`}>
                    <b>{strings.settingsAppTheme}</b>
                    <button
                        className={theme === 'light' ? styles.modalBlockContainerActive : ''}
                        onClick={() => setTheme('light')}
                    >
                        {strings.settingsLightTheme}
                        {theme === 'light' && <CheckIcon />}
                    </button>
                    <button
                        className={theme === 'dark' ? styles.modalBlockContainerActive : ''}
                        onClick={() => setTheme('dark')}
                    >
                        {strings.settingsDarkTheme}
                        {theme === 'dark' && <CheckIcon />}
                    </button>
                </div>
                <div className={`${styles.modalBlockContainer} ${styles.modalBlockDefault}`}>
                    <b>{strings.settingsAppLanguage}</b>
                    <button
                        className={tabLang === 'ru' ? styles.modalBlockContainerActive : ''}
                        onClick={() => {
                            setTabLang('ru')
                            changeLang('ru')
                        }}
                    >
                        Русский
                        {tabLang === 'ru' && <CheckIcon />}
                    </button>
                    <button
                        className={tabLang === 'en' ? styles.modalBlockContainerActive : ''}
                        onClick={() => {
                            setTabLang('en')
                            changeLang('en')
                        }}
                    >
                        English
                        {tabLang === 'en' && <CheckIcon />}
                    </button>
                </div>
                <div className={`${styles.modalBlockContainer} ${styles.modalBlockDefault}`}>
                    <b>{strings.settingsImport}</b>
                    <label className={styles.modalBlockLabel}>
                        JSON
                        <input type="file" accept=".json" onChange={handleFile} style={{ display: 'none' }} />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Settings
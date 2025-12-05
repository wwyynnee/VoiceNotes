import { createContext, useState } from 'react'
import strings from '../utils/localization'

export const LocalizationContext = createContext()

export function LocalizationProvider({ children }) {
    const [language, setLanguage] = useState(strings.getLanguage())

    function changeLanguage(lang) {
        strings.setLanguage(lang)
        setLanguage(lang)
    }

    return (
        <LocalizationContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LocalizationContext.Provider>
    )
}

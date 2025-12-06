import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

    // загружаем тему из localStorage или светлую
    const [theme, setTheme] = useState(
        localStorage.getItem("appTheme") || "light"
    )

    // когда тема меняется — обновляем HTML и localStorage
    useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]')
        if (meta) {
            meta.setAttribute(
                "content",
                theme === "dark" ? "#111111" : "#D9D8FF"
            )
        }
            
        document.documentElement.setAttribute("data-theme", theme)
        localStorage.setItem("appTheme", theme)
    }, [theme])

    const value = {
        theme,
        setTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
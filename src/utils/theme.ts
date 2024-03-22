export const applyThemePreference = (darkMode: boolean) => {
  const root = window.document.documentElement
  root.classList.remove(darkMode ? 'light' : 'dark')
  root.classList.add(darkMode ? 'dark' : 'light')
}


export const getStorageValue = (key: string) => {
  // getting stored value
  const saved = localStorage.getItem(key) || null;
  return saved ? JSON.parse(saved) : null;
}

export const setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, value)
};
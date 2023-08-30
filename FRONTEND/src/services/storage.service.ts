class StorageService {
  set theme(theme: 'light' | 'dark') {
    localStorage.setItem('theme', theme)
  }

  get theme(): 'light' | 'dark' {
    return (localStorage.getItem('theme') as any) ?? 'light'
  }
}

export const storageService = new StorageService()

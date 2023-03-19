export interface IArticle {
  id: string
  date: Date
  title: string
  content: string
  comments?: string[]
}

class LocalCache {
  setCache(key: string, value: IArticle) {
    const keyValue = window.localStorage.getItem(key)
    if (keyValue) {
      const result = JSON.parse(keyValue)
      result.push(value)
      window.localStorage.setItem(key, JSON.stringify(result))
    } else {
      const articles: IArticle[] = []
      articles.push(value)
      window.localStorage.setItem(key, JSON.stringify(articles))
    }
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
}

export default new LocalCache()

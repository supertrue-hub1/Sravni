// Хук для получения данных МФО с синхронизацией localStorage и сервера
'use client'

import { useState, useEffect } from 'react'
import { MFO } from '@/data/mfo'

const STORAGE_KEY = 'sravnipay_mfo_data'

export function useMfoDataSync() {
  const [mfoData, setMfoData] = useState<MFO[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      // 1. Пробуем загрузить из localStorage
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            if (parsed.length > 0) {
              setMfoData(parsed)
              setIsLoaded(true)
              return
            }
          } catch (e) {
            console.error('Error parsing localStorage:', e)
          }
        }
      }

      // 2. Загружаем с сервера/API
      try {
        const response = await fetch('/api/data?type=mfo')
        if (response.ok) {
          const data = await response.json()
          setMfoData(data)
          // Кешируем в localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
          }
        }
      } catch (e) {
        console.error('Error fetching data:', e)
      }

      setIsLoaded(true)
    }

    loadData()
  }, [])

  const saveData = (data: MFO[]) => {
    setMfoData(data)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  }

  const addItem = (item: Omit<MFO, 'id'>) => {
    const newItem = { ...item, id: Date.now() }
    const newData = [...mfoData, newItem]
    saveData(newData)
    return newItem
  }

  const updateItem = (id: number, item: Partial<MFO>) => {
    const newData = mfoData.map(m => m.id === id ? { ...m, ...item } : m)
    saveData(newData)
  }

  const deleteItem = (id: number) => {
    const newData = mfoData.filter(m => m.id !== id)
    saveData(newData)
  }

  return { mfoData, isLoaded, addItem, updateItem, deleteItem, saveData }
}

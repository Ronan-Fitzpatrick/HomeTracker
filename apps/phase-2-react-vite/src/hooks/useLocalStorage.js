import { useEffect, useState } from 'react'

export function readStoredValue({ storage, key, initialValue, validate }) {
  try {
    const savedValue = storage.getItem(key)

    if (savedValue === null) {
      return { value: initialValue, error: null }
    }

    return {
      value: validate(JSON.parse(savedValue)),
      error: null,
    }
  } catch (cause) {
    console.warn(`HomeTracker could not load "${key}".`, cause)
    return {
      value: initialValue,
      error: { operation: 'read', cause },
    }
  }
}

export function writeStoredValue({ storage, key, value, validate }) {
  const validValue = validate(value)
  storage.setItem(key, JSON.stringify(validValue))
}

export function useLocalStorage({ key, initialValue, validate }) {
  const [initialResult] = useState(() =>
    readStoredValue({
      storage: localStorage,
      key,
      initialValue,
      validate,
    }),
  )
  const [value, setValue] = useState(initialResult.value)
  const [writeError, setWriteError] = useState(null)

  useEffect(() => {
    try {
      writeStoredValue({
        storage: localStorage,
        key,
        value,
        validate,
      })
      setWriteError(null)
    } catch (cause) {
      console.warn(`HomeTracker could not save "${key}".`, cause)
      setWriteError({ operation: 'write', cause })
    }
  }, [key, validate, value])

  return {
    value,
    setValue,
    error: writeError ?? initialResult.error,
  }
}

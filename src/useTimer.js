import { useState, useCallback, useEffect } from 'react'

export default function useTimer() {
    const [count, setCount] = useState(0)
    const reset = useCallback(() => setCount(0), [])
    useEffect(() => {
        const intervalId = setInterval(() => setCount((c) => c + 1, 1000))
        return () => {
            clearInterval(intervalId)
        }
    })
    return { count, reset }
}

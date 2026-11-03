import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 杂志风 Toast：2.4s 自动消失，带 role=status / aria-live
 */
export function useMagazineToast(duration = 2400) {
  const [message, setMessage] = useState('')
  const timer = useRef<number | undefined>(undefined)

  const showToast = useCallback(
    (text: string) => {
      setMessage(text)
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setMessage(''), duration)
    },
    [duration]
  )

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current)
    },
    []
  )

  return { toast: message, showToast }
}

export function MagazineToast({ message }: { message: string }) {
  return (
    <div
      className={`mag-toast${message ? ' mag-toast--show' : ''}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  )
}

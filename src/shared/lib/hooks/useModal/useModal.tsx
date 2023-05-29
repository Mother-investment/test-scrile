import { useCallback, useEffect, useRef, useState, } from 'react'
import type { MutableRefObject } from 'react'

type UseModalProps = {
	onClose?: () => void
	isOpen?: boolean
	animationDelay: number
}

export function useModal({ animationDelay, isOpen, onClose }: UseModalProps) {
	const [isClosing, setIsClosing] = useState(false)
	const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

	const close = useCallback(() => {
		if (onClose) {
			setIsClosing(true)
			timerRef.current = setTimeout(() => {
				onClose()
				setIsClosing(false)
			}, animationDelay)
		}
	}, [animationDelay, onClose])

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				close()
			}
		},
		[close]
	)

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown)
		}

		return () => {
			clearTimeout(timerRef.current)
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onKeyDown])

	return {
		isClosing,
		close,
	}
}

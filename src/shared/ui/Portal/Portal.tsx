import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

type PortalProps = {
	children: ReactNode
	element?: HTMLElement
}

export const Portal = (props: PortalProps) => {
	const { children, element = document.body } = props

	return createPortal(children, element)
}

import type { ReactNode } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { useModal } from 'shared/lib/hooks/useModal/useModal'
import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'
import cls from './Modal.module.scss'

type ModalProps = {
	className?: string
	children?: ReactNode
	isOpen?: boolean
	onClose?: () => void
	lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
	const { className, children, isOpen, onClose } = props

	const { close, isClosing } = useModal({
		animationDelay: ANIMATION_DELAY,
		onClose,
		isOpen,
	})


	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	}

	return (
		<Portal element={document.getElementById('app') ?? document.body}>
			<div className={classNames(cls.Modal, mods, [className, 'app_modal'])}>
				<Overlay onClick={close} />
				<div className={cls.content}>{children}</div>
			</div>
		</Portal>
	)
}

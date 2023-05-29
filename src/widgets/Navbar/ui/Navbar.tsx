import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useCallback, useState } from 'react'
import { Button } from 'shared/ui/Button'
import { Form } from 'features/Form'

type NavbarProps = {
	className?: string
}

export const Navbar = (props: NavbarProps) => {
	const { className } = props
	const [isOpenedModal, setIsOpenedModal] = useState(true)

	const onCloseModal = useCallback(() => {
		setIsOpenedModal(false)
	}, [])

	const onShowModal = useCallback(() => {
		setIsOpenedModal(true)
	}, [])

	return (
		<nav className={classNames(cls.Navbar, {}, [className])}>
			<Form isOpen={isOpenedModal} onClose={onCloseModal} />
			<Button onClick={onShowModal}>Open modal</Button>
		</nav>
	)
}

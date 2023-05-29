import { Suspense } from 'react'
import { Modal } from 'shared/ui/Modal'
import { classNames } from 'shared/lib/classNames/classNames'
import { Form } from '../Form/Form'

interface FormModalProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

export const FormModal = ({ className, isOpen, onClose }: FormModalProps) => (
	<Modal className={classNames('', {}, [className])} isOpen={isOpen} onClose={onClose}>
		<Suspense fallback={'TODO'}>
			<Form onClose={onClose} />
		</Suspense>
	</Modal>
)

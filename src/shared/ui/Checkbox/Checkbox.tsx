import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Checkbox.module.scss'
import { memo } from 'react'

type CheckboxProps = {
	className?: string
	checked: boolean
	handleChange: () => void
}

export const Checkbox = memo((props: CheckboxProps) => {
	const { className, checked, handleChange } = props

	return (
		<div className={classNames(cls.Checkbox, {}, [className])}>
			<input
				className={cls.input}
				type="checkbox"
				onChange={handleChange}
				checked={checked}
			/>
			<div className={classNames(cls.slider, { [cls.checked]: checked }, [])} />
		</div>
	)
})

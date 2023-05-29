import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import type { ButtonHTMLAttributes } from 'react'
import { ButtonLoader } from '../Loaders'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string
	clear?: boolean
	disabled?: boolean
	loading?: boolean
}

export const Button = (props: ButtonProps) => {
	const {
		className,
		children,
		clear,
		disabled,
		loading,
		...otherProps
	} = props

	const mods: Mods = {
		[cls.disabled]: disabled,
		[cls.loading]: loading
	}

	if(clear) {
		return (
			<button
				className={classNames(cls.Button, mods, [className, cls.clear])}
				disabled={disabled}
				{...otherProps}
			>
				{children}
			</button>
		)
	}

	return (
		<button
			className={classNames(cls.Button, mods, [className])}
			disabled={disabled}
			{...otherProps}
		>
			{children}
			<ButtonLoader className={cls.buttonLoader}/>
		</button>
	)
}
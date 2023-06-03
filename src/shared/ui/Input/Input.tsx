import { memo } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'
import type { InputHTMLAttributes } from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'placeholder'>

type Type = 'input' | 'textarea'

type InputProps = HTMLInputProps & {
	className?: string
	type?: Type
	value: string
	onChange: (value: string) => void
	onClick?: () => void
	disable?: boolean
	placeholder?: string
	error?: boolean
}

export const Input = memo((props: InputProps) => {
	const { className, type = 'input',value, onChange, onClick, disable, placeholder, error, ...otherProps } = props

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e.target.value)
	}

	const mods: Mods = {
		[cls.readOnly]: disable,
		[cls.error]: error
	}

	return (
		<div className={classNames(cls.Input, mods, [className])}>
			{type === 'input'
				? <input
					className={cls.input}
					value={value}
					onChange={onChangeHandler}
					onClick={onClick}
					readOnly={disable}
					placeholder={''}
					{...otherProps}
				/>
				: <textarea
					className={cls.textarea}
					value={value}
					onChange={onChangeHandler}
					onClick={onClick}
					readOnly={disable}
					placeholder={''}
				/>
			}
			<label className={classNames(cls.placeholder, { [cls.valid]: value }, [])}>{placeholder}</label>
		</div>
	)
})
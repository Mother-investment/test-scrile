import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'
import ArrowIcon from 'shared/assets/icons/arrowIcon.svg'
import { memo, useEffect, useRef, useState } from 'react'
import type { Mods } from 'shared/lib/classNames/classNames'
import type { MutableRefObject } from 'react'

export type Option = {
	value: string
	label: string
	price?: number
	isDisabled?: boolean
}

type SelectProps = {
	className?: string
	disable?: boolean
	options: Option[]
	onSelect: (value: string) => void
	value: string
	placeholder: string
	error?: boolean
	clearError?: (value: string) => void
}

export const Select = memo((props: SelectProps) => {
	const { className, disable, options, onSelect, value, placeholder, error, clearError } = props

	const [openOptions, setOpenOptions] = useState(false)

	const selectRef = useRef() as MutableRefObject<HTMLDivElement>

	const selectValue = (value: string) => {
		onSelect(value)
		setOpenOptions(false)
		clearError?.('')
	}

	useEffect(() => {
		const handler = ({ target }: MouseEvent) => {
			if(selectRef.current && !selectRef.current?.contains(target as Node)) {
				setOpenOptions(false)
			}
		}

		document.addEventListener('mouseup', handler)
		return () => {
			document.removeEventListener('mouseup', handler)
		}
	}, [])

	const mods: Mods = {
		[cls.selectOpened]: openOptions,
		[cls.error]: error
	}

	return (
		<div className={classNames(cls.Select, mods, [className])} ref={selectRef}>
			<div className={cls.control} onClick={() => !disable && setOpenOptions(prev => !prev)}>
				<span className={cls.placeholder}>{value ? options.find(item => item.value === value)?.label : placeholder}</span>
				<div className={cls.arrowContainer}>
					<ArrowIcon className={classNames(cls.arrow, { [cls.arrowActive]: openOptions }, [])}/>
				</div>
			</div>
			{openOptions && <div className={cls.options}>
				{options.map(option => (
					<div
						key={option.value}
						className={classNames(cls.option, { [cls.disableOption]: option.isDisabled }, [])}
						onClick={() => !option.isDisabled && selectValue(option.value)}
					>
						{option.label}
					</div>
				))}
			</div>}
		</div>
	)
})

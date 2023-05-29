import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'
import ArrowIcon from 'shared/assets/icons/arrowIcon.svg'
import { memo, useState } from 'react'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'

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
}

export const Select = memo((props: SelectProps) => {
	const { className, disable, options, onSelect, value, placeholder } = props

	const [openOptions, setOpenOptions] = useState(false)

	const selectValue = (value: string) => {
		onSelect(value)
		setOpenOptions(false)
	}

	return (
		<div className={classNames(cls.Select, { [cls.selectOpened]: openOptions }, [className])}>
			<div className={cls.control} onClick={() => !disable && setOpenOptions(prev => !prev)}>
				<span>{value ? options.find(item => item.value === value)?.label : placeholder}</span>
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

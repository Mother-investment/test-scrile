import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Form.module.scss'
import CloseModalcon from 'shared/assets/icons/closeModalcon.svg'
import { Input } from 'shared/ui/Input'
import { Select } from 'shared/ui/Select'
import { Checkbox } from 'shared/ui/Checkbox'
import { Button } from 'shared/ui/Button'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import type { Option } from 'shared/ui/Select'

const products: Option[] = [
	{
		value: 'product50',
		label: 'Product 50$',
		price: 50
	},
	{
		value: 'product100',
		label: 'Product 100$',
		price: 100
	},
	{
		value: 'product300',
		label: 'Product 300$',
		price: 300
	},
]

type FormProps = {
	className?: string
	onClose: () => void
}

export const Form = (props: FormProps) => {
	const { className, onClose } = props

	const dispatch = useAppDispatch()

	const [firstName, setFirstName] = useState('')
	const [lasttName, setLasttName] = useState('')
	const [email, setEmail] = useState('')
	const [comment, setComment] = useState('')
	const [productType, setProductType] = useState('')
	const [featureOne, setFeatureOne] = useState(false)
	const [featureTwo, setFeatureTwo] = useState(false)
	const [totalPrice, setTotalPrice] = useState(0)

	const toggleFeatureOne = useCallback(() =>{
		setFeatureOne(prev => !prev)
	},[])

	const toggleFeatureTwo = useCallback(() =>{
		setFeatureTwo(prev => !prev)
	},[])

	const calcTotalPrice = useCallback(() => {
		const productPrice = products.find(item => item.value === productType)?.price || 0
		const featuresPrice = 300 - (!featureOne && 100 || 0) - (!featureTwo && 200 || 0)

		setTotalPrice(productPrice + featuresPrice)
	},[featureOne, featureTwo, productType])

	useEffect(()=>{
		calcTotalPrice()
	},[calcTotalPrice, featureOne, featureTwo, productType])

	return (
		<div className={classNames(cls.Form, {}, [className])}>
			<h1 className={cls.title}>Title form</h1>
			<Input
				className={cls.input}
				placeholder="First Name *"
				value={firstName}
				onChange={setFirstName}
			/>
			<Input
				className={cls.input}
				placeholder="Last Name *"
				value={lasttName}
				onChange={setLasttName}
			/>
			<Input
				className={cls.input}
				placeholder="user@gmail.com *"
				value={email}
				onChange={setEmail}
			/>
			<div className={cls.productType}>
				<p className={cls.productType__text}>Product type *</p>
				<Select
					className={cls.productType__select}
					options={products}
					onSelect={setProductType}
					value={productType}
					placeholder='Select product type'
				/>
			</div>
			<div className={cls.additionalFeatures}>
				<div className={cls.feature}>
					<p className={cls.feature__text}>Additional feature for $100</p>
					<Checkbox
						className={cls.feature__checkbox}
						checked={featureOne}
						handleChange={toggleFeatureOne}
					/>
				</div>
				<div className={cls.feature}>
					<p className={cls.feature__text}>Additional feature for $200</p>
					<Checkbox
						className={cls.feature__checkbox}
						checked={featureTwo}
						handleChange={toggleFeatureTwo}
					/>
				</div>
			</div>
			<Input
				type="textarea"
				placeholder="Type your comment"
				value={comment}
				onChange={setComment}
			/>
			<div className={cls.totalPrice}>
				<p className={cls.totalPrice__text}>Total price</p>
				<p className={cls.totalPrice_value}>{`$${totalPrice}`}</p>
			</div>

			<div className={cls.submit}>
				<Button className={cls.submit__btn}>Send form</Button>
			</div>

			<div className={cls.closeModal}>
				<Button className={cls.closeModal__btn} onClick={onClose} clear>
					<CloseModalcon />
				</Button>
			</div>
		</div>
	)
}

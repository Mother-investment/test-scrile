import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Form.module.scss'
import CloseModalcon from 'shared/assets/icons/closeModalcon.svg'
import { Input } from 'shared/ui/Input'
import { Select } from 'shared/ui/Select'
import { Checkbox } from 'shared/ui/Checkbox'
import { Button } from 'shared/ui/Button'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { submitFormData } from '../../model/services/submitFormData/submitFormData'
import {
	validateEmail,
	validateFirstName,
	validateLastName,
	validateProductType
} from '../../model/services/validateFormData/validateFormData'
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
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [productType, setProductType] = useState('')
	const [featureOne, setFeatureOne] = useState(false)
	const [featureTwo, setFeatureTwo] = useState(false)
	const [comment, setComment] = useState('')

	const [errorFirstName, setErrorFirstName] = useState('')
	const [errorLastName, setErrorLastName] = useState('')
	const [errorEmail, setErrorEmail] = useState('')
	const [errorProductType, setErrorProductType] = useState('')

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


	const submitForm = useCallback(() => {
		const firstNameError = validateFirstName(firstName)
		const lastNameError = validateLastName(lastName)
		const emailError = validateEmail(email)
		const productTypeError = validateProductType(productType)

		if(firstNameError || lastNameError || emailError || productTypeError) {
			setErrorFirstName(firstNameError)
			setErrorLastName(lastNameError)
			setErrorEmail(emailError)
			setErrorProductType(productTypeError)
			return
		}

		dispatch(submitFormData({
			firstName,
			lastName,
			email,
			productType,
			featureOne,
			featureTwo,
			comment,
		}))
	},[comment, dispatch, email, featureOne, featureTwo, firstName, lastName, productType])

	return (
		<div className={classNames(cls.Form, {}, [className])}>
			<h1 className={cls.title}>Title form</h1>
			<Input
				className={cls.input}
				placeholder="First Name *"
				value={firstName}
				onChange={setFirstName}
				error={!!errorFirstName}
			/>
			<p className={cls.errorMessage}>{errorFirstName}</p>

			<Input
				className={cls.input}
				placeholder="Last Name *"
				value={lastName}
				onChange={setLastName}
				error={!!errorLastName}
			/>
			<p className={cls.errorMessage}>{errorLastName}</p>

			<Input
				className={cls.input}
				placeholder="user@gmail.com *"
				value={email}
				onChange={setEmail}
				error={!!errorEmail}
			/>
			<p className={cls.errorMessage}>{errorEmail}</p>

			<div className={cls.productType}>
				<p className={cls.productType__text}>Product type *</p>
				<div className={cls.productType__selectBlock}>
					<Select
						className={cls.productType__select}
						options={products}
						onSelect={setProductType}
						value={productType}
						placeholder='Select product type'
						error={!!errorProductType}
					/>
					<p className={cls.errorMessage}>{errorProductType}</p>
				</div>
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
				<Button className={cls.submit__btn} onClick={submitForm}>Send form</Button>
			</div>

			<div className={cls.closeModal}>
				<Button className={cls.closeModal__btn} onClick={onClose} clear>
					<CloseModalcon />
				</Button>
			</div>
		</div>
	)
}

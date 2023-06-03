import {
	validateFirstName,
	validateLastName,
	validateEmail,
	validateProductType,
} from './validateFormData'

const data = {
	firstName: 'First Name',
	lastName: 'Last Name',
	email: 'test@gmail.com',
	productType: 'product50',
}

describe('validateFormData.test', () => {
	test('success all validates', async () => {
		const result = []

		result.push(validateFirstName(data.firstName))
		result.push(validateLastName(data.lastName))
		result.push(validateEmail(data.email))
		result.push(validateProductType(data.productType))

		expect(result).toEqual(['', '', '', ''])
	})

	test('without all', async () => {
		const result = []

		result.push(validateFirstName(''))
		result.push(validateLastName(''))
		result.push(validateEmail(''))
		result.push(validateProductType(''))

		expect(result).toEqual([
			'Please fill in first name.',
			'Please fill in last name.',
			'Please fill in email.',
			'Please select product type.',
		])
	})

	test('incorrect email', async () => {
		const result = validateEmail('test@gmail.')

		expect(result).toEqual('Please enter a valid email address.')
	})
})

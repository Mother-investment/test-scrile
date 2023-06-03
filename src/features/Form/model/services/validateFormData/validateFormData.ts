import { emailRegex } from 'shared/const/regex'


export const validateFirstName = (value: string) => {
	if(value.length === 0) {
		return 'Please fill in first name.'
	}
	return ''
}

export const validateLastName = (value: string) => {
	if(value.length === 0) {
		return 'Please fill in last name.'
	}
	return ''
}

export const validateEmail = (value: string) => {
	if(value.length === 0) {
		return 'Please fill in email.'
	}
	if(!emailRegex.test(value)) {
		return 'Please enter a valid email address.'
	}
	return ''
}

export const validateProductType = (value: string) => {
	if(value.length === 0) {
		return 'Please select product type.'
	}
	return ''
}
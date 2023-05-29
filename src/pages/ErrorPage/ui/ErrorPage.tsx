import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ErrorPage.module.scss'
import { Button } from 'shared/ui/Button/Button'

interface ErrorPageProps {
	className?: string
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
	const reloadPage = () => {
		location.reload()
	}
	//TODO button
	return (
		<div className={classNames(cls.ErrorPage, {}, [className])}>
			<h1>Произошла непредвиденная ошибка</h1>
			<Button onClick={reloadPage}>Обновить страницу</Button>
		</div>
	)
}

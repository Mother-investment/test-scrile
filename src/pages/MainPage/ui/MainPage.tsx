import { classNames } from 'shared/lib/classNames/classNames'
import cls from './MainPage.module.scss'
import { Navbar } from 'widgets/Navbar'


export const MainPage = () => {

	return (
		<main className={classNames(cls.MainPage, {}, [])}>
			<Navbar />
		</main>
	)
}
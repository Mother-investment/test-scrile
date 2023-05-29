import { MainPage } from 'pages/MainPage'
import { Suspense } from 'react'
import { ButtonLoader } from 'shared/ui/Loaders'

const App = () => {

	return (
		<div className='app' id='app'>
			<Suspense fallback={<ButtonLoader/>}>
				<MainPage />
			</Suspense>
		</div>
	)
}
export default App

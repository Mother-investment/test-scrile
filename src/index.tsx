import { createRoot } from 'react-dom/client'
import { StoreProvider } from './app/providers/StoreProvider'
import { ErrorBoundary } from './app/providers/ErrorBoundary'
import App from './app/App'
import '../src/app/styles/index.scss'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Failed to find the root element')

const root = createRoot(rootElement)

root.render(
	<StoreProvider>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</StoreProvider>
)

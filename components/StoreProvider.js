import { Provider } from 'react-redux'

import { configureStore } from '../store'

const store = configureStore()

const StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

export default StoreProvider

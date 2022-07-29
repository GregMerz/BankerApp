import React from 'react'

import Navigator from './Navigator'
import { QuickstartProvider } from './Context'

const App = () => {
  return (
    <QuickstartProvider>
      <Navigator />
    </QuickstartProvider>
  )
}

export default App

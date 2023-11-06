import Navigator from './Navigator'
import { QuickstartProvider } from './Context'
import React from 'react'

const App = () => {
  return (
    <QuickstartProvider>
      <Navigator />
    </QuickstartProvider>
  )
}

export default App

import Navigator from './Navigator'
import { QuickstartProvider } from './Context'
import React from 'react'
import FilePicker from './components/FilePicker'
import Home from './components/Home'

const App = () => {
  return (
    <QuickstartProvider>
      <Navigator />
    </QuickstartProvider>
    // <FilePicker />
  )
}

export default App

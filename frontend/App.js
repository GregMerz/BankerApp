// import React from 'react'

import Navigator from './Navigator'
import { QuickstartProvider } from './Context'

import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import * as ImagePicker from 'react-native-image-picker'

// const App = () => {
//   return (
//     <QuickstartProvider>
//       <Navigator />
//     </QuickstartProvider>
//   )
// }

// export default App

export default class App extends React.Component {
  state = {
    photo: null,
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response.assets[0].uri)

      if (response.assets[0].uri) {
        this.setState({ photo: response })
      }
    })
  }

  render() {
    const { photo } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.assets[0].uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    )
  }
}

import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import * as ImagePicker from 'react-native-image-picker'

const createFormData = (photo, body) => {
  const data = new FormData()

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  })

  Object.keys(body).forEach((key) => {
    data.append(key, body[key])
  })

  return data
}

export default class FilePicker extends React.Component {
  state = {
    photo: null,
  }

  handleChoosePhoto = () => {
    const options = {
      maxWidth: 500,
      maxHeight: 500,
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.assets[0].uri) {
        this.setState({ photo: response.assets[0] })
      }
    })
  }

  handleUploadPhoto = () => {
    fetch('http://localhost:8080/storage/uploadFile', {
      method: 'POST',
      body: createFormData(this.state.photo, { userId: '123' }),
    })
      .then((res) => {
        console.log('This is successful')
      })
      .catch((err) => {
        console.log('There is an err')
      })
  }

  render() {
    const { photo } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <React.Fragment>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
            <Button title="Upload" onPress={this.handleUploadPhoto} />
          </React.Fragment>
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    )
  }
}

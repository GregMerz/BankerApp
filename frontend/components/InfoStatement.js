import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import Statement from './Statement'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createIconSetFromFontello } from 'react-native-vector-icons'

const InfoStatement = ({ route, navigation }) => {
  const { info } = route.params
  var statement = info.statement

  const [name, setName] = useState('')
  const [value, setValue] = useState(null)
  const [isFocus, setIsFocus] = useState(false)

  const data = [
    { label: 'Food', value: 'food' },
    { label: 'Personal', value: 'personal' },
  ]

  const submitInfo = () => {
    if (name === '' || value === null) {
      console.log('Please select all required fields')
    } else {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const payload = new Object()
      payload.id = statement.id
      payload.description = name
      payload.category = value

      fetch('http://localhost:8080/transactions/update', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.log("Failed")
        })

      navigation.goBack()
    }
  }

  return (
    <View>
      <View>
        <Statement statement={statement} />
      </View>
      <View>
        <Text>
          Real name:
          <TextInput onChangeText={setName} value={name} placeholder={'name'} />
        </Text>
        <Text>Category:</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : ''}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value)
            setIsFocus(false)
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      <Button title={'submit'} onPress={submitInfo} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})

export default InfoStatement

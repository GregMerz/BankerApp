import React, { useState } from 'react'
import { PlaidLink } from 'react-plaid-link'
import axios from 'axios'

const Link = () => {
  const [linkToken, setLinkToken] = useState('')

  componentDidMount = async () => {
    var response = await axios.post('/create_link_token')
    setLinkToken({ linkToken: response.data['link_token'] })
  }

  handleOnSuccess = async (public_token, metadata) => {
    // send token to client server
    var data = {
      public_token: public_token,
    }
    var response = await axios.post('/exchange_public_token', data)
    console.log(response)
    //to do set accessToken into sessionStorage then move onto UI calls in other components.
    sessionStorage.setItem('accessToken', response.data['access_token'])
  }

  return (
    <div>
      {linkToken.toString !== 'undefined' ? (
        <PlaidLink
          token={linkToken.toString()}
          env="sandbox"
          onSuccess={this.handleOnSuccess}
          onExit={this.handleOnExit}
        >
          Connect Bank Account
        </PlaidLink>
      ) : null}
    </div>
  )
}

export default Link

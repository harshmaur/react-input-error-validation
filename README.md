# react-input-error-validation


[![Greenkeeper badge](https://badges.greenkeeper.io/harshmaur/react-input-error-validation.svg)](https://greenkeeper.io/)


A basic input validation HOC to provide error validations around the input. You can pass in number of validators and do error handling every input wise. Hack in to refs to get complete Form Validations.


## Usage

Try Running the demo for interative usage

```jsx
import React, { Component } from 'react'
import withValidations from 'react-input-error-validation'

// Create any input field. All props are required
// Class based to support inputRef
class TextField extends Component {
  render() {
    const { inputRef, validations, error, checkValidations, config, ...rest } = this.props
    return (
      <div>
        <input {...rest} />
        {rest.error && <div>{rest.error}</div>}
      </div>
    )
  }
}

// Applying HOC
const ValidatedTextField = withValidations(TextField)





/*
Validations - 
It will take in the value prop from the input field as well and and `config` prop if passed. 
The config prop can be used to do extra checking like in the case of fixDigits. 
*/
const notEmpty = val => {
  if (!val) {
    return 'Field Cannot Be Empty'
  }
  return
}

const onlyNumber = val => {
  const pattern = /^\d+$/
  if (!pattern.test(val)) {
    return 'Please Enter a Valid Number'
  }
  return
}


// You can use config object to check for any custom configurations. 
const fixDigits = (val, config = {}) => {
  if (val.length !== config.digits) {
    return `Content should be ${config.digits} only`
  }
  return
}


// Utility function to check for complete form errors
const checkForErrors = el => {
  let err = false
  let errField = '' // this will contain the "name" of the "FIRST" field with error.

  Object.keys(el).map(key => {
    const elItem = el[key]
    if (elItem && elItem.props.checkValidations() !== '') {
      err = true

      // So that the next error does not replace the first one.
      if (!errField) {
        errField = elItem.props.name
      }
    }
  })

  // Keeping error field is optional and depends on the use case,
  // there may be a case where you want to take the users to the field where the error occoured.
  return { err, errField }
}


// Finally we render it out. 

class App extends Component {
  el = {}
  state = {
    first: '',
    second: '',
    third: ''
  }

  validateAndDoSomething() {
    const { err } = checkForErrors(this.el) // passing el

    if (!err) {
      console.log('There were no errors')
      // Do Something here....
    } else {
      console.log('There were errors')
    }
  }

  render() {
    return (
      <div>
        Must be filled :
        <ValidatedTextField
          inputRef={el => this.el['first'] = el}
          value={this.state.first}
          onChange={first => this.setState({ first })}
          validations={[notEmpty]} // Pass array of functions in the validations prop
        />
        <br />
        Should be a number and filled:
        <ValidatedTextField
          inputRef={el => this.el['second'] = el}
          value={this.state.second}
          onChange={second => this.setState({ second })}
          validations={[notEmpty, onlyNumber]}
        />
        <br />
        Number, 7 digits and filled:
        <ValidatedTextField
          inputRef={el => this.el['third'] = el}
          value={this.state.third}
          onChange={third => this.setState({ third })}
          config={{ digits: 7 }} // this is how we pass in config. 
          validations={[notEmpty, onlyNumber, fixDigits]} // you can pass as many validators in squence
        />
        <br />
        <input
          type="button"
          value="submit"
          onClick={() => this.validateAndDoSomething()}
        />
      </div>
    )
  }
}

export default App


```

import React, { Component } from 'react'
import { render } from 'react-dom'
import withValidations from '../../src'

// Text Field Component and passing all the
// props to input field with custom error validation
class TextField extends Component {
  render() {
    const { inputRef, validations, error, checkValidations, config, ...rest } = this.props
    return (
      <div>
        <input {...rest} />
        {error && <div>{error}</div>}
      </div>
    )
  }
}
// Applying HOC
const ValidatedTextField = withValidations(TextField)

// Validations
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

const fixDigits = (val, config = {}) => {
  if (val.length !== config.digits) {
    return `Content should be ${config.digits} only`
  }
  return
}

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

class App extends Component {
  el = {}
  state = {
    first: '',
    second: '',
    third: ''
  }

  validateAndDoSomething() {
    const { err } = checkForErrors(this.el)

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
          onChange={e => this.setState({ first: e.target.value })}
          validations={[notEmpty]}
        />
        <br />
        Should be a number and filled:
        <ValidatedTextField
          inputRef={el => this.el['second'] = el}
          value={this.state.second}
          onChange={e => this.setState({ second: e.target.value })}
          validations={[notEmpty, onlyNumber]}
        />
        <br />
        Number, 7 digits and filled:
        <ValidatedTextField
          inputRef={el => this.el['third'] = el}
          value={this.state.third}
          onChange={e => this.setState({ third: e.target.value })}
          config={{ digits: 7 }}
          validations={[notEmpty, onlyNumber, fixDigits]}
        />
        <br />
        <input type="button" value="submit" onClick={() => this.validateAndDoSomething()} />
      </div>
    )
  }
}

render(<App />, document.querySelector('#demo'))

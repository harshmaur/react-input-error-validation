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
        {rest.error && <div>{rest.error}</div>}
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

class App extends Component {
  el = {}
  state = {
    first: '',
    second: '',
    third: ''
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
        <input
          type="button"
          value="submit"
          onClick={() => Object.keys(this.el).map(newel => this.el[newel].props.checkValidations())}
        />
      </div>
    )
  }
}

render(<App />, document.querySelector('#demo'))

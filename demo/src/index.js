import React, { Component } from 'react'
import { render } from 'react-dom'
import withValidations from '../../src'

// Text Field Component
const TextField = ({ onBlur, error, value, onChange }) => (
  <div>
    <input
      type="text"
      onBlur={onBlur}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    {error && <div>{error}</div>}
  </div>
)
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
          value={this.state.first}
          onChange={first => this.setState({ first })}
          validations={[notEmpty]}
        />
        <br />
        Should be a number and filled:
        <ValidatedTextField
          value={this.state.second}
          onChange={second => this.setState({ second })}
          validations={[notEmpty, onlyNumber]}
        />
        <br />
        Number, 7 digits and filled:
        <ValidatedTextField
          value={this.state.third}
          onChange={third => this.setState({ third })}
          config={{ digits: 7 }}
          validations={[notEmpty, onlyNumber, fixDigits]}
        />
        <br />
      </div>
    )
  }
}

render(<App />, document.querySelector('#demo'))

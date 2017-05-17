import React, { Component } from 'react'

const withValidations = BaseComponent => class extends Component {
  state = {
    error: ''
  }
  checkValidations() {
    for (let i = 0; i < this.props.validations.length; i++) {
      const value = this.props.validations[i](this.props.value, this.props.config)
      if (value) {
        this.setState({
          error: value
        })
        break
      }
      this.setState({ error: '' })
    }
  }

  render() {
    return (
      <BaseComponent
        {...this.props}
        {...this.state}
        onBlur={() => {
          this.checkValidations()
          this.props.onBlur() // run any supplied function by user
        }}
      />
    )
  }
}

export default withValidations

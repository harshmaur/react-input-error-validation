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
      this.props.onBlur && this.props.onBlur() // run any supplied function when every check passes
    }
  }

  render() {
    return (
      <BaseComponent
        ref={this.props.inputRef}
        {...this.props}
        {...this.state}
        checkValidations={() => this.checkValidations()}
        onBlur={() => this.checkValidations()}
      />
    )
  }
}

export default withValidations

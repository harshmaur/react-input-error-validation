import React, { Component } from 'react'

const withValidations = BaseComponent => class extends Component {
  state = {
    error: ''
  }
  checkValidations() {
    // To provide debugging
    if (!this.props.validations) {
      console.error(
        `You must supply 'validations' prop to the component ${BaseComponent.displayName || BaseComponent.name}`
      )
      return
    }

    if (!this.props.value) {
      console.error(`You must supply 'value' prop to the component ${BaseComponent.displayName || BaseComponent.name}`)
      return
    }

    for (let i = 0; i < this.props.validations.length; i++) {
      const value = this.props.validations[i](this.props.value, this.props.config)
      if (value) {
        this.setState({
          error: value
        })
        return value
      }
    }
    this.setState({ error: '' })
    this.props.onBlur && this.props.onBlur() // run any supplied function when every check passes
    return ''
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

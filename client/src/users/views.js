// Users views
var React = require('react')
  , InputPassword = require('react-ux-password-field')
  , serialize = require('form-serialize')
  , validator = require('validator')
  , $ = require('jquery')
  , vpod = require('validation-pod')
  , inherits = require('util').inherits


var Input = React.createClass({
  
  render: function() {
    var inputRendered
    if (this.props.type === 'passwordUI') 
      inputRendered = <InputPassword name={this.props.name} minScore={2} minLength={7} />
    else
      inputRendered = <input type={this.props.type} name={this.props.name} />

    return (
      <div className="inputContainer">
        <label>{this.props.label}</label>
        {inputRendered}
        <span className="inputError">{this.props.error}</span>
      </div>
    )
  }
})


var UserRegister = exports.UserRegister = React.createClass({

  validator: new vpod.Validator({
    email: function(val) { if (!validator.isEmail(val)) return 'Invalid email' },
    password: function(val) {},
    confirmPassword: function(val) { 
      if (this.password !== val) return 'Passwords do not match'
    }
  }),

  getInitialState: function() {
    return { errors: {} }
  },

  hasErrors: function() { return !!Object.keys(this.state.errors).length },

  validate: function(formData, done) {
    var self = this
    this.validator.run(formData, function(err, validationErrors) {
      self.setState({ errors: validationErrors })
      done(err, !Object.keys(validationErrors).length)
    })
  },

  submitData: function(formData) {
    $.ajax({
      url: '/api/users',
      method: 'POST',
      data: formData,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('success', data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },

  onSubmit: function(event) {
    event.preventDefault()
    var formData = serialize(event.target, { hash: true, empty: true })
      , self = this
    this.validate(formData, function(err, isValid) {
      if (err) throw err
      if (isValid) self.submitData(formData)
    })
  },

  render: function() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <Input error={this.state.errors['.email']} name="email" type="text" label="Email" />
          <Input error={this.state.errors['.password']} name="password" type="passwordUI" label="Password" />
          <Input error={this.state.errors['.confirmPassword']} name="confirmPassword" type="password" label="Confirm password" />
        </fieldset>
        <input type="submit" value="Sign-up" />
      </form>
    )
  }
})
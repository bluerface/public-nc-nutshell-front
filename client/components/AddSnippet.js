import React from 'react';

class AddSnippet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange (e) {
    this.setState({
      text: e.target.value
    })
  }
  handleSubmit (e) {
    e.preventDefault();
    var resource = {
      type: 'snippet',
      text: this.state.text
    }
    this.props.addEventResource(resource);
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            value={this.state.text}
            placeholder='Type your snippet here'
            rows='5'
            style={{width: '100%'}}
            onChange={this.handleChange}/><br />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

AddSnippet.propTypes = {
  addEventResource: React.PropTypes.func.isRequired
}

export default AddSnippet;

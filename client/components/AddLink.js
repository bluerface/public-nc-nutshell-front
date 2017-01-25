import React from 'react';

class AddLink extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      url: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange (e) {
    this.setState({
      url: e.target.value
    })
  }
  handleSubmit (e) {
    e.preventDefault();
    var url = this.state.url.trim();
    if (!/^https?:\/\//.test(url)) {
      url = 'http://' + url;
    }
    var resource = {
      type: 'link',
      url
    }
    this.props.addEventResource(resource);
  }
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name='url' value={this.state.url} placeholder='Add' onChange={this.handleChange}/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

AddLink.propTypes = {
  addEventResource: React.PropTypes.func.isRequired
}

export default AddLink;

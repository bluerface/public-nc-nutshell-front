import React from 'react';
import axios from 'axios';
import request from 'superagent';
import getUuid from 'uuid/v4';
import Dropzone from 'react-dropzone';
import config from '../../config.js';
import secret from '../../secret.config.js';

class AddFile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      policy: '',
      signature: ''
    }
    this.dropHandler = this.dropHandler.bind(this);
  }
  componentWillMount () {
    axios
      .get(`${config.SERVER}/api/s3policy`)
      .then(res => {
        this.setState({
          policy: res.data.policy,
          signature: res.data.signature
        })
      })
      .catch(err => {
        console.log(err) // eslint-disable-line
      })
  }
  render () {
    return (
      <div>
        <Dropzone
          multiple={false}
          onDrop={this.dropHandler}>
          <div className='drop'> This is the dropzone </div>
        </ Dropzone>
      </div>
    );
  }
  dropHandler (files) {
    if(files[0]) {
      var filename = files[0].name
      var uuid = getUuid();
      var resource = {
        type: 'file',
        filename: filename,
        url: `https://${secret.BUCKET}.s3.amazonaws.com/uploads/${uuid}/${filename}`
      }
      this.props.addEventResource(resource)

      request
      .post(`https://${secret.BUCKET}.s3.amazonaws.com/`)
      .field('key', `uploads/${uuid}/${filename}`)
      .field('AWSAccessKeyId', secret.KEY)
      .field('acl', 'public-read')
      .field('success_action_redirect', secret.URL)
      .field('policy', this.state.policy)
      .field('signature', this.state.signature)
      .field('Content-Type', 'text/plain')
      .field('Content-Length', '5000000')
      .field('file', files[0])
      .end();
    }
  }
}

AddFile.propTypes = {
  addEventResource: React.PropTypes.func.isRequired
}

export default AddFile;

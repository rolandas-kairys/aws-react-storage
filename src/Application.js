import React, { Component } from 'react';
import './Application.css';

import { Storage } from 'aws-amplify';


class S3Image extends Component {
  render() {
    const file = this.props.file;
    return (
      <article>
        <img src={file} key={file} alt="" />
      </article >
    );
  }

}

class Application extends Component {
  state = {
    files: []
  };

  async componentDidMount() {

    const keys = await Storage.list('');
    const urls = await Promise.all(keys.map(async file =>
      await Storage.get(file.key)));

    this.setState({ files: urls })
    console.log(this.state.files);
  };

  handleSubmit = event => {
    event.preventDefault();

    const file = this.fileInput.files[0];
    const { name } = file;

    console.log(file, name);
  };

  render() {
    return (
      <div className="Application">
        <form className="NewItem" onSubmit={this.handleSubmit}>
          <input
            type="file"
            ref={input => this.fileInput = input}
          />
          <input className="full-width" type="submit" />
        </form>
        <section className="Application-images">

          {this.state.files.map(file =>
            <S3Image file={file} />
          )}

        </section>
      </div>
    );
  }
}

export default Application;

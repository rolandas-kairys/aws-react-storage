import React, { Component } from 'react';
import './Application.css';

import { Storage } from 'aws-amplify';


class S3Image extends Component {
  state = { src: null };

  async componentDidMount() {
    const { s3key } = this.props;
    const src = await Storage.get(s3key);
    this.setState({ src });
    console.log('src link: ', this.state.src);
  }

  render() {
    const { src } = this.state;
    if (!src) return null;

    return (
      <article>
        <img src={src} alt="" />
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
    // const urls = await Promise.all(keys.map(async file =>
    //   await Storage.get(file.key)));

    this.setState({ files: keys })
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
            <S3Image s3key={file.key} key={file.key} />
          )}

        </section>
      </div>
    );
  }
}

export default Application;

import React from 'react';
import marked from 'marked';
import readme from '../data/markdown.js'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

class Markdown extends React.Component {
  getMarkdownText(markdown) {
    var rawMarkup = marked(markdown, {sanitize: true});
    return { __html: rawMarkup };
  }
  render() {
    return <div dangerouslySetInnerHTML={this.getMarkdownText(readme)} />
  }
}

export default Markdown;

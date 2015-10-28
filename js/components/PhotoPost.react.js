var React = require('react');

var PhotoPost = React.createClass({displayName: "PhotoPost",
  render: function() {
    return (

      React.createElement("div", {className: "post"},
        React.createElement("img", {id: "avatar", src: 'http://localhost:8080/ipfs/' + "QmVr51H66mr7htq691ur7m4gFmpEdRbqLNoxv5omrBPiLD"}),
        React.createElement("div", {className: "content"},
          React.createElement("div", {className: "header"},
            React.createElement("span", null, this.props.author)
          ),
          React.createElement("img", {src: 'http://localhost:8080/ipfs/' + this.props.id}),
          React.createElement("div", {className: "footer"},
            React.createElement("span", null, this.props.caption,
              React.createElement("span", {className: "glyphicon glyphicon-star", ariaHidden: "true"})
            )
          )
        )
      )
    )
  }
})

module.exports = PhotoPost;

var GraphMenu = React.createClass({
  displayName: "GraphMenu",
  render: function() {
    return (


      React.createElement("div", {id: "GraphMenu"},
        React.createElement("div", {className: "btn-group", role: "group", ariaLabel: "..."},
          React.createElement("button", {className: "btn btn-default dropdown-toggle"},
            React.createElement("img", {id: "avatar", src: 'http://localhost:8080/ipfs/' + profile.avatar}),
            profile.username),
          React.createElement("button", {className: "btn btn-default pull-right"}, "+")
        )
      )
        // React.createElement("a", {href: "#"}, "oliver54321",
        //   React.createElement("b", {class: "caret dropdown-toggle"})
        // )
    )
  }

})

var SVGComponent = React.createClass({displayName: "SVGComponent",
    render: function() {
        return React.createElement("svg", React.__spread({},  this.props), this.props.children);
    }
});

var Circle = React.createClass({displayName: "Circle",
    render: function() {
        return React.createElement("circle", React.__spread({},  this.props), this.props.children);
    }
});

var Rectangle = React.createClass({displayName: "Rectangle",
    render: function() {
        return React.createElement("rect", React.__spread({},  this.props), this.props.children);
    }
});

// main.js
var React = require('react')
  , ReactDOM = require('react-dom')
  , $ = require('jquery')

var Group = React.createClass({

  render: function() {
    return (
      <h2 className="groupName">{this.props.name}</h2>
    );
  }

});

var GroupList = React.createClass({
  
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
  },
  
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    var groupNodes = this.state.data.map(function(group) {
      return (
        <Group name={group.name} key={group.id} />
      );
    });
    return (
      <div className="groupList">
        {groupNodes}
      </div>
    );
  }
});

ReactDOM.render(
    <GroupList url="/api/groups" />,
  document.getElementById('content')
);
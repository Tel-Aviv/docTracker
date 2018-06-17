import React from 'react';

class Main extends React.Component {

  componentDidMount() {
    console.log(this.props.match.params);
  }

  render() {
    return <div>Main</div>
  }

};

export default Main;

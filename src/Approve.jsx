// @flow
import React from 'react';
import firebase from './firebase.js';

type State = {
  isApproved: boolean
}

type Props = {
  docId: String,
  userId: String
}

class Approve extends React.Component<State, Props> {

  state = {
    isApproved: false
  }

  constructor(props) {
    super(props);

    this.styles = {
      cellStyle: {
        display: "inline-block"
      },
      color6Font:{
          color: '#d43c61'
      }

    }

  }

  componentDidUpdate(prevProps) {

    const self = this;

    if( this.props.docId && this.props.userId ) {

      var database = firebase.database();

      database.ref('approvals/' + this.props.docId + '/' + this.props.userId)
      .once('value')
      .then(function (snapshot) {

        console.log('isApproved: ' + snapshot.val());

        self.setState({
            isApproved: (snapshot.val() != null),
            dataRetrieved: true
        });

      });

      }

  }

  handleClick(event) {

    firebase.database()
    .ref('approvals/' + this.props.docId + '/' + this.props.userId)
    .push({
        when: new Date().getTime()
    });

    this.setState({
        isApproved: true,
        dataRetrieved: true
    });

  }

  render() {

    if (this.state.isApproved) {
        return (
          <div className="col-lg-4 col-md-12" style={this.styles.cellStyle}>
              <div id="btnApprove">
                <section className="box">
                    <i className="icon big rounded color1 fa-check"></i>
                    <h3 style={this.styles.color6Font}>אושר</h3>
                </section>
            </div>
            </div>
            )
    }  else
        return (
          <div className="col-lg-4 col-md-12" style={this.styles.cellStyle}>
            <div id="btnApprove">
              <section className="box" onClick={::this.handleClick}>
                  <i className="icon big rounded color1 fa-check"></i>
                  <h3>3. מאשר קריאה</h3>
              </section>
            </div>
          </div>
            )

  }
};

export  default Approve;

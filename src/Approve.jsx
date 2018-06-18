// @flow
import React from 'react';
import firebase from './firebase.js';

type State = {
  isApproved: boolean,
  docRowId: String,
  dataRetrieved: boolean,
  arrovals: []
}

type Props = {
  docId: String,
  userId: String
}

class Approve extends React.Component<State, Props> {

  state = {
    isApproved: false,
    docRowId: '',
    dataRetrieved: false,
    arrovals: []
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

      if( !this.state.dataRetrieved ) {

        var database = firebase.database();

        database.ref('approvals/' + this.props.docId)
        .once('value')
        .then( snapshot => {

          const approvals = [];

          snapshot.forEach( item => {
            const key = item.key;
            const val = item.val();
            const subKeys = Object.keys(val);
            const when = new Date( val[subKeys[0]].when );
            approvals.push(key);
          })

          self.setState({
            arrovals: approvals
          });

        });

        database.ref('approvals/' + this.props.docId + '/' + this.props.userId)
        .once('value')
        .then( snapshot => {

          console.log('isApproved: ' + snapshot.val());

          self.setState({
              isApproved: (snapshot.val() != null),
              dataRetrieved: true
          });

        });

        database.ref('docs/' + this.props.docId)
        .once('value')
        .then( snapshot => {

          const val = snapshot.val();

          if( val ) {
            self.setState({
              docRowId: val.rowID,
            })
          }

        })
      }



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

    // Add current users to approvals list
    this.state.arrovals.push(this.props.userId);
    const users = this.state.arrovals.join();

    fetch('http://m2039296-w7/DocsTracker/DocsTrackerService.svc/webhttp/'
        + 'approve?users=' + users  + '&docRowId=' + this.state.docRowId,
      {
        credentials: 'include'
      })
    .then(response => {

      console.log(response);

    })


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

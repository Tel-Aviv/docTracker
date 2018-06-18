import React from 'react';
import firebase from './firebase.js';

class ReviewDoc extends React.PureComponent {

  showFile() {

    var database = firebase.database();
    database.ref('docs/' + this.props.docId)
    .once('value')
    .then(function (snapshot) {
      var file = snapshot.val();
      console.log(file);

      window.location = file.url;
    });

  }

  render() {
    return (
      <div className="col-lg-4 col-md-12">
          <section className="box"  onClick={::this.showFile}>
              <i className="icon big rounded color6 fa-file-text-o"></i>
              <h3 dir="rtl">1. צפייה בנוהל</h3>
          </section>
      </div>

    )
  }

};

export default ReviewDoc;

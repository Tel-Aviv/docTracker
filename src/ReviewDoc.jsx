import React from 'react';

class ReviewDoc extends React.Component {

  constructor() {

    super();

    this.styles = {
      cellStyle: {
        display: "inline-block"
      }
    }
  }

  render() {
    return (
      <div className="col-lg-4 col-md-12" style={this.styles.cellStyle}>
          <section className="box">
              <i className="icon big rounded color6 fa-file-text-o"></i>
              <h3 dir="rtl">1. צפייה בנוהל</h3>
          </section>
      </div>

    )
  }

};

export default ReviewDoc;

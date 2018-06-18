import React from 'react';

class Approve extends React.Component {

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
          <div id="btnApprove">
              <section className="box">
                  <i className="icon big rounded color1 fa-check"></i>
                  <h3>3. מאשר קריאה</h3>
              </section>
          </div>
      </div>

    )

  }
};

export  default Approve;

import React from 'react';

class Comments extends React.Component {

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
          <div id="btnAddComment">
              <section className="box">
                  <i className="icon big rounded color9 fa-commenting-o"></i>
                  <h3 dir="rtl">2. הוסף הערות ושאלות</h3>
              </section>
          </div>
      </div>
    )
  }


};

export default Comments;

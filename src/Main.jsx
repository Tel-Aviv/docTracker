// @flow
import React from 'react';
import firebase from './firebase.js';

import ReviewDoc from './ReviewDoc';
import Comments from './Comments';
import Approve from './Approve';

class Main extends React.Component {

  state = {
    docId: undefined,
    userId: undefined
  }

  constructor(props) {
    super(props);

    this.styles = {
      headerStyle: {
        fontSize: "0.7em",
        color: "inherit"
      },
      commentsSectionStyle: {
        display: "none"
      }
    }

  }

  componentDidMount() {
    console.log(this.props.match.params.docid);
    const docId = this.props.match.params.docid;
    const userId = this.props.match.params.uid;

    this.setState({
      docId: docId,
      userId: userId
    })
  }

  render() {

    return (<React.Fragment>
              <header id="header">
                <h1>
                    <a href="https://www.tel-aviv.gov.il/Pages/HomePage.aspx" target="_blank"
                       style={this.styles.headerStyle}>עיריית ת"א</a>
                </h1>
              </header>
              <section id="banner">
                <h2>נוהל חדש</h2>
                <p>נוהל חדש התפרסם לאחרונה בעיריית ת"א-יפו ומובא כאן לעיונך</p>
                <p>תהליך עבודה עם הנוהל מורכב משלושה שלבים</p>
                <p>להלן פירוט השלבים</p>
              </section>

              <section id="one" className="wrapper style1 special">
                <div className="container-fluid">
                  <div>
                      <div className="row-fluid">
                          <ReviewDoc docId={this.state.docId} />
                          <Comments docId={this.state.docId} userId={this.state.userId} />
                          <Approve docId={this.state.docId} userId={this.state.userId} />
                      </div>
                  </div>
                </div>
              </section>

              <section style={this.styles.commentsSectionStyle} id="commentsSection" className="wrapper style2 special">

              </section>

              <footer id="footer">
                  <div className="container">
                      <div className="row">
                          <div className="8u 12u$(medium)">
                              <ul className="copyright">
                                  <li dir="ltr">Images: <a href="http://unsplash.com" target="_blank">Unsplash</a></li>
                                  <li dir="ltr">Design: Empire V.</li>
                                  <li dir="ltr">&copy; 2016-18 Tel-Aviv Municiplity. All rights reserved.</li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </footer>

           </React.Fragment>
         )

  }

};

export default Main;

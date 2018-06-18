import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import firebase from './firebase.js';

const dialogStyle = function () {
    // we use some psuedo random coords so nested modals
    // don't sit right on top of each other.
    let top = 0; // 50 + rand();
    let left = 0; // 50  + rand();

    return {
        position: 'absolute',
        width: 400,
        top: top + '%', left: left + '%',
        transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
};
};

class Comments extends React.Component {

  constructor() {
    super();

    this.styles = {
      cellStyle: {
        display: "inline-block"
      },
      modalStyle: {
          position: 'fixed',
          zIndex: '1040',
          top: '0, bottom: 0, left: 0, right: 0'
      },
      backdropStyle: {
          //...modalStyle,
          zIndex: 'auto',
          backgroundColor: '#000',
          opacity: '0.5'
      }

    }

    this.state = {
        showModal: false,
        comment: ''
    }
  }

  postComment() {

      var currentdate = new Date();
      console.log('Post Comment at: ' + currentdate);

      firebaseApp.database()
      .ref('comments/' + docId)
      .push({
          text: this.state.comment,
          reader: userId,
          when: firebase.database.ServerValue.TIMESTAMP
      });

      this.close();
  }

  getValidationState() {

      const length = this.state.comment.length;

      return ( length > 0 ) ? 'success' : 'error';
  }

  open() {
      console.log('Model open');
      this.setState({ showModal: true });
  }

  close() {
      this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="col-lg-4 col-md-12" style={this.styles.cellStyle}>
          <div id="btnAddComment">
              <section className="box"  onClick={::this.open}>
                  <i className="icon big rounded color9 fa-commenting-o"></i>
                  <h3 dir="rtl">2. הוסף הערות ושאלות</h3>
                  <Modal aria-labelledby='modal-label'
                    style={this.styles.modalStyle}
                    onHide={::this.close}
                    show={this.state.showModal}>
                    <div style={dialogStyle()}>
                      <form>
                        <FormGroup
                                controlId="commentText"
                                validationState={::this.getValidationState()}>
                            <Button onClick={::this.postComment}>שמור</Button>
                        </FormGroup>
                      </form>
                    </div>
                  </Modal>
              </section>
          </div>

      </div>
    )
  }


};

export default Comments;

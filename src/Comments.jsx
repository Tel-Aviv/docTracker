// @flow
import React from 'react';
import firebase from './firebase.js';
import Modal from 'react-modal';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '600px',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

type State = {
  showModal: boolean,
  comment: String
};

type Props = {
  docId: String,
  userId: String
}

class Comments extends React.Component<State, Props> {

  state = {
      showModal: false,
      comment: ''
  }

  postComment() {

      var currentdate = new Date();
      console.log('Post Comment at: ' + currentdate);

      const docId = this.props.docId;
      const userId = this.props.userId;

      firebase.database()
      .ref('comments/' + docId)
      .push({
          text: this.state.comment,
          writer: userId,
          when: currentdate.getTime()
      });

      this.closeModal();
  }

  handleChange(e) {

      e.preventDefault();

      this.setState({
          comment: e.target.value
      });
  }

  getValidationState() {

      const length = this.state.comment.length;

      return ( length > 0 ) ? 'success' : 'error';
  }

  openModal = () => {
      this.setState({ showModal: true });
  }

  closeModal = () => {
      this.setState({ showModal: false }, () => {
        console.log(this.state) ;
      });
  }

  render() {
    return (
      <div className="col-lg-4 col-md-12">
          <div id="btnAddComment">
              <section className="box" onClick={::this.openModal}>
                  <i className="icon big rounded color9 fa-commenting-o"></i>
                  <h3 dir="rtl">2. הוסף הערות ושאלות</h3>
              </section>
              <Modal
                 style={customStyles}
                 onRequestClose={::this.closeModal}
                 isOpen={this.state.showModal}
                 ariaHideApp={false}
                 currentEventIndex = {1}
                 contentLabel="Comments">
                 <FormControl type='text'
                         componentClass="textarea"
                         placeholder="הקלד..."
                         value={this.state.comment}
                         onChange={::this.handleChange}>
                 </FormControl>
                 <br />
                 <Button onClick={::this.postComment}>שמור</Button>

              </Modal>

          </div>

      </div>
    )
  }


};

export default Comments;

// We use Bootstrap Modals to allow new comments
// See https://react-bootstrap.github.io/react-overlays/#modals
//

//import React from 'react';

let rand = () => (Math.floor(Math.random() * 20) - 10);

const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
    //...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
};

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

class ModalComment extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            showModal: false,
            comment: ''
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    render() {

        return <div>
                    <section className="box" onClick={this.open}>
                        <i className="icon big rounded color9 fa-commenting-o"></i>
                        <h3 dir="rtl" id="btnAddComment">2. הוסף הערות ושאלות</h3>
                            <Modal aria-labelledby='modal-label'
                                style={modalStyle}
                                backdropStyle={backdropStyle}
                                show={this.state.showModal}
                                onHide={this.close}>
                                 <div style={dialogStyle()}>
                                    <form>
                                        <FormGroup
                                                controlId="commentText"
                                                validationState={this.getValidationState()}>                                     
                                            <ControlLabel>כתבו את הערותיכם</ControlLabel>
                                            <FormControl type='text'
                                                    componentClass="textarea"
                                                    placeholder="הקלד..."
                                                    value={this.state.comment}
                                                    onChange={this.handleChange}>
                                            </FormControl>
                                            <FormControl.Feedback />
                                            <br />
                                            <Button onClick={this.postComment}>שמור</Button>
                                        </FormGroup>
                                    </form>
                                </div>
                        </Modal>
                </section>
            </div>;
    }

    open() {
        console.log('Model open');
        this.setState({ showModal: true });
    }

    close() {
        this.setState({ showModal: false });
    }

    handleChange(e) {

        e.preventDefault();

        alert('here');

        this.setState({ 
            comment: e.target.value 
        });
    }

    getValidationState() {

        const length = this.state.comment.length;

        return ( length > 0 ) ? 'success' : 'error';
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
}

ReactDOM.render(<ModalComment />,
    document.getElementById('btnAddComment'));

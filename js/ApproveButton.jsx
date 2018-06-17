"use strict"

const color6Font = {
    color: '#d43c61'
};


var ApproveButton = React.createClass({

    mixins: [ReactFireMixin],

    render: function () {

        if (this.isApproved) {
            return (
                <section className="box">
                    <i className="icon big rounded color1 fa-check"></i>
                    <h3 style={color6Font}>אושר</h3>
                </section>
                )
        }  else 
            return (
                    <section className="box" onClick={this.handleClick}>
                    <i className="icon big rounded color1 fa-check"></i>
                    <h3>3. מאשר קריאה</h3>
                </section>        
                )
},

getInitialState: function () {
    //console.log("getInitialState()");
    return {
        dataRetrieved: {}
    };
},

handleClick: function(event) {
    //console.log('handleClick');

    firebaseApp.database()
    .ref('approvals/' + docId + '/' + userId)
    .push({
        when: firebase.database.ServerValue.TIMESTAMP
    });

    this.isApproved = true;

    this.setState({
        dataRetrieved: true
    });

},

componentWillUnmount: function() {
    console.log('Will unmount');
},

componentWillMount: function () {

    var database = firebaseApp.database();
    database.ref('approvals/' + docId + '/' + userId)
    .once('value')
    .then(function (snapshot) {

        console.log('isApproved: ' + snapshot.val());

        this.isApproved = (snapshot.val() != null);

        this.setState({
            dataRetrieved: true
        });

        //if (approved)
        //    $('#btnApprove').prop('disabled', true);

    }.bind(this))
    .catch(function (error) {
        console.error(error);
    })
}
})

ReactDOM.render(
    <ApproveButton></ApproveButton>,
    document.getElementById('btnApprove')
);
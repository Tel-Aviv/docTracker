
class CommentTime extends React.Component {

    render() {
        var _date = new Date(this.props.time);
        return (<i>{_date.toLocaleDateString()} </i>)
    }

}

const rowStyle = {
    padding: '0 2em'
};

var CommentBox = React.createClass({

    render: function () {

        if (typeof this._comments === 'undefined')
            return (<div>No comments yet</div>)
        else 
            return (
                <div dir="rtl">
                    <ul className="list-group">
                        { this._comments.map(function (comment, index) {

                            return <li className="list-group-item" key={index}>
                                        <div className="row" style={rowStyle}>
                                             <img src="images/profile_placeholder.gif" className="img-circle pull-right" alt="profile" />
                                             <div className="pull-right">
                                                 <strong>{comment.reader}</strong>&nbsp;בתאריך&nbsp; 
                                                 <CommentTime time={comment.when} />
                                            </div>
                                            <br />
                                             <div className="pull-right">{comment.text}</div>
                                        </div>
                                    </li>
                        })}
                    </ul>
                </div>
            );
    },

    getInitialState: function () {
        //console.log("getInitialState()");
        return {
                commentsRetrieved: {}
            };
    },

    updateComments: function(snapshot) {
        var comments = [];

        snapshot.forEach(function (comment) {
            comments.push(comment.val());
        });

        this._comments = comments;

        this.setState({
                commentsRetrieved: true
            });
    },

    componentWillMount: function () {

        var database = firebaseApp.database();

        var ref = database.ref('comments/' + docId);

        ref.once('value')
        .then(function (snapshot) {

            this.updateComments(snapshot);

        }.bind(this))
        .catch(function (error) {
            console.error(error);
        });

        ref.on('value', function (snapshot) {

            this.updateComments(snapshot);

        }.bind(this));

        //console.log("componentWillMount()");
    },

    })

ReactDOM.render(
    <CommentBox></CommentBox>,
    document.getElementById('commentsContent')
);
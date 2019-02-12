import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className='ui celled list'>
                    {this.renderList()}
                </div>
                {this.renderCreateBtn()}
            </div>
        );
    }

    renderList() {
        return this.props.streams.map(stream => (
            <div className='item' key={stream.id}>
                {this.renderAdminBtns(stream)}
                <i className='large middle aligned camera icon' />
                <div className='content'>
                    <Link to={`/streams/${stream.id}`}>
                        {stream.title}
                    </Link>
                    <div className='description'>{stream.description}</div>
                </div>
            </div>
        ));
    }

    renderAdminBtns(stream) {
        return (stream.userId === this.props.currentUserId) ? (
            <div className='right floated content'>
                <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>Edit</Link>
                <Link to={`/streams/delete/${stream.id}`} className='ui button negative'>Delete</Link>
            </div>
        ) : null;
    }

    renderCreateBtn() {
        return this.props.isSignedIn ? (
            <div style={{ textAlign: 'right' }}>
                <Link className='ui button primary' to='/streams/new'>Create Stream</Link>
            </div>
        ) : null;
    }
}

const mapStateToProps = (state) => ({
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps, { fetchStreams })(StreamList);
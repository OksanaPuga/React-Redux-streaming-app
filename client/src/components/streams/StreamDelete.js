import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';
import Modal from '../Modal';

class StreamDelete extends React.Component {
    componentDidMount() {
        if (!this.props.stream) {
            this.props.fetchStream(this.props.match.params.id);
        }
    }

    onDismiss() {
        history.push('/');
    }

    render() {
        return (
            <Modal
                header='Delete Stream'
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={this.onDismiss}
            />
        );
    }

    renderContent() {
        return this.props.stream
            ? <span>Are you sure you want to delete stream <b>{this.props.stream.title}</b>?</span>
            : <span>Are you sure you want to delete this stream?</span>
    }

    renderActions() {
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button
                    onClick={this.onDismiss}
                    className='ui button'>
                    Cancel
                </button>
                <button
                    onClick={() => this.props.deleteStream(id)}
                    className='ui primary negative button'>
                    Delete
                </button>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    stream: state.streams[ownProps.match.params.id]
})

export default connect(mapStateToProps,
    { fetchStream, deleteStream }
)(StreamDelete);
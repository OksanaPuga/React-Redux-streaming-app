import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, updateStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        if (!this.props.stream) {
            this.props.fetchStream(this.props.match.params.id);
        }
    }

    onSubmit = (formValues) => {
        this.props.updateStream(this.props.match.params.id, formValues);
    }

    render() {
        return this.props.stream ?(
            <div>
                <h3>Edit the Stream</h3>
                <StreamForm
                    onSubmit={this.onSubmit}
                    initialValues={_.pick(this.props.stream, 'title', 'description')} />
            </div>
        ) : 'Loading...';
    }
}

const mapStateToProps = (state, ownProps) => ({
    stream: state.streams[ownProps.match.params.id]
})

export default connect(mapStateToProps, {
    fetchStream,
    updateStream
})(StreamEdit);
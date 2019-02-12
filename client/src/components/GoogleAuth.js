import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '849939602981-s0g3h11td24rmod6ubilfog9vgriilu4.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        isSignedIn
            ? this.props.signIn(this.auth.currentUser.get().getId())
            : this.props.signOut();
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderLogInButton() {
        return this.props.isSignedIn === null
            ? null
            : this.props.isSignedIn
                ? (<button
                    className='ui red google button' 
                    onClick={this.onSignOutClick}>
                        <i className='google icon'></i>
                        Sign Out
                    </button>)
                : (<button
                    className='ui red google button'
                    onClick={this.onSignInClick}>
                        <i className='google icon'></i>
                        Sign In with Google
                    </button>)
    }

    render() {
        return (<div>{this.renderLogInButton()}</div>);
    }
}

const mapStateToProps = (state) => ({ isSignedIn: state.auth.isSignedIn })

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
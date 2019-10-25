import React, { Component } from "react";
import "./authStyle.css";
import * as actions from "../../redux/actions/loginAction";
import { connect } from 'react-redux';

class MultiFactor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MFA: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.sendMFA({ MFA: this.state.MFA, session: this.props.session, user: this.props.username })
        this.setState(prevState => ({
            ...prevState,
            MFA: ''
        }))
    }




    render() {

        const { error } = this.props;
        let errMsg = null;
        if (error) {
            errMsg = (<p class="auth-mfa-msg">Incorrect code</p>);
        }
        else {
            errMsg = null
        }
        return (
            <div className="modal modalStyle" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header auth-mfa-header">
                            <h5 class="modal-title">Please input authentication code received through SMS</h5>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                        <div class="modal-body auth-mfa-body">
                            {errMsg}
                            <input type="text" id="auth-mfa" name="MFA" placeholder="Authentication Code" onChange={this.handleChange} value={this.state.MFA} /> 
                              
                        </div>
                        
                        <div class="modal-footer auth-mfa-footer">
                        <input type="submit" id="auth-mfa-submit" value="Submit" />  
                            {/* <button type="button" class="btn btn-primary">Submit</button> */}
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    // console.log(state);
    return {
        filename: state.uploadR.fileName,
        statusOk: state.uploadR.s3positive,
        statusErr: state.uploadR.s3negative,
        email: state.loginR.user,
        acToken: state.loginR.acToken,
        idToken: state.loginR.idToken,
        uploadProgress: state.uploadR.uploadProgress,
        fileTypeError: state.uploadR.fileTypeError,
        signedOut: state.uploadR.signOut,
        username: state.loginR.user,
        session: state.loginR.session,
        error: state.loginR.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        sendMFA: (val) => dispatch(actions.sendMFA(val))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MultiFactor);


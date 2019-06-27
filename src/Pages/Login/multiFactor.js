import React, { Component } from "react";
import classes from "./AuthStyle.css";
import * as actions from "../../Redux/actions/loginAction";
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
            errMsg = (<p class={classes["auth-mfa-msg"]}>Incorrect code</p>);
        }
        else {
            errMsg = null
        }
        return (
            <div className={`modal ${classes["modalStyle"]}`} tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class={`modal-header ${classes["auth-mfa-header"]}`}>
                            <h5 class="modal-title">Please input authentication code received through SMS</h5>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                        <div class={`modal-body ${classes["auth-mfa-body"]}`}>
                            {errMsg}
                            <input type="text" id="auth-mfa" name="MFA" placeholder="Authentication Code" onChange={this.handleChange} value={this.state.MFA} /> 
                              
                        </div>
                        
                        <div class={`modal-footer ${classes["auth-mfa-footer"]}`}>
                        <input type="submit" id={classes["auth-mfa-submit"]} value="Submit" />  
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
    console.log(state);
    return {
        // filename: state.afterUpload.fileName,
        // statusOk: state.afterUpload.s3positive,
        // statusErr: state.afterUpload.s3negative,
        email: state.loginR.user,
        acToken: state.loginR.acToken,
        idToken: state.loginR.idToken,
        // uploadProgress: state.afterUpload.uploadProgress,
        // fileTypeError: state.afterUpload.fileTypeError,
        // signedOut: state.afterUpload.signOut,
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


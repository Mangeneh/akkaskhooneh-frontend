import React from 'react';
import CustomTextBox from '../../components/CustomTextBox';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    style: chooseStyle(state),
    loading: state.mode === "LOADING",
    disabled: state.emailVerification
});

const mapDispatchToProps = (dispatch) => ({
    onChangeText: () => dispatch({type: ''})
});

export default connect()(CustomTextBox);
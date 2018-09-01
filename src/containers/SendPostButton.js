import {connect} from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import {chooseStyle} from '../styles/ButtonStyle';
import {PageModes} from '../config';

const mapStateToProps = (state) => ({
    style: chooseStyle(state.AddPostInfoPage.mode),
    loading: state.AddPostInfoPage.mode === PageModes.LOADING,
    disabled: state.AddPostInfoPage.mode === PageModes.DISABLED || state.AddPostInfoPage.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);
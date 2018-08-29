import {connect} from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import {chooseStyle} from '../styles/ButtonStyle';
import {PageModes} from '../config';

const mapStateToProps = (state) => ({
    style: chooseStyle(state.newPostPage.mode),
    loading: state.newPostPage.mode === PageModes.LOADING,
    disabled: state.newPostPage.mode === PageModes.DISABLED || state.newPostPage.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);
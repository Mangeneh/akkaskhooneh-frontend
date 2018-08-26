import {connect} from 'react-redux';
import SpinnerButton from '../components/SpinnerButton';
import {PageModes} from '../config';
import {chooseStyle} from "../styles/ButtonStyle";

const mapStateToProps = (state) => ({
    style: chooseStyle(state.profileEditPage.mode),
    loading: state.profileEditPage.mode === PageModes.LOADING,
});

export default connect(mapStateToProps, null)(SpinnerButton);
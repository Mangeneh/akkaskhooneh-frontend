import React from "react";
import PropTypes from "prop-types";
import {View, TextInput} from "react-native";
import {Input} from "native-base";
import Tag from "./Tag";
import styles from "./styles";

export default class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: props.initialTags,
            text: props.initialText
        };
    }

    onChangeText = text => {
        if (text.length === 0) {
            // `onKeyPress` isn't currently supported on Android; I've placed an extra
            //  space character at the start of `TextInput` which is used to determine if the
            //  user is erasing.
            this.setState(
                {
                    tags: this.state.tags.slice(0, -1),
                    text: this.state.tags.slice(-1)[0] || " "
                },
                () =>
                    this.props.onChangeTags && this.props.onChangeTags(this.state.tags)
            );
        } else if (
            text.length > 1 && text !== '  ' &&
            (text.slice(-1) === " " || text.slice(-1) === ",") &&
            !(this.state.tags.indexOf(text.slice(0, -1).trim()) > -1)
        ) {
            this.setState(
                {
                    tags: [...this.state.tags, text.slice(0, -1).trim()],
                    text: " "
                },
                () =>
                    this.props.onChangeTags && this.props.onChangeTags(this.state.tags)
            );
        } else if (text.slice(1).includes(' ')) {
            return;
        } else {
            this.setState({text});
        }
    };

    render() {
        const {
            containerStyle,
            style,
            tagContainerStyle,
            tagTextStyle,
            deleteOnTagPress,
            onTagPress,
            readonly,
            maxNumberOfTags,
            inputStyle
        } = this.props;

        return (
            <View style={[styles.container, containerStyle, style]}>
                {this.state.tags.map((tag, i) => (
                    <Tag
                        key={i}
                        label={tag}
                        onPress={e => {
                            if (deleteOnTagPress) {
                                this.setState(
                                    {
                                        tags: [
                                            ...this.state.tags.slice(0, i),
                                            ...this.state.tags.slice(i + 1)
                                        ]
                                    },
                                    () => {
                                        this.props.onChangeTags &&
                                        this.props.onChangeTags(this.state.tags);
                                        onTagPress && onTagPress(i, tag, e, true);
                                    }
                                );
                            } else {
                                onTagPress && onTagPress(i, tag, e, false);
                            }
                        }}
                        readonly={readonly}
                        tagContainerStyle={tagContainerStyle}
                        tagTextStyle={tagTextStyle}
                    />
                ))}

                {!readonly &&
                maxNumberOfTags > this.state.tags.length && (
                    <View style={[styles.textInputContainer]}>
                        <Input
                            value={this.state.text}
                            style={[styles.textInput, inputStyle]}
                            onChangeText={this.onChangeText}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                )}
            </View>
        );
    }
}

Tags.defaultProps = {
    initialTags: [],
    initialText: " ",
    readonly: false,
    deleteOnTagPress: true,
    maxNumberOfTags: Number.POSITIVE_INFINITY
};

Tags.propTypes = {
    initialText: PropTypes.string,
    initialTags: PropTypes.arrayOf(PropTypes.string),
    onChangeTags: PropTypes.func,
    containerStyle: PropTypes.object,
    style: PropTypes.object,
    inputStyle: PropTypes.object,
    tagContainerStyle: PropTypes.object,
    tagTextStyle: PropTypes.object,
    readonly: PropTypes.bool,
    maxNumberOfTags: PropTypes.number,
    deleteOnTagPress: PropTypes.bool
};

export {Tag};
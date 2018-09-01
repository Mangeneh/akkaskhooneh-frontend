import {Platform} from "react-native";

export function extractImageSource(image) {
    const imageSource = Platform.OS === 'ios' ? image.sourceURL : image.path;
    return imageSource;
}

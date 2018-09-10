import { Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { Constants, Graphics } from '../config';

export default class NotificationComponent extends Component {
	render() {
		return (
			<View
				style={{
					marginBottom: 8,
					marginRight: 4,
					flexDirection: 'row',
					justifyContent: 'flex-end',
					borderRadius: Constants.POST_CARD_RADIUS,
				}}
			>
				<View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
					<View>{this.renderMessage()}</View>
					<View>{this.renderTime()}</View>
				</View>
				<View style={{ marginLeft: 40 }}>{this.renderCaption()}</View>
				{this.renderPic()}
			</View>
		);
	}

	renderPic() {
		const { notification } = this.props;
		return (
			<Thumbnail
				style={{
					alignSelf: 'center',
					width: Constants.COMMENT_THUMBNAIL_RADIUS * 2,
					height: Constants.COMMENT_THUMBNAIL_RADIUS * 2,
					borderRadius: Constants.COMMENT_THUMBNAIL_RADIUS,
				}}
				source={{ uri: notification.profile_picture }}
			/>
		);
	}

	renderMessage() {
		const { notification } = this.props;
		return (
			<Text
				style={{
					fontSize: Constants.POST_NAME_FONT_SIZE,
					textAlign: 'right',
					paddingRight: 8,
				}}
			>
				`$
				{notification.username}`
			</Text>
		);
	}

	renderTime() {
		return (
			<Text
				note
				style={{
					textAlign: 'right',
					fontSize: Constants.POST_TIME_FONT_SIZE,
					paddingRight: 8,
				}}
			>
				{'unknown'}
			</Text>
		);
	}
}

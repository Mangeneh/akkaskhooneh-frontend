import { Text, Thumbnail, View } from 'native-base';
import React, { Component } from 'react';
import { Constants, Strings } from '../config';
import { strings } from '../i18n';

export default class NotificationComponent extends Component {
	state = {
		text: '',
	}

	render() {
		return (
			<View
				style={{
					marginBottom: 12,
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
					width: Constants.CONTACT_THUMBNAIL_RADIUS * 2,
					height: Constants.CONTACT_THUMBNAIL_RADIUS * 2,
					borderRadius: Constants.CONTACT_THUMBNAIL_RADIUS,
				}}
				source={{ uri: notification.profile_picture }}
			/>
		);
	}

	getMessageType() {
		const { notification } = this.props;
		switch (notification.notif_type) {
			case 1:
			  return (strings(Strings.LIKE_NOTIFICATION))
			case 2:
			  return (strings(Strings.FOLLOW_NOTIFICATION))
			case 3:
			  return(strings(Strings.FOLLOW_REQUEST_NOTIFICATION))
			case 4:
			  return (strings(Strings.COMMENT_NOTIFICATION))
			default:
			  return ('');
		  }
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
				{`${notification.subject_user}${this.getMessageType()}`}
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

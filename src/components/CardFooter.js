import { Button, CardItem, Icon, Left, Right, Text } from 'native-base';
import React, { Component } from 'react';
import { Colors, Graphics } from '../config';

export default class PostFooter extends Component {
	render() {
        const {
            saveButtonPressed, item, onCommentOrPicPressed, onLikePressed,
          } = this.props;
		return (
			<CardItem style={{ borderRadius: Graphics.POST_CARD_RADIUS }}>
				<Left>
					<Button transparent style={{ flexDirection: 'row' }} onPress={onLikePressed}>
						<Icon
							name={this.props.item.is_liked ? 'heart' : 'heart-outlined'}
							type="Entypo"
							style={{ color: this.props.item.is_liked ? 'red' : Colors.BASE }}
						/>
						<Text style={styles.stats}>{this.props.item.likes}</Text>
					</Button>
					<Button transparent style={{ flexDirection: 'row' }} onPress={onCommentOrPicPressed}>
						<Icon name="commenting-o" type="FontAwesome" style={styles.icon} />
						<Text style={styles.stats}>{this.props.item.comments}</Text>
					</Button>
					<Button transparent style={{ flexDirection: 'row' }}>
						<Icon name="share-2" type="Feather" style={styles.icon} />
					</Button>
				</Left>
				<Right>
					<Button transparent style={{ flexDirection: 'row' }} onPress={saveButtonPressed}>
						<Icon name="bookmark-o" type="FontAwesome" style={{ color: Colors.BASE }} />
					</Button>
				</Right>
			</CardItem>
		);
	}
}

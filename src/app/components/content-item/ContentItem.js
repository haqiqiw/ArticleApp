import React from 'react';
import {
  ListItem,
  Thumbnail,
  Body,
  Text
} from 'native-base';

const ContentItem = ({
  onPressItem, 
  thumbnail,
  thumbnailSize,
  thumbnailStyle,
  title,
  titleStyle,
  titleLine,
  subtitle,
  subtitleStyle,
  subtitleLine
}) => {
  return (
    <ListItem button onPress={onPressItem}>
      { thumbnail && <Thumbnail style={thumbnailStyle} square size={thumbnailSize} source={thumbnail} /> }
      <Body>
        <Text style={titleStyle} numberOfLines={titleLine}>{title}</Text>
        <Text style={subtitleStyle} numberOfLines={subtitleLine} note>{subtitle}</Text>
      </Body>
    </ListItem>
  );
}

ContentItem.defaultProps = {
  onPressItem: () => null,
  thumbnailSize: 80
}

export default ContentItem;
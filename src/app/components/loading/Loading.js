import React from 'react';
import {
  Content,
  Spinner
} from 'native-base';

const Loading = ({containerStyle, color}) => {
  return (
    <Content contentContainerStyle={containerStyle}>
      <Spinner color={color} />
    </Content>
  );
}

Loading.defaultProps = {
  color: '#324191'
}

export default Loading;
import React, { Component } from 'react';
import {
  StyleSheet,
  WebView
} from 'react-native';
import {
  Text,
  Content
} from 'native-base';
import { connect } from 'react-redux';
import { Loading } from '../../components';

class DetailArticle extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.headline.main : 'Title',
    }
  };

  renderLoading = () => {
    return ( <Loading containerStyle={styles.center} />);
  };
  
  renderError = () => {
    return (
      <Content contentContainerStyle={styles.center}>
        <Text>Error when load web</Text>
      </Content>
    );
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <WebView
        source={{uri: params.web_url}}
        startInLoadingState
        renderLoading={() => this.renderLoading()}
        renderError={() => this.renderError()}
      />
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  }
});

const mapStateToProps = state => {
  return {
    book: state.book
  }
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailArticle);

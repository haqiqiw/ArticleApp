import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { 
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Segment
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Loading, ContentItem } from '../../components';
import { fetcingDataArticle } from '../../actions/article';
import StringHelper from '../../helpers/StringHelper';
import { BASE_WEB, IMAGE_PLACEHOLDER } from '../../constants/Configs';

class Article extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      isRefreshing: false,
      sort: 'new'
    }
  }

  componentWillMount() {
    const { keyword, sort } = this.state;
    const { fetcingDataArticle } = this.props;
    fetcingDataArticle(keyword, 0, sort);
  }

  // fetch data article when user pull refresh
  handleRefresh = () => {
    const { keyword, sort } = this.state;
    const { fetcingDataArticle } = this.props;
    this.setState({ isRefreshing: true });
    fetcingDataArticle(keyword, 0, sort, () => {
      this.setState({ isRefreshing: false });
    });
  };

  // fetch more data when user has reached the last item
  handleLoadMore = () => {
    const { keyword, sort } = this.state;
    const { article, fetcingDataArticle } = this.props;
    if (!article.isLoading) {
      fetcingDataArticle(keyword, article.page + 1, sort);
    }
  };

  // fetch data when user submitted keyword search
  onSubmitSearch = (keyword) => {
    const { sort } = this.state;
    const { fetcingDataArticle } = this.props;
    if (keyword !== '') {
      fetcingDataArticle(keyword, 0, sort);
    }
  }

  // fetch data when user change sort segment
  onPressSegment = (segment) => {
    const { keyword } = this.state;
    const { fetcingDataArticle } = this.props;
    this.setState({ sort: segment });
    fetcingDataArticle(keyword, 0, segment);
  }

  // fetch data when user clearing keyword search
  onClearSearch = () => {
    const { sort } = this.state;
    const { fetcingDataArticle } = this.props;
    this.setState({ keyword: '' });
    fetcingDataArticle('', 0, sort);
  }

  // go to detail article when user click on item
  onPressItem = (item) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'DetailArticle',
      params: item
    });
    this.props.navigation.dispatch(navigateAction);
  }

  renderItem = (item) => {
    const url = item.multimedia.length > 0 ? `${BASE_WEB}${item.multimedia[0].url}` : IMAGE_PLACEHOLDER;
    return (
      <ContentItem
        onPressItem={() => this.onPressItem(item)}
        thumbnail={{ uri: url }}
        thumbnailStyle={{ backgroundColor: '#222222' }}
        title={item.headline.main}
        titleLine={2}
        subtitle={StringHelper.parseISOString(item.pub_date)}
        subtitleLine={1}
      />
    );
  }

  renderFooter = () => {
    const { article } = this.props;
    if (!article.isLoading) return null;

    return ( <Loading /> );
  };

  render() {
    const { items } = this.props.article;
    const { isRefreshing, keyword, sort } = this.state;
    return (
      <Container>
        <Header searchBar hasTabs>
          <Item>
            <Icon name="ios-search" />
            <Input 
              placeholder="Search"
              onChangeText={(text) => this.setState({ keyword: text })}
              onEndEditing={(event) => this.onSubmitSearch(event.nativeEvent.text)}
              value={keyword}
            />
            { keyword !== '' && (
              <Icon onPress={() => this.onClearSearch()} name="close" />
            )}
          </Item>
          <Button onPress={() => this.onSubmitSearch(keyword)} transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Segment>
          <Button first active={sort === 'new'} onPress={() => this.onPressSegment('new')}>
            <Text active={sort === 'new'}>Newest</Text>
          </Button>
          <Button last active={sort === 'old'} onPress={() => this.onPressSegment('old')}>
            <Text active={sort === 'old'}>Oldest</Text>
          </Button>
        </Segment>
        <FlatList
          renderItem={({item}) => (
            this.renderItem(item)
          )}
          ListFooterComponent={this.renderFooter}
          data={items}
          extraData={this.props.article}
          keyExtractor={i => i._id}
          refreshing={isRefreshing}
          onRefresh={() => this.handleRefresh()}
          onEndReached={() => this.handleLoadMore()}
          onEndReachedThreshold={0.01}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.article
  }
};

const mapDispatchToProps = dispatch => ({
  fetcingDataArticle: (keyword, page, sort, callback) => dispatch(fetcingDataArticle(keyword, page, sort, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { 
  Container,
  Header,
  Item,
  Button,
  Text,
  Segment
} from 'native-base';
import { connect } from 'react-redux';
import { Loading, ContentItem } from '../../components';
import { fetcingDataBook } from '../../actions/book';

class Book extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      list: 'ebook'
    }
  }

  componentWillMount() {
    const { list } = this.state;
    const { fetcingDataBook } = this.props;
    this.setState({ isRefreshing: true });
    fetcingDataBook(list, 0, () => {
      this.setState({ isRefreshing: false });
    });
  }

  // fetch data article when user pull refresh
  handleRefresh = () => {
    const { list } = this.state;
    const { fetcingDataBook } = this.props;
    this.setState({ isRefreshing: true });
    fetcingDataBook(list, 0, () => {
      this.setState({ isRefreshing: false });
    });
  };

  // fetch more data when user has reached the last item
  handleLoadMore = () => {
    const { list } = this.state;
    const { book, fetcingDataBook } = this.props;
    if (!book.isLoading) {
      fetcingDataBook(list, book.offset + 20);
    }
  };

  // fetch data when user change sort segment
  onPressSegment = (segment) => {
    const { fetcingDataBook } = this.props;
    this.setState({ isRefreshing: true, list: segment });
    fetcingDataBook(segment, 0, () => {
      this.setState({ isRefreshing: false });
    });
  }

  renderItem = (item) => {
    return (
      <ContentItem
        title={item.book_details[0].title}
        titleLine={2}
        subtitle={`by ${item.book_details[0].author}`}
        subtitleLine={1}
      />
    );
  }

  renderFooter = () => {
    const { isRefreshing } = this.state;
    const { book } = this.props;
    if (!book.isLoading && isRefreshing) return null;

    return ( <Loading /> );
  };

  render() {
    const { items } = this.props.book;
    const { isRefreshing, list } = this.state;
    return (
      <Container>
        <Header>
          <Item>
            <Segment>
              <Button first active={list === 'ebook'} onPress={() => this.onPressSegment('ebook')}>
                <Text active={list === 'ebook'}>E-Book</Text>
              </Button>
              <Button last active={list === 'hardcover'} onPress={() => this.onPressSegment('hardcover')}>
                <Text active={list === 'hardcover'}>Hardcover</Text>
              </Button>
            </Segment>
          </Item>
        </Header>
        <FlatList
          renderItem={({item}) => (
            this.renderItem(item)
          )}
          ListFooterComponent={this.renderFooter}
          data={items}
          extraData={this.props.book}
          keyExtractor={i => i.book_details[0].primary_isbn13}
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
    book: state.book
  }
};

const mapDispatchToProps = dispatch => ({
  fetcingDataBook: (list, offset, callback) => dispatch(fetcingDataBook(list, offset, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Book);
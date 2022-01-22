import React from 'react';
import PropTypes from 'prop-types';
import {
  ListView,
  Platform,
  TouchableHighlight,
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';


// small helper function which merged two objects into one
function MergeRowsWithHeaders(obj1, obj2) {
  for(var p in obj2){
    if(obj1[p] instanceof Array && obj1[p] instanceof Array){
      obj1[p] = obj1[p].concat(obj2[p])
    } else {
      obj1[p] = obj2[p]
    }
  }
  return obj1;
}

export default class GiftedListView extends React.Component {
  constructor(props) {
    super(props);

    this._page = 1;
    this._rows = [];

    if (this.props.withSections === true) {
      let ds = new ListView.DataSource({
        rowHasChanged: this.props.rowHasChanged?this.props.rowHasChanged:(row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
      });
      this.state = {
        dataSource: ds.cloneWithRowsAndSections([]),
        isRefreshing: false,
        paginationStatus: 'firstLoad',
      };
    } else {
      let ds = new ListView.DataSource({
        rowHasChanged: this.props.rowHasChanged?this.props.rowHasChanged:(row1, row2) => row1 !== row2,
      });
      this.state = {
        dataSource: ds.cloneWithRows([]),
        isRefreshing: false,
        paginationStatus: 'firstLoad',
      };
    }
  }

  static propTypes = {
    customStyles: PropTypes.object,
    initialListSize: PropTypes.number,
    firstLoader: PropTypes.bool,
    forceUpdate: PropTypes.bool,
    pagination: PropTypes.bool,
    refreshable: PropTypes.bool,
    refreshableColors: PropTypes.array,
    refreshableProgressBackgroundColor: PropTypes.string,
    refreshableSize: PropTypes.string,
    refreshableTitle: PropTypes.string,
    refreshableTintColor: PropTypes.string,
    renderRefreshControl: PropTypes.func,
    headerView: PropTypes.func,
    sectionHeaderView: PropTypes.func,
    scrollEnabled: PropTypes.bool,
    withSections: PropTypes.bool,
    onFetch: PropTypes.func,
  
    paginationFetchingView: PropTypes.func,
    paginationAllLoadedView: PropTypes.func,
    paginationWaitingView: PropTypes.func,
    emptyView: PropTypes.func,
    renderSeparator: PropTypes.func,
  
    rowHasChanged:PropTypes.func,
    distinctRows:PropTypes.func,
  
    spinnerSize: PropTypes.string,
    spinnerColor: PropTypes.string,
  }
  
  static defaultProps = {
    customStyles: {},
    initialListSize: 10,
    firstLoader: true,
    forceUpdate: false,
    pagination: true,
    refreshable: true,
    refreshableColors: undefined,
    refreshableProgressBackgroundColor: undefined,
    refreshableSize: undefined,
    refreshableTitle: undefined,
    refreshableTintColor: undefined,
    renderRefreshControl: null,
    headerView: null,
    sectionHeaderView: null,
    scrollEnabled: true,
    withSections: false,
    onFetch(page, callback, options) { callback([]); },
  
    paginationFetchingView: null,
    paginationAllLoadedView: null,
    paginationWaitingView: null,
    emptyView: null,
    renderSeparator: null,
    rowHasChanged:null,
    distinctRows:null,
  
    spinnerSize: 'small',
    spinnerColor: 'gray',
  }

  _setPage = (page) => { this._page = page; }
  _getPage = () => { return this._page; }
  _setRows = (rows) => { this._rows = rows; }
  _getRows = () => { return this._rows; }


  paginationFetchingView = () => {
    if (this.props.paginationFetchingView) {
      return this.props.paginationFetchingView();
    }

    return (
      <View style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
        <ActivityIndicator
            animating={true}
            size={this.props.spinnerSize}
            color={this.props.spinnerColor}
        />
      </View>
    );
  }

  paginationAllLoadedView = () => {
    if (this.props.paginationAllLoadedView) {
      return this.props.paginationAllLoadedView();
    }

    return (
      <View style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}>
        <Text style={[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
          ~
        </Text>
      </View>
    );
  }

  paginationWaitingView(paginateCallback) {
    if (this.props.paginationWaitingView) {
      return this.props.paginationWaitingView(paginateCallback);
    }

    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        onPress={paginateCallback}
        style={[this.defaultStyles.paginationView, this.props.customStyles.paginationView]}
      >
        <Text style={[this.defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
          Load more
        </Text>
      </TouchableHighlight>
    );
  }

  headerView = () => {
    if (this.state.paginationStatus === 'firstLoad' || !this.props.headerView){
      return null;
    }
    return this.props.headerView();
  }

  emptyView(refreshCallback) {
    if (this.props.emptyView) {
      return this.props.emptyView(refreshCallback);
    }

    return (
      <View style={[this.defaultStyles.defaultView, this.props.customStyles.defaultView]}>
        <Text style={[this.defaultStyles.defaultViewTitle, this.props.customStyles.defaultViewTitle]}>
          Sorry, there is no content to display
        </Text>

        <TouchableHighlight
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
        >
          <Text>
            ↻
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderSeparator() {
    if (this.props.renderSeparator) {
      return this.props.renderSeparator();
    }

    return (
      <View style={[this.defaultStyles.separator, this.props.customStyles.separator]} />
    );
  }

  componentDidMount() {
    this._mounted = true;

    this.props.onFetch(this._getPage(), this._postRefresh, {firstLoad: true});
  }

  //state change refresh
  componentWillReceiveProps(){
    this._setPage(1);
    this.props.onFetch(this._getPage(), this._postRefresh, {firstLoad:true});
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forceUpdate){
      this._setPage(1);
      this.props.onFetch(this._getPage(), this._postRefresh, {});
    }
  }

  setNativeProps(props) {
    this.refs.listview.setNativeProps(props);
  }

  _refresh = () => {
    this._onRefresh({external: true});
  }

  _onRefresh = (options = {}) => {
    if (this._mounted) {
      this.setState({
        isRefreshing: true,
      });
      this._setPage(1);
      this.props.onFetch(this._getPage(), this._postRefresh, options);
    }
  }

  _postRefresh = (rows = [], options = {}) => {
    if (this._mounted) {
      this._updateRows(rows, options);
    }
  }

  _onPaginate = () => {
    if(this.state.paginationStatus==='allLoaded'){
      return null
    }else {
      this.setState({
        paginationStatus: 'fetching',
      });
      this.props.onFetch(this._getPage() + 1, this._postPaginate, {});
    }
  }

  _postPaginate = (rows = [], options = {}) => {
    this._setPage(this._getPage() + 1);
    var mergedRows = null;
    if (this.props.withSections === true) {
      mergedRows = MergeRowsWithHeaders(this._getRows(), rows);
    } else {
      mergedRows = this._getRows().concat(rows);
    }

    if(this.props.distinctRows){
      mergedRows = this.props.distinctRows(mergedRows);
    }

    this._updateRows(mergedRows, options);
  }

  _updateRows = (rows = [], options = {}) => {
    if (rows !== null) {
      this._setRows(rows);
      if (this.props.withSections === true) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(rows),
          isRefreshing: false,
          paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
        });
      } else {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rows),
          isRefreshing: false,
          paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
        });
      }
    } else {
      this.setState({
        isRefreshing: false,
        paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
      });
    }
  }

  _renderPaginationView = () => {
    if ((this.state.paginationStatus === 'fetching' && this.props.pagination === true) || (this.state.paginationStatus === 'firstLoad' && this.props.firstLoader === true)) {
      return this.paginationFetchingView();
    } else if (this.state.paginationStatus === 'waiting' && this.props.pagination === true && Object.values(this._getRows()).length > 0) {
      return this.paginationWaitingView(this._onPaginate);
    } else if (this.state.paginationStatus === 'allLoaded' && this.props.pagination === true) {
      return this.paginationAllLoadedView();
    } else if (Object.values(this._getRows()).length === 0) {
      return this.emptyView(this._onRefresh);
    } else {
      return null;
    }
  }

  renderRefreshControl() {
    if (this.props.renderRefreshControl) {
      return this.props.renderRefreshControl({ onRefresh: this._onRefresh });
    }
    return (
      <RefreshControl
        onRefresh={this._onRefresh}
        refreshing={this.state.isRefreshing}
        colors={this.props.refreshableColors}
        progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
        size={this.props.refreshableSize}
        tintColor={this.props.refreshableTintColor}
        title={this.props.refreshableTitle}
      />
    );
  }

  render() {
    return (
      <ListView
        ref="listview"
        dataSource={this.state.dataSource}
        renderRow={this.props.rowView}
        renderSectionHeader={this.props.sectionHeaderView}
        renderHeader={this.headerView}
        renderFooter={this._renderPaginationView}
        renderSeparator={this.renderSeparator}

        automaticallyAdjustContentInsets={false}
        scrollEnabled={this.props.scrollEnabled}
        canCancelContentTouches={true}
        refreshControl={this.props.refreshable === true ? this.renderRefreshControl() : null}

        {...this.props}

        style={this.props.style}
      />
    );
  }

  defaultStyles = {
    separator: {
      height: 1,
      backgroundColor: '#CCC'
    },
    actionsLabel: {
      fontSize: 20,
    },
    paginationView: {
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
    },
    defaultView: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    defaultViewTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 15,
    },
  }
}

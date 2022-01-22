import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  View,
  Alert,
  Modal,
  TouchableHighlight,
  Image
} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropdownMenu from 'react-native-dropdownmenus';
import './globalData'

let conditionData = [["全部戏剧", "脱口秀", "话剧", "喜剧", "音乐剧"], ["全部时间", "今天", "明天", "最近一周", "周末"]];

export default class Discovary extends Component {
  constructor() {
    super();
    //模拟数据源
    global.idneeduse = 0;
    this.state = {
      randomid: moment().get('second') % 7,
      data: global.randomData,
      flatList: global.randomData[0],
      loading: false
    }
  }
  refresh() {
    this.setState({
      loading: true,
      randomid: moment().get('second') % 7
    })
    this.setState({
      flatList: global.randomData[this.state.randomid],
    })
    this.setState({
      loading: false
    })
  }

  setModalVisible = (visible, index_id) => {
    let newArray = [...this.state.flatList];
    for (let i = 0; i < newArray.length; i++) {
      let event_id = newArray[i].event_id;
      if (event_id === index_id) {
        newArray[i].modalVisible = visible;
        console.log(event_id);
      }
    }
    this.setState({ dataSource: newArray });
  }

  setfinish = (finish, index_id) => {
    if (global.userdeid === undefined) {
      Alert.alert("您还没登陆哦");
    }
    else {
      let newArray = [...this.state.dataSource];
      for (let i = 0; i < newArray.length; i++) {
        let id = newArray[i].event_id;
        if (id === index_id) {
          newArray[i].finished = finish;
          console.log(id);
          console.log(global.userdeid);
        }
      }
      this.setState({ dataSource: newArray });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <DropdownMenu
          style={styles.DropdownMenu}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          // arrowImg={}
          // checkImage={}
          optionTextStyle={{ color: '#333333' }}
          titleStyle={{ color: '#333333' }}
          maxHeight={300}
          handler={(selection, row) => {
            console.log(selection, row)
            this.changeMenu(selection, row)
          }}
          data={conditionData}
          selectIndex={[0, 0]}>
        </DropdownMenu>
        <FlatList
          style={styles.FlatList}
          data={this.state.flatList}
          renderItem={({ item }) => this._renderRow(item)}
          keyExtractor={(item, index) => item + index}
          numColumns={1}
          refreshing={this.state.loading}
          onRefresh={this.refresh.bind(this)}
        />
      </SafeAreaView>
    )
  }

  changeMenu(selection, row) {
    this.setState({
      loading: true,
      randomid: moment().get('second') % 7
    })
    if (row === 0) {
      this.setState({
        flatList: global.randomData[this.state.randomid]
      })
      this.setState({
        loading: false
      })
      return
    } else {
      let retData = []
      if (selection === 0) {
        global.randomData.forEach(element => {
          element.forEach(ele => {
            if (ele.event_type === conditionData[selection][row]) {
              retData.push(ele);
            }
          })
        });
        this.setState({
          flatList: retData
        })
      }
    }
    this.setState({
      loading: false
    })
  }

  _renderRow(item) {
    modalVisible = false;
    finished = false;
    let newArray = [...this.state.flatList];
    for (let i = 0; i < newArray.length; i++) {
      let id = newArray[i].event_id;
      if (id === item.event_id) {
        modalVisible = newArray[i].modalVisible;
        finished = newArray[i].finished;
        break
      }
    }

    buttontext = '';
    backColor = '';
    if (finished === false) {
      buttontext = '感兴趣';
      backColor = "#2196F3";
    }

    if (finished === true) {
      buttontext = '已感兴趣';
      backColor = "#080808";
    }


    return (
      <TouchableOpacity style={styles.item}
        onPress={() => {
          this.setModalVisible(true, item.event_id);
        }}
      >
        <Image
          style={styles.photo}
          source={{ uri: item.event_photo }}
        />
        <Text numberOfLines={10} ellipsizeMode={'tail'}
          style={styles.title}>{item.event_name}</Text>
        <AntDesign style={styles.icons}
          name={'arrowright'}
          size={20}
        />
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(false, item.event_id);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={styles.photo}
                  source={{ uri: item.event_photo }}

                />
                <Text style={styles.modalText}>{item.event_name}</Text>
                <Text style={styles.modalText}>组织者：{item.event_owner_name}</Text>
                <Text style={styles.modalText}>开始时间：{item.event_start_time}</Text>
                <Text style={styles.modalText}>结束时间：{item.event_end_time}</Text>
                <Text style={styles.modalText}>活动费用：{item.event_fee}</Text>
                <Text style={styles.modalText}>活动地点：{item.event_location}</Text>
                <Text style={styles.modalText}>活动类型：{item.event_type}</Text>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: backColor }}
                  onPress={() => {
                    this.setfinish(true, item.event_id);
                  }}
                >
                  <Text style={styles.textStyle}>{buttontext}</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    this.setModalVisible(false, item.event_id);
                  }}
                >
                  <Text style={styles.textStyle}>返回</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  icons: {
    top: 50
  },
  DropdownMenu: {
    // flex: 1,
    zIndex: 9,
    elevation: 9
  },
  FlatList: {
    top: 40,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    // marginVertical: 20,
    marginHorizontal: 6,
    flexDirection: 'row',
    zIndex: 1,
    elevation: 1
  },
  title: {
    fontSize: 15,
    marginHorizontal: 6,
    width: 200,
    top: 30,
  },
  button: {
    backgroundColor: "#000000",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  photo: {
    width: 80,
    height: 120,
    zIndex: 1
  }
});
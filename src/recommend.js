import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  View,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
  Image
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';


export default class Recommend extends Component {
  constructor() {
    super();
    //模拟数据源
    this.state = {
      dataSource: [
        [
          {
            event_id: '33181665',
            event_name: '【本周六演出】遇见喜剧12月21日脱口秀商演抢票中！',
            event_owner_name: '泡泡圈同城吃喝玩乐',
            event_start_time: '2021-09-18T19:00:00',
            event_end_time: '2021-12-16T21:30:00',
            event_fee: '80元(周六脱口秀门票)',
            event_location: '北京市东城区北新桥街道北新仓社区 北京市东城区东直门Tribute music pub（致敬酒吧）',
            event_type: '戏剧-话剧',
            event_photo: 'https://img2.doubanio.com/pview/event_poster/large/public/1685b7dd9208492.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '34325845',
            event_name: '开心麻花2018年底大戏《窗前不止明月光》 第15轮',
            event_owner_name: '票牛',
            event_start_time: '2021-07-08T19:30:00',
            event_end_time: '2021-08-15T21:30:00',
            event_fee: '83 - 580元',
            event_location: '世纪剧院 北京朝阳区亮马桥路南侧40号',
            event_type: '戏剧-话剧',
            event_photo: 'https://img1.doubanio.com/pview/event_poster/large/public/902a6cbab6d178b.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '33470873',
            event_name: '解压周末 硬核喜剧脱口秀',
            event_owner_name: '泡泡圈同城吃喝玩乐',
            event_start_time: '2022-03-12T19:00:00',
            event_end_time: '2022-06-10T21:00:00',
            event_fee: '119元(现场票)',
            event_location: '北京市东城区,东四南大街157号4层 北京市东城区',
            event_type: '戏剧-话剧',
            event_photo: 'https://img1.doubanio.com/pview/event_poster/large/public/8eba420312b778a.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '33086081',
            event_name: '#免费演出#【笑坊脱口秀】每周一蘑菇商店开放麦',
            event_owner_name: '泡泡圈同城吃喝玩乐',
            event_start_time: '2021-08-16T19:00:00',
            event_end_time: '2021-11-14T21:30:00',
            event_fee: '免费',
            event_location: '北京市海淀区北下关街道交大东路66号智地钻河公馆 海淀区北下关交大东路66号钻河中心2号楼102号蘑菇商店',
            event_type: '戏剧-其他',
            event_photo: 'https://img2.doubanio.com/pview/event_poster/large/public/9e78cea667fe0a3.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '33616923',
            event_name: '【北京脱口秀演出】#欢笑8月# 遇见喜剧，每周二晚欢乐开放麦！',
            event_owner_name: '泡泡圈同城吃喝玩乐',
            event_start_time: '2021-06-21T19:00:00',
            event_end_time: '2021-09-19T21:00:00',
            event_fee: '9.9元(开放麦门票)',
            event_location: '北京市东城区北新桥街道北新仓社区 北京市东城区东直门吹吧Tribute music pub',
            event_type: '戏剧-话剧',
            event_photo: 'https://img3.doubanio.com/pview/event_poster/large/public/a9a234009255a5d.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '33158626',
            event_name: '解压周末 硬核喜剧脱口秀！',
            event_owner_name: '泡泡圈同城吃喝玩乐',
            event_start_time: '2021-09-15T19:30:00',
            event_end_time: '2021-12-13T23:30:00',
            event_fee: '免费',
            event_location: '北京市东城区,东四南大街157号4层 北京市东城区',
            event_type: '戏剧-话剧',
            event_photo: 'https://img9.doubanio.com/pview/event_poster/large/public/6507cf35a631a25.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '33158644',
            event_name: '#免费演出#【笑坊脱口秀】每周三东直门开放麦',
            event_owner_name: '泡泡圈同城吃喝玩乐',
            event_start_time: '2021-09-15T19:00:00',
            event_end_time: '2021-12-13T21:30:00',
            event_fee: '免费',
            event_location: '北京市东城区北新桥街道北新仓社区 （北京东城）东直门内大街8-3致敬酒吧',
            event_type: '戏剧-话剧',
            event_photo: 'https://img2.doubanio.com/pview/event_poster/large/public/5a777fb9ed89fbe.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '33086072',
            event_name: '狂人即兴周六喜剧秀【那些与爱相关的喜剧故事】',
            event_owner_name: '泡泡圈同城吃喝玩乐',
            event_start_time: '2021-08-16T19:00:00',
            event_end_time: '2021-11-14T21:30:00',
            event_fee: ' 120元(双人票)起',
            event_location: '北京市东城区和平里街道北京远东仪表有限公司北京国土房管局大厦',
            event_type: '戏剧-其他',
            event_photo: 'https://img2.doubanio.com/pview/event_poster/large/public/fc78f9b7c85935e.jpg',
            modalVisible: false,
            finished: false
          }
        ],
        [
          {
            event_id: '32993394',
            event_name: '#免费演出#【遇见喜剧脱口秀】每周二 西直门&开放麦 爆笑相遇！',
            event_owner_name: '泡泡圈同城吃喝玩乐',
            event_start_time: '2021-07-17T19:30:00',
            event_end_time: '2021-10-15T21:30:00',
            event_fee: '免费',
            event_location: '北京市海淀区北下关街道交大东路66号智地钻河公馆',
            event_type: '戏剧-话剧',
            event_photo: 'https://img2.doubanio.com/pview/event_poster/large/public/acd8abbb6caa1ee.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '33127200',
            event_name: '解压周末 硬核喜剧脱口秀',
            event_owner_name: '泡泡圈同城吃喝玩乐',
            event_start_time: '2021-09-03T07:30:00',
            event_end_time: '2021-12-02T17:30:00',
            event_fee: '89元(早鸟票（数量有限）)起',
            event_location: '北京市东城区,东四南大街157号4层 北京市东城区',
            event_type: '戏剧-话剧',
            event_photo: 'https://img2.doubanio.com/pview/event_poster/large/public/ea668177646e7d1.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '34236017',
            event_name: '孟京辉经典戏剧作品《恋爱的犀牛》',
            event_owner_name: '票牛',
            event_start_time: '2021-07-28T19:30:00',
            event_end_time: '2021-08-15T16:30:00',
            event_fee: '419 - 578元',
            event_location: '蜂巢剧场 东直门外大街十字坡西里甲3号3楼(近东二环)',
            event_type: '戏剧-话剧',
            event_photo: 'https://img2.doubanio.com/pview/event_poster/large/public/1efb873b8171942.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '33575145',
            event_name: '开心麻花联调测试剧目 第8轮',
            event_owner_name: '票牛',
            event_start_time: '2021-07-01T19:30:00',
            event_end_time: '2021-08-31T21:30:00',
            event_fee: '1 - 10元',
            event_location: '开心麻花磁剧场 麒麟公社',
            event_type: '戏剧-话剧',
            event_photo: 'https://img9.doubanio.com/pview/event_poster/large/public/8da96e0e6eaaf35.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '33144763',
            event_name: '解压周末 硬核喜剧脱口秀!',
            event_owner_name: '泡泡圈同城吃喝玩乐',
            event_start_time: '2021-09-06T19:00:00',
            event_end_time: '2021-12-04T21:00:00',
            event_fee: '89元(早鸟票（数量有限）)起',
            event_location: '北京市东城区,东四南大街157号4层 北京市东城区',
            event_type: '戏剧-其他',
            event_photo: 'https://img2.doubanio.com/pview/event_poster/large/public/8bab457c5df9cc2.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '34392274',
            event_name: '庆祝中国共产党成立100周年：上海芭蕾舞团《闪闪的红星》',
            event_owner_name: '国家大剧院',
            event_start_time: '2021-07-31T19:30:00',
            event_end_time: '2021-08-01T21:30:00',
            event_fee: ' 100元起',
            event_location: '国家大剧院',
            event_type: '戏剧-舞剧',
            event_photo: 'https://img2.doubanio.com/pview/event_poster/large/public/7d2bd38fdb8cdfe.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '33161270',
            event_name: '脱口秀“首届双蛋节”之《三人行》平安夜专场 |北京喜剧中心系列演出',
            event_owner_name: '泡泡圈同城吃喝玩乐',
            event_start_time: '2021-09-15T19:30:00',
            event_end_time: '2021-12-13T21:30:00',
            event_fee: '580元(至尊贵宾单人票1-3排)起',
            event_location: '北京市东城区东四街道青蓝大厦 东四十条青蓝剧场大厦三楼',
            event_type: '戏剧-话剧',
            event_photo: 'https://img9.doubanio.com/pview/event_poster/large/public/722337c8cea5386.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '33111958',
            event_name: '脱口秀“首届双蛋节”之《见面道辛苦》圣诞夜专场 ！',
            event_owner_name: '泡泡圈同城吃喝玩乐',
            event_start_time: '2021-08-30T19:00:00',
            event_end_time: '2021-11-28T21:30:00',
            event_fee: '580元(至尊贵宾单人票1-3排)起',
            event_location: '北京市东城区东四街道青蓝大厦 东四十条青蓝剧场大厦三楼',
            event_type: '戏剧-话剧',
            event_photo: 'https://img1.doubanio.com/pview/event_poster/large/public/8af4983d5249e58.jpg',
            modalVisible: false,
            finished: false
          }
        ],
        [
          {
            event_id: '33086072',
            event_name: '【剧评征集】写《妄谈与疯话》剧评',
            event_owner_name: '大麦戏剧',
            event_start_time: '2021-08-16T19:00:00',
            event_end_time: '2021-11-14T21:30:00',
            event_fee: ' 线上',
            event_location: '线上',
            event_type: '戏剧-话剧',
            event_photo: 'https://img9.doubanio.com/pview/event_poster/large/public/9e24696eaa895f6.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '16626697',
            event_name: '荒诞喜剧《东莫村的驴得水》',
            event_owner_name: '大麦戏剧',
            event_start_time: '2021-06-20T19:30:00',
            event_end_time: '2021-07-01T22:00:00',
            event_fee: '线上',
            event_location: '线上',
            event_type: '戏剧-其他',
            event_photo: 'https://img1.doubanio.com/pview/event_poster/large/public/892133660676ef8.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '34378272',
            event_name: '话剧：《老式喜剧》',
            event_owner_name: '票牛',
            event_start_time: '2021-07-23T19:30:00',
            event_end_time: '2021-08-09T21:30:00',
            event_fee: ' 120 - 711元',
            event_location: '北京人艺实验剧场 北京市东城区王府井大街22号首都剧场4楼',
            event_type: '戏剧-话剧',
            event_photo: 'https://img1.doubanio.com/pview/event_poster/large/public/1ea3b98d98ddf19.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '34379912',
            event_name: '北京曲艺团“京味儿”相声专场演出',
            event_owner_name: '票牛',
            event_start_time: '2021-07-11T19:30:00',
            event_end_time: '2021-12-12T21:30:00',
            event_fee: '线上',
            event_location: '线上',
            event_type: '戏剧-戏曲',
            event_photo: 'https://img2.doubanio.com/pview/event_poster/large/public/5d041f6912765d1.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '16404351',
            event_name: '中法合作国家话剧院话剧《笑面人》',
            event_owner_name: '大麦戏剧',
            event_start_time: '2021-05-23T19:30:00',
            event_end_time: '2021-12-13T21:30:00',
            event_fee: '线上',
            event_location: '线上',
            event_type: '戏剧-话剧',
            event_photo: 'https://img1.doubanio.com/pview/event_poster/large/public/e886cd102f064ca.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '16152712',
            event_name: '首届中国歌剧节获奖作品-歌剧《小二黑结婚》',
            event_owner_name: '大麦戏剧',
            event_start_time: '2021-08-05T19:30:00',
            event_end_time: '2021-08-05T21:30:00',
            event_fee: '线上',
            event_location: '线上',
            event_type: '戏剧-歌剧',
            event_photo: 'https://img9.doubanio.com/pview/event_poster/large/public/82cf1e4b91759d6.jpg',
            modalVisible: false,
            finished: false
          },
          {
            event_id: '34254459',
            event_name: '大型童话剧《神笔马良》',
            event_owner_name: '票牛',
            event_start_time: '2021-08-07T10:30:00',
            event_end_time: '2021-08-07T11:20:00',
            event_fee: '线上',
            event_location: '线上',
            event_type: '戏剧-话剧',
            event_photo: 'https://img1.doubanio.com/pview/event_poster/large/public/e265eecd604696b.jpg',
            modalVisible: false,
            finished: false
          },

          {
            event_id: '34320432',
            event_name: '【北京】悬疑女王阿加莎·克里斯蒂传世巨著《无人生还》（小说结尾版）',
            event_owner_name: '票牛',
            event_start_time: '2021-08-12T19:30:00',
            event_end_time: '2021-08-14T22:30:00',
            event_fee: '473 - 1982元',
            event_location: '保利剧院 北京东城区东直门外南大街14号',
            event_type: '戏剧-话剧',
            event_photo: 'https://img2.doubanio.com/pview/event_poster/large/public/eb4933dfd25d89e.jpg',
            modalVisible: false,
            finished: false
          },
        ]
      ],
      iduse: global.idneeduse,
    }
  }

  setModalVisible = (visible, index_id) => {
    let newArray = [...this.state.dataSource];
    for (let i = 0; i < newArray[this.state.iduse].length; i++) {
      let id = newArray[this.state.iduse][i].event_id;
      if (id === index_id) {
        newArray[this.state.iduse][i].modalVisible = visible;
        console.log(id);
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
      for (let i = 0; i < newArray[this.state.iduse].length; i++) {
        let id = newArray[this.state.iduse][i].event_id;
        if (id === index_id) {
          newArray[this.state.iduse][i].finished = finish;
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
        <FlatList
          data={this.state.dataSource[global.idneeduse]}
          renderItem={({ item }) => this._renderRow(item)}
          keyExtractor={(item, index) => item + index}
          numColumns={1}
        />
        <Button
          title="跟登陆前一样？刷新一下"
          onPress={() => {
            this.setState({
              iduse: global.idneeduse
            })
          }}
        />
      </SafeAreaView>
    )
  }

  _renderRow(item) {
    modalVisible = true;
    finished = false;
    let newArray = [...this.state.dataSource];
    for (let i = 0; i < newArray[this.state.iduse].length; i++) {
      let id = newArray[this.state.iduse][i].event_id;
      if (id === item.event_id) {
        modalVisible = newArray[this.state.iduse][i].modalVisible;
        finished = newArray[this.state.iduse][i].finished;
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
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 6,
    flexDirection: 'row',
    flex: 1
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
  }
});
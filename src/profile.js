import React, { Component } from "react";
import { Fragment } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput
} from "react-native";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ThemeVariables from '../native-base-theme/variables/platform';
import { Header, Content, Button, Icon, Left, Body, Right, Title, Thumbnail,Form,Item,Label,Input } from 'native-base';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      name: "无法获取",
      userPwd: "",
      userPwdAgain: "",
      image: "",
      desc: "描述",
      createNum: 0,
      participateNum: 0,
      wishNum: 0,
    };
  }

  setregModalVisible = (visible) => {
    this.setState({ reg_modalVisible: visible });
    console.log("niba");
  }

  setlogModalVisible = (visible) => {
    this.setState({ log_modalVisible: visible });
    console.log("nima");
  }

  setname = () => {
    this.setState({ user_name: "国戏春秋" });
    this.setState({ log_modalVisible: false });
    this.setState({ dl: true });
    global.userdeid = this.state.user_id
    if (this.state.user_id === '4900763') {
      global.idneeduse = 1
      this.setState({ user_name: "勇敢的小张" });
    }
    if (this.state.user_id === '56727330') {
      global.idneeduse = 2
      this.setState({ user_name: "在希望的田野上" });
    }
  }

  render() {
    if (this.state.userId) {
      return this._renderMyView();
    } else {
      return this._renderSigninView();
    }
  }

  _renderSigninView() {
    return (
      <Fragment>
        <Header>
          <Left>
            <View style={styles.headerLeftView}>
              <Thumbnail small source={NORMAL_USER_AVATAR} />
            </View>
          </Left>
          <Body>
            <Title>我的</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.container}>
          <View style={styles.item}><Text style={styles.textStyle}>用户帐号：</Text>
            <TextInput
              ref="inputLoginName"
              autoFocus={true}
              underlineColorAndroid="gray"
              placeholder="请输入用户名"
              clearTextOnFocus={true}
              clearButtonMode="while-editing"
              style={{ flex: 1 }}
              onChangeText={(input) => this.setState({ username: input })}
            ></TextInput>
          </View>
          <View style={styles.item}><Text style={styles.textStyle}>用户密码：</Text>
            <TextInput
              ref="inputLoginPwd"
              underlineColorAndroid="gray"
              placeholder="请输入密码"
              clearTextOnFocus={true}
              clearButtonMode="while-editing"
              style={{ flex: 1 }}
              onChangeText={(input) => this.setState({ userpwd: input })}></TextInput>
          </View>
          <TouchableHighlight
            style={styles.login}
            underlayColor='transparent'
            onPress={() => this._onSignin()} >
            <Text style={styles.loginText}>登录</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.login}
            underlayColor='transparent'
            onPress={() => this.props.navigation.navigate("Register")
            }><Text
              style={styles.loginText}>注册</Text></TouchableHighlight>
        </View>

      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  headerLeftView: {
    paddingRight: ThemeVariables.buttonPadding,
    paddingLeft: ThemeVariables.platform === "ios" && ThemeVariables.platformStyle !== "material"
                   ? 4 : 8
  },
  headerLeftThumbnail: {
    marginTop: 0,
    marginRight: 2,
    marginLeft: 1,
    paddingTop: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  item: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10
  },
  textStyle: {
      fontSize: 18,
      color: 'black',
      marginRight: 10
  },
  login: {
      height: 40,
      backgroundColor: '#0000FF',
      margin: 20,
      justifyContent: 'center',
  },
  loginText: {
      fontSize: 20,
      alignSelf: 'center',
      color: '#FFF'
  },
  // parent:{
  //   flex:1,
  //   // justifyContent: "center",
  //   alignItems: "center",
  //   padding:30
  // },
  // form:{
  //   flex:1,
  // },
  // login:{
  //   flex:1,
  // },
  // register:{
  //   flex:1,
  //   marginTop:40,
  // },

  wholeContainer:{
    padding:10
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 3,
    marginRight: 20
  },
  nameDesc:{
    flex:1,
    alignItems:'flex-start'
  },
  name:{
    flex:1,
    fontSize: 17,
    fontWeight: "bold",
  },
  headContainer:{
    justifyContent: "flex-start",
    padding:10,
    flexDirection:'row',
    backgroundColor:"orange",
    height:70
  },
  locContainer:{
    flexDirection:'row',
    justifyContent: "flex-start",
    padding:10,
    marginTop:20
  },
  label:{
    color: "#999",
    fontSize: 23,
    fontWeight: "bold"
  },
  location:{
    fontSize: 23
  },
  infoContainer:{
    flexDirection:'row',
    justifyContent: "flex-start",
    padding:10,
    marginTop:20
  },
  subContainer:{
    alignItems:"center",
    marginRight:15
  },
  userNum:{
    fontSize: 23
  }
});

export default Profile;
import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const NCUVEMS_USERS = 'https://ncuvems.sda.nagoya-cu.ac.jp/users';
let moment = require('moment');
moment.lang('ja', {
  weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
  weekdaysShort: ["日","月","火","水","木","金","土"],
});
class Users extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [], //ここに好きな場所を指定。
    };
    // this.getUsers();
    this.getLogs();
  }
  getLogs() {
    // Google Maps APIが指定した必須パラメータ(この場合はaddress)をparamsに渡す。
    axios
      .get(NCUVEMS_USERS)
      .then((results) => {
      // 以下のGoogle API のレスポンスの例を元に欲しいデータを取得
        const data = results.data;
        console.log('data', data);
        // data = data.filter((value, index, self) => {
        //   return indexOf(value )
        // })
        this.setState({
          data: data,
        });
      },
      )
      .catch(() => {
        console.log('通信に失敗しました。');
      });
  }
  render() {
    return (
      <table className="users">
        <Wrapper>
          <UserInfo>登録日</UserInfo>
          <UserInfo>ID</UserInfo>
          <UserInfo>表示名</UserInfo>
          <UserInfo>ポイント</UserInfo>
          <UserInfo>状態</UserInfo>
        </Wrapper>
        {this.state.data.map((user) => {
          return <Wrapper key={user.id}>
            <UserInfo>{moment(user.created_at).format("MM月DD日　ddd HH:mm:ss ")}</UserInfo>
            <UserInfo>{user.id}</UserInfo>
            <UserInfo>{user.displayName}</UserInfo>
            <UserInfo>{user.count}</UserInfo>
            <UserInfo>{user.state}</UserInfo>
          </Wrapper>
        })}
      </table>
    );
  }
}
const Wrapper = styled.tr`
  // display: flex;
  // width: 100vw;
`;
const UserInfo = styled.td`
  // margin-right: 20px;
  // min-width: 150px;
`;

export default Users;

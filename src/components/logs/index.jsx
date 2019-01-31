import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const NCUVEMS_LOGS = 'https://ncuvems.sda.nagoya-cu.ac.jp/logs';
const NCUVEMS_USERS = 'https://ncuvems.sda.nagoya-cu.ac.jp/users';
let moment = require('moment');
moment.lang('ja', {
  weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
  weekdaysShort: ["日","月","火","水","木","金","土"],
});
let time = moment('2018/12/02 00:00:00');

class Logs extends Component {
  
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
      .get(NCUVEMS_LOGS)
      .then((results) => {
      // 以下のGoogle API のレスポンスの例を元に欲しいデータを取得
        const data = results.data;
        console.log('data', data);
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
      <Page>
        <table className="users">
          <Wrapper>
            <UserInfo>登録日</UserInfo>
            {/* <UserInfo>表示名</UserInfo> */}
            <UserInfo>メッセージ</UserInfo>
            <UserInfo>めも</UserInfo>
          </Wrapper>
          {this.state.data.map((log) => {
            return <Wrapper 
              key={log.id} isServer={log.is_server} 
              rp={log.rp} 
              memo={log.memo === '電気が消された or 授業が始まった'} 
              testPeriod={moment(log.created_at) - time < 0}>
              <UserInfo>{moment(log.created_at).format("MM月DD日　ddd HH:mm:ss ")}</UserInfo>
              {/* <UserInfo>{log.displayName}</UserInfo> */}
              <UserInfo>{log.message}</UserInfo>
              <UserInfo>{log.memo}</UserInfo>
            </Wrapper> 
          })}
        </table>
        <Count>
          
        </Count>
      </Page>
    );
  }
}
const Page = styled.tr`
  overflow: scroll;
  height: 100vh;

`;
const Wrapper = styled.tr`
  background: ${(props) => props.rp === 0 && '#8e8e8e'};
  // display: ${(props) => (props.rp === 0 && !props.isServer) && 'none'};
  background: ${(props) => props.rp === 1 && '#ffe97b'};
  background: ${(props) => props.rp === 2 && '#e2ff7b'};
  background: ${(props) => props.isServer ? '#ffce6b' :''};
  background: ${(props) => props.memo ? '#b9d2bc' :''};
  display: ${(props) => props.testPeriod ? 'none': ''};


`;
const UserInfo = styled.td`

`;
const Count = styled.div`

`;


export default Logs;

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const NCUVEMS_ROOMS = 'https://ncuvems.sda.nagoya-cu.ac.jp/rooms';
let moment = require('moment');
moment.lang('ja', {
  weekdays: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
  weekdaysShort: ["日","月","火","水","木","金","土"],
});
class A202 extends Component {
  
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
      .get(NCUVEMS_ROOMS)
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
  postRoomState(is_watching) {
    // Google Maps APIが指定した必須パラメータ(この場合はaddress)をparamsに渡す。
    axios
      .post(`${NCUVEMS_ROOMS}/A202/is_watching/${is_watching}`)
      .then((results) => {
      // 以下のGoogle API のレスポンスの例を元に欲しいデータを取得
        const data = results.data;
        console.log('data', data);
        // data = data.filter((value, index, self) => {
        //   return indexOf(value )
        // })
        // this.setState({
        //   data: data,
        // });
        this.getLogs()
      },
      )
      .catch(() => {
        console.log('通信に失敗しました。');
      });
  }
  render() {
    let is_watching_A202 = -1;
    let state_A202 = -1;
    return (
      <Fragment>
      <RoomInfoTable className="A202">
        <Wrapper>
          <RoomInfo>ID</RoomInfo>
          <RoomInfo>表示名</RoomInfo>
          <RoomInfo>状態</RoomInfo>
          <RoomInfo>監視</RoomInfo>
        </Wrapper>
        {this.state.data.map((room) => {
          is_watching_A202 = room.is_watching;
          state_A202 = room.state
          return <Wrapper key={room.id}>
            <RoomInfo>{room.id}</RoomInfo>
            <RoomInfo>{room.name}</RoomInfo>
            <RoomInfo>{room.state}</RoomInfo>
            <RoomInfo>{room.is_watching}</RoomInfo>
          </Wrapper>
          
        })}
      </RoomInfoTable>
      <Buttons>
        <ChangeStateButton onClick={() => this.postRoomState(0)} active={is_watching_A202 === 0}>授業</ChangeStateButton>
        <ChangeStateButton onClick={() => this.postRoomState(1)} active={is_watching_A202 === 1}>無駄遣い監視</ChangeStateButton>
      </Buttons>
      <Buttons>
        <StateButton down={false} active={state_A202 === 0}>平常時</StateButton>
        <StateButton down={true} active={state_A202 === 1}>アラート後</StateButton>
        <StateButton down={false} active={state_A202 === 2}>確認待ち</StateButton>
      </Buttons>
      <Description>
        <PetternWrap>
        <Pettern>
          <PetternName>（あ）消した</PetternName>
          <Step>1. 授業中</Step>
          <Step>2. 授業終了(監視時間)</Step>
          <Step>3. 通知を送信</Step>
          <Step>4. 消しに来る</Step>
          <Step>5. 消した</Step>
          <Step>6. 確認</Step>
          <Step>7. 消した</Step>
          <Step>8. 確認＆ポイント付与</Step>
        </Pettern>
        <Pettern>
          <PetternName>（い）消せなかった</PetternName>
          <Step>1. 授業中</Step>
          <Step>2. 授業終了(監視時間)</Step>
          <Step>3. 通知を送信</Step>
          <Step>4. 消しに来る</Step>
          <Step>5. 消せなかった</Step>
          <Step>6. ポイント付与</Step>
        </Pettern>
        </PetternWrap>
        <PetternWrap>
        <Pettern>
          <PetternName>（う）部屋を使用中</PetternName>
          <Step>1. 授業中</Step>
          <Step>2. 授業終了(監視時間)</Step>
          <Step>3. 通知を送信</Step>
          <Step>4. 消さない</Step>
          <Step>5. 使用中</Step>
          <Step>6. ポイント付与</Step>
        </Pettern>
        <Pettern>
          <PetternName>（え）消さない</PetternName>
          <Step>1. 授業中</Step>
          <Step>2. 授業終了(監視時間)</Step>
          <Step>3. 通知を送信</Step>
          <Step>4. 消さない</Step>
          <Step>5. 消しに行けない</Step>
        </Pettern>
        </PetternWrap>
      </Description>
      </Fragment>
    );
  }
}
const RoomInfoTable = styled.table`
  margin: 20px;
`;


const Wrapper = styled.tr`
  // display: flex;
  // width: 100vw;
`;
const RoomInfo = styled.td`
  // margin-right: 20px;
  // min-width: 150px;
`;
const Buttons = styled.div`
  margin: 10px;
  // min-width: 150px;
  display: flex;
`;
const ChangeStateButton = styled.div`
  margin: 10px;
  width: 200px;
  padding: 10px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? '#72cc00':'#abaaaa'};
  color: ${props => props.active ? '#fff':'#fff'};
  cursor: pointer;
  font-weight: bold;
`;
const StateButton = styled.div`
  margin: 10px;
  width: 80px;
  padding: 10px;
  height: 80px;
  border-radius: 60px;
  border: 2px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? '#72cc00':'#abaaaa'};
  color: ${props => props.active ? '#fff':'#fff'};
  margin-top: ${props => props.down ? '200px':'10px'};
  cursor: pointer;
  font-weight: bold;
`;
const  Description = styled.div`
  margin-left: 10px;
`;
const PetternWrap = styled.div`
  display: flex;

`;
const Pettern = styled.div`
  margin: 10px;
  width: 200px;
  border-radius: 10px;
  border: 2px solid #fff;
`;
const PetternName = styled.div`
  background: #fff;
  padding: 5px;
  border-radius: 4px 4px 0 0;
`;

const Step = styled.div`
  margin: 10px;
`;

export default A202;


// import Users from '../components/users/index';
import Logs from '../components/logs/index';
import A202 from '../components/rooms/A202/index';


export const routes = [
    // 後で追加
    // {
    //     path: "/login",
    //     component: Login
    // },
    // {
    //     path: "/users",
    //     component: Users
    // },
    {
        path: "/rooms/A202",
        component: A202
    },
    {
        path: "/logs",
        component: Logs
    },
    // {
    //     path: "/log/reservation",
    //     component: ReservationLog
    // },
    // {
    //     path: "/scenario/phone",
    //     component: PhoneScenario
    // },
    // {
    //     path: "/scenario/reservation",
    //     component: ReservationScenario
    // },
    // {
    //     path: "/setting",
    //     component: Setting
    // }
];
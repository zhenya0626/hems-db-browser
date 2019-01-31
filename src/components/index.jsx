import React from "react";
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';
import { routes } from '../routes/index';

function RouteWithSubRoutes(route) {
    return (
        <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
        )}
        />
    );
}
function Root() {
    return (
        <Wrapper>
            <Router>
                <PagerWrapper>
                <Menu>
                    <MenuTop>NCUVEMS</MenuTop>
                    <MenuSectionTitle>DB</MenuSectionTitle>
                    <StyledLink to="/rooms/A202">ブリーフィング</StyledLink>
                    <StyledLink to="/logs">ログ</StyledLink>
                </Menu>
                <RightArea>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                        ))}
                        <Route exact path="/" render={() => (<Redirect to="/log/chat"/>)}/>
                </RightArea>
            </PagerWrapper>
            </Router>
        </Wrapper>
    );
}
const Wrapper = styled.div`
    display: flex;
`;
const PagerWrapper = styled.div`
    display: flex;
    width: 100%;
`;
const Menu = styled.div`
    background: #253f24;
    height: 100vh;
    min-width: 175px;
`;
const MenuTop = styled.div`
    background: #253f24;
    color: #fff;
    height: 34px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-size: 11px;
    font-weight: bold;
`;
const MenuSectionTitle = styled.div`
    background: #485343;
    color: #fff;
    height: 34px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-size: 11px;
    font-weight: bold;
    border-top: 1px solid #FFFFFF;
`;
const StyledLink = styled(NavLink)`
    text-decoration: none;
    background: #253f24;
    color: #fff;
    height: 54px;
    display: flex;
    align-items: center;
    padding-left 15px;
    font-size: 12px;
    font-weight: bold;
    border-bottom: 1px solid #707070;
    position: relative;
    transition: all 0.2s;
    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }
    &.active {
        background-color: #4b9148;
        opacity: 1;
    }
    &:last-child {
        border-top: 1px solid #FFFFFF;
        border-bottom: 1px solid #FFFFFF;
    }
    &::after{
        right: 10px;
        width: 5px;
        height: 5px;
        border-top: 1.5px solid #fff;
        border-right: 1.5px solid #fff;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        content: '';
        position: absolute;
    }
`
const RightArea = styled.div`
    width: calc(100vw - 175px);
    background: #d3dcd7;
    height: 100vh;
    overflow: scroll;
`;



export default Root;
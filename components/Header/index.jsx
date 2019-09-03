import React from "react"
import Link from "next/link"
import styled from "styled-components"
import logo from "./logo.svg"
import eyeglass from "./eyeglass.svg"
import theme from "../_theme"

const Header = styled.header`
    background: ${theme.darkText};
    color: white;
    width: 100%;
    padding: 20px;
`

const HeaderInner = styled.div`
    max-width: ${theme.maxWidth};
    margin-left: auto;
    margin-right: auto;
    @media screen and (min-width: ${theme.tablet}){
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`

const MastheadLink = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    text-decoration: none;
    &:focus{
        outline: 3px solid ${theme.focus};
    }
`

const Logo = styled.img`
    max-width: 80px;
    margin-right: 15px;
`

const ServiceName = styled.h1`
    font-size: 1.5em;
    flex: 1;
`

const Nav = styled.nav`
    display: none;
    @media screen and (min-width: ${theme.tablet}){
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
    }
`

const Menu = styled.ul`
    list-style: none;
`

const MenuListItem = styled.li`
    display: inline-block;
    margin-right: 15px;
    &:last-of-type{
        margin-right: 0px;
    }
`

const MenuLink = styled.a`
    color: white;
    text-decoration: none;
    transition: border-bottom 0.1s ease-out;
    &:hover{
        border-bottom: 1px solid white;
    }
    &:focus{
        outline: 3px solid ${theme.focus};
        background: ${theme.focus};
        color: ${theme.darkText};
        border-bottom-color: ${theme.darkText};
    }
`

const SearchInput = styled.input`
    padding: 10px 15px;
    color: ${theme.darkText};
    border-radius: 100px;
    border: none;
    font-size: 0.9em;
    margin-bottom: 15px;
    &:focus{
        box-shadow: 0px 0px 0px 3px ${theme.focus};
    }
`

const SearchForm = styled.form`
    position: relative;
`

const SearchButton = styled.button`
    position: absolute;
    right: 0px;
    height: 39px;                   
    padding: 8px 10px;
    background: none;
    border: none;
    border-radius: 0px 100px 100px 0px;
    cursor: pointer;
    &:focus{
        outline: none !important;
        box-shadow: 0px 0px 0px 3px ${theme.focus};
    }
`

const SearchIcon = styled.img`
    width: 19px;
    height: 19px;
    transform: translateY(2px);
`

const MenuItem = ({href, children}) =>
    <MenuListItem><Link href={href}><MenuLink href={href}>{children}</MenuLink></Link></MenuListItem>

const SiteHeader = () =>
    <Header>
        <HeaderInner>

            <Link href="/">
                <MastheadLink href="/">
                    <Logo src={logo} alt="Buckinghamshire County Council"/>
                    <ServiceName>Care for adults</ServiceName>
                </MastheadLink>
            </Link>

            <Nav>
                <SearchForm>
                    <SearchInput type="text" placeholder="Search"></SearchInput>
                    <SearchButton><SearchIcon src={eyeglass} alt="search"/></SearchButton>
                </SearchForm>
                <Menu>
                    <MenuItem href="/recommendations">Find services</MenuItem>
                    <MenuItem href="/">Information and advice</MenuItem>     
                    <MenuItem href="/">Log in</MenuItem>
                    <MenuItem href="/">Sign up</MenuItem>
                </Menu>
            </Nav>

        </HeaderInner>
    </Header>

export default SiteHeader
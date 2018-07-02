import React, { Component } from 'react';
import Logo from '../images/logo.png';
import Github from '../images/github.png';

export default class Header extends Component {
  render() {
    return (
      <header>
        <a className="logo" href="https://www.verbling.com/">
          <img className="logo-img" src={Logo} />
          <h1 className="verbling">verbling</h1>
        </a>
        <a href="https://github.com/nwelchr/verbling-challenge">
          <img className="github" src={Github} />
        </a>
      </header>
    );
  }
}

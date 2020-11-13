import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../state/store';
import logoHDM from '../../assets/LogoHDM.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Module, User } from '../../index.d';
import { tokenManager } from '../../helpers/TokenManagement';
import './styles/CustomNavbar.css';

interface Props {
  user: User,
  modules: Module[],
  updateUser: () => Promise<void>,
  updateModulesList: () => Promise<void>,
}

interface State {
  isMenuOpened: boolean,
}

export class CustomNavbar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    tokenManager();

    this.state = {
      isMenuOpened: false,
    };
  }

  showOrHide = () => this.setState({ isMenuOpened: !this.state.isMenuOpened });

  render() {
    const toggleClassName = this.state.isMenuOpened ? 'active' : '';

    return (
      <div className="component-nav">
        <div className="info-user">
          <div className="container">
            <div className="user-box">
              ({ this.props.user.username })
            </div>
          </div>
        </div>
        <div className="nav nav-bar">
          <div className="container container-nav">
            <div className="link-dashboard">
              <Link to="/">
                <img className="logo-hdm" src={logoHDM} alt="logo HDM Network" />
                <span className="logo-title">ADMIN DASHBOARD</span>
              </Link>
            </div>
            <button id="toggle" className={toggleClassName} onClick={this.showOrHide}>
              <div className="nav-icon">
                <div />
              </div>
            </button>
            <div className="menu">
              { this.props.modules.map((module) =>
                <Link key={module.name} to={module.link}>{ module.linkText }</Link>) }
              <button
                className="logo-out"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/?logout';
                }}
              >
                <FontAwesomeIcon className="icon-logout" icon={faSignOutAlt} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  user: state.user.user,
  modules: state.modules.modules,
});

const mapDispatch = (dispatch: any) => ({
  updateUser: dispatch.user.updateUser,
  updateModulesList: dispatch.modules.updateModulesList,
});

export default connect(mapState, mapDispatch)(CustomNavbar);

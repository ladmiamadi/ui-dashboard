import React from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { refreshToken } from '../../helpers/TokenManagement';
import { Module, User } from '../../index.d';
import { RootState } from '../../state/store';
import { UserProfileHelpers } from '../../helpers/UserProfileHelpers';
import ProfileCollection from '../../../talents/helpers/ProfileCollection';
import './styles/CustomNavbar.css';

interface Props {
  user: User,
  modules: Module[],
  fetchUserByCache: () => Promise<void>,
  updateUser: () => Promise<void>,
  updateModulesList: () => Promise<void>,
}

interface State {
  isMenuOpened: boolean,
}

export class CustomNavbar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    refreshToken();
    
    this.state = {
      isMenuOpened: false,
    };
  }

  componentDidMount() {
    this.props.fetchUserByCache();
  }

  private toggleClassName(): string {
    return this.state.isMenuOpened ? 'active' : '';
  }

  showOrHide = () => this.setState({ isMenuOpened: !this.state.isMenuOpened });

  render() {
    const userProfileLive = ProfileCollection.filterByEnvironment(
      this.props.user.userProfiles, 'live',
    );

    return (
      <div className="component-nav">
        <div className="info-user">
          <div className="container">
            <div>
              <img alt="User Profile" src={UserProfileHelpers.getUserProfilePictureUrl(userProfileLive)}/>
              Bienvenue <b>
                {UserProfileHelpers.getFullNameFromUser(this.props.user)}
              </b> !
            </div>
          </div>
        </div>
        <div className="nav nav-bar">
          <div className="container container-nav">
            <div className="link-dashboard">
              <Link to="/dashboard">
                <img className="logo-hdm" src={require('../../assets/LogoHDM.png')} alt="logo HDM Network" />
                <span className="logo-title">ADMIN DASHBOARD</span>
              </Link>
            </div>
            <button id="toggle" className={this.toggleClassName()} onClick={this.showOrHide}>
              <div className="nav-icon">
                <div />
              </div>
            </button>
            <div className="menu">
              {this.props.modules.map((module) =>
                <Link key={module.name}
                  to={module.link}>{module.linkText}</Link>)
              }
              <button
                className="logo-out"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/fr';
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
  fetchUserByCache: dispatch.user.fetchUserByCache,
  updateModulesList: dispatch.modules.updateModulesList,
});

export default connect(mapState, mapDispatch)(CustomNavbar);

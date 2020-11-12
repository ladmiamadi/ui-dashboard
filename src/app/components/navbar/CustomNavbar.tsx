import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../state/store';
import logoHDM from '../../assets/LogoHDM.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Module, User } from '../../index.d';
import './styles/CustomNavbar.css';

//temporary
import { addTokenToRequestInterceptor } from '../../http/service';

interface Props {
  user: User,
  modules: Module[],
  updateUser: () => Promise<void>,
  updateModulesList: () => Promise<void>,
}

interface State {
  isMenuOpened: boolean,
}

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MDUyMDA1MzAsImV4cCI6MTYwNTIwNDEzMCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiUXVlbnRpbiJ9.RxhO2eJDJKDIDDnmZvFPCTA5LWwYk1dfVequo9_6A2alIrcJ3JYLZTD78m68E3FGgLx1xJfMmqIwyqJZB2S11ncoCMHdPfsCwAEIUrjxVSOO3m_OfkbLmEuRtRcWsnepwr4rsOLW59ysqZbUb660P055kcwxflDYoekrIvl2Ls3ZwGjk9F-ATiox0QOKi7m93FBLedZQYkKyF69LvOX499kI5NUrb0LYJrLahKekJeWTCRzXDntyvHqXPDPwleAqd8-2VvaLijsEfEA_u1Vgv2_c3_AxesIOjrY9gRQN31mcu08DgDbWAvCzFUWkkJ3aaGmy6Bn-cRpuSoTwwEx6fIgmKvHRc47QqR-RjdRqf1XH09HSKZ-VgSzHg06DKsmf7_nTZKgwLazPUY6oyPHBUQNjPjAWp-H8FSSvnEZTBAYv1xOQAnf0Oj5CsO-NEXPXS-kezMCRrvuzr2sggnzMRfuN8SmGJOdfg_gbnWiP6dbNX0OfYdLiFnUw_WEVK3kjAUj3EV_Cf9N4CDnwcD6i9jCc2B3Sp_1i2cv1Q5-urPLGIp9EN3fezwasAFVH_wplH5pmDNN-EWPV3evJ2xsT7n8WYm3XSPjL2BQoD7nHLY1PiqK-B4pnvLEbkX5cB2-VGINFGZMTkNNs3Ou7nwbTY1HsAP62vbnwlMxyoM5uyk8';

export class CustomNavbar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    addTokenToRequestInterceptor(token);

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

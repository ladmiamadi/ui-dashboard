import React from 'react';
import { Button } from 'reactstrap';
import lodash from 'lodash';
import { ModalCustom } from '../../../app/components/utils/ModalCustom';
import { refreshToken } from '../../helpers/TokenManagement';
import { clearTokenFromAxios } from '../../http/service';
import classes from './styles/ModalTimeout.module.css';

export class ModalTimeout extends React.Component {
  state = {
    isModalOpen: false,
  };

  inactivityTimer = setTimeout(() => {
    this.handleInactivityTimeout();
  }, 1000 * 60 * 60 * 2);

  refreshTokenTimer = setInterval(() => {
    refreshToken();
  }, 1000 * 60 * 60);

  handleInactivityTimeout = () => {
    this.toggleModal();
    this.inactivityTimer = setTimeout(this.handleLogout, 1000 * 60);
  };

  handleLogout = () => {
    localStorage.clear();
    window.location.href = '/fr';
  };

  resetInactivityTimer = () => {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(this.handleInactivityTimeout, 1000 * 60 * 60 * 2);
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  activateInactivityTracker = () => {
    window.addEventListener('mousemove', lodash.throttle(this.resetInactivityTimer, 5000));
    window.addEventListener('scroll', lodash.throttle(this.resetInactivityTimer, 5000));
    window.addEventListener('keydown', lodash.throttle(this.resetInactivityTimer, 5000));
  };

  deactivateInactivityTracker = () => {
    window.removeEventListener('mousemove', lodash.throttle(this.resetInactivityTimer, 5000));
    window.removeEventListener('scroll', lodash.throttle(this.resetInactivityTimer, 5000));
    window.removeEventListener('keydown', lodash.throttle(this.resetInactivityTimer, 5000));
  };

  componentDidMount() {
    this.activateInactivityTracker();
  }

  componentWillUnmount() {
    clearTokenFromAxios();
    clearTimeout(this.inactivityTimer);
    clearInterval(this.refreshTokenTimer);
    this.deactivateInactivityTracker();
  }

  render() {
    return (
      <ModalCustom
        className={classes['modal-timeout']}
        isModalShown={this.state.isModalOpen}
        toggleModal={this.toggleModal}
        titleModal="Êtes-vous toujours là ?">
        <Button color="danger" onClick={this.handleLogout} className={classes['button-modal-timeout']}>
          Se déconnecter
        </Button>
        <Button color="secondary" onClick={this.toggleModal} className={classes['button-modal-timeout']}>
          Maintenir la connexion
        </Button>
      </ModalCustom>
    );
  }
}

export default ModalTimeout;

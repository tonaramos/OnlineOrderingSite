import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this.errorConfirmHandler = this.errorConfirmHandler.bind(this);
  }

  componentWillMount() {
    this.reqInterceptor = axios.interceptors.request.use((req) => {
      this.setState({ error: null });
      return req;
    });
    this.resInterceptor = axios.interceptors.response.use(response => response, (error) => {
      this.setState({ error });
    });
  }

  componentWillUnmount() {
    axios.interceptors.request.eject(this.reqInterceptor);
    axios.interceptors.response.eject(this.resInterceptor);
  }

  errorConfirmHandler() {
    this.setState({ error: null });
  }

  render() {
    const { error } = this.state;
    return (
      <Aux>
        <Modal
          show={error}
          modalClosed={this.errorConfirmHandler}
        >
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...this.props} />
      </Aux>
    );
  }
};

export default withErrorHandler;

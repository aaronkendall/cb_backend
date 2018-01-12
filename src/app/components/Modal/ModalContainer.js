import React from 'react';
import PropTypes from 'prop-types';

const ModalContainer = ({ contents, handleCloseModal }) => (
  <section className="modal-container" onClick={handleCloseModal}>
    {contents}
  </section>
);

ModalContainer.propTypes = {
  contents: PropTypes.node.isRequired,
  handleCloseModal: PropTypes.func.isRequired
};

export default ModalContainer;

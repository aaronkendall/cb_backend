import React from 'react';
import PropTypes from 'prop-types';

const ModalContainer = ({ contents }) => (
  <section className="modal-container">
    {contents}
  </section>
);

ModalContainer.propTypes = {
  contents: PropTypes.node.isRequired
};

export default ModalContainer;

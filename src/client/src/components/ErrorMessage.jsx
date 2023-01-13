import React from 'react';
import PropTypes from 'prop-types';

ErrorMessage.propTypes = {
  error: PropTypes.object
};

function ErrorMessage({ error }) {
  const styles = {
    margin: '1rem',
    fontSize: '1.25rem',
    color: 'red',
    overflowWrap: 'break-word',
  };

  return (
    <div style={styles}>
      <pre>
        Error: {error.message}
      </pre>
    </div>
  );
}

export default ErrorMessage;

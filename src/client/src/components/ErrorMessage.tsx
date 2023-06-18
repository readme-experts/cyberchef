import React, { CSSProperties } from 'react';

interface Props {
  error: Error
}

function ErrorMessage({ error }: Props) {
  const styles: CSSProperties = {
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

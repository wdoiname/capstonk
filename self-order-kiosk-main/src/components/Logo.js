import React from 'react';

export default function Logo({ large }) {
  return (
    <img
      src="/images/logo1.png"
      alt="Citibikes Logo"
      style={{
        width: large ? 650 : 480,
        maxWidth: '100%',
        height: 'auto',
        objectFit: 'contain',
        display: 'block',
        margin: '0 auto',
        background: 'transparent',
        marginBottom:10,
        
      }}
    />
  );
}
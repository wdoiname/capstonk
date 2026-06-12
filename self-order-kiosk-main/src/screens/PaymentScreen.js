import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import Logo from '../components/Logo';
import PaymentIcon from '@material-ui/icons/Payment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function PaymentScreen(props) {
  return (
    <Box
      style={{
        minHeight: '100vh',
        width: '100%',
        background:
          'linear-gradient(135deg, #2563eb 0%, #60a5fa 45%, #e0f2fe 70%, #f8fafc 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '40px 24px',
        boxSizing: 'border-box',
      }}
    >
      <Box
        style={{
          width: '100%',
          maxWidth: 760,
          backgroundColor: '#ffffff',
          borderRadius: 32,
          padding: '45px 35px',
          textAlign: 'center',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          marginTop: 30,
        }}
      >
        <Logo large />

        <Box
          style={{
            width: 95,
            height: 95,
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '25px auto 20px',
          }}
        >
          <PaymentIcon style={{ fontSize: 52 }} />
        </Box>

        <Typography
          variant="h3"
          component="h1"
          style={{
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: 12,
          }}
        >
          Payment Processing
        </Typography>

        <Typography
          variant="h6"
          style={{
            color: '#6b7280',
            marginBottom: 30,
            lineHeight: 1.5,
          }}
        >
          Please follow the instructions on the payment terminal.
        </Typography>

        <CircularProgress
          size={58}
          thickness={5}
          style={{
            color: '#dc2626',
            marginBottom: 24,
          }}
        />

        <Typography
          variant="body1"
          style={{
            color: '#9ca3af',
            fontWeight: 'bold',
          }}
        >
          Waiting for payment confirmation...
        </Typography>
      </Box>

      <Box
        style={{
          width: '100%',
          maxWidth: 760,
          display: 'flex',
          justifyContent: 'center',
          marginTop: 25,
        }}
      >
        <Button
          onClick={() => props.history.push('/complete')}
          variant="contained"
          size="large"
          startIcon={<CheckCircleIcon />}
          style={{
            width: '100%',
            maxWidth: 420,
            borderRadius: 18,
            padding: '18px 30px',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 18,
            boxShadow: '0 12px 28px rgba(220,38,38,0.35)',
          }}
        >
          Complete Order
        </Button>
      </Box>
    </Box>
  );
}
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext, useEffect } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReplayIcon from '@material-ui/icons/Replay';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { createOrder } from '../actions';
import { Store } from '../Store';

export default function CompleteOrderScreen(props) {
  const { state, dispatch } = useContext(Store);
  const { order } = state;
  const { loading, error, newOrder } = state.orderCreate;

  useEffect(() => {
    if (order.orderItems.length > 0) {
      createOrder(dispatch, order);
    }
  }, [dispatch, order]);

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
          maxWidth: 820,
          backgroundColor: '#ffffff',
          borderRadius: 32,
          padding: '45px 35px',
          textAlign: 'center',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          marginTop: 30,
        }}
      >
        {loading ? (
          <Box
            style={{
              marginTop: 35,
            }}
          >
            <CircularProgress
              size={60}
              thickness={5}
              style={{
                color: '#dc2626',
              }}
            />

            <Typography
              variant="h5"
              style={{
                marginTop: 25,
                color: '#111827',
                fontWeight: 'bold',
              }}
            >
              Saving your order...
            </Typography>
          </Box>
        ) : error ? (
          <Box
            style={{
              marginTop: 30,
            }}
          >
            <Alert severity="error">{error}</Alert>

            <Button
              onClick={() => props.history.push('/review')}
              variant="contained"
              size="large"
              style={{
                marginTop: 25,
                borderRadius: 18,
                padding: '14px 30px',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                fontWeight: 'bold',
              }}
            >
              Back to Review
            </Button>
          </Box>
        ) : (
          <>
            <Box
              style={{
                width: 110,
                height: 110,
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '30px auto 24px',
                boxShadow: '0 12px 28px rgba(22,163,74,0.25)',
              }}
            >
              <CheckCircleIcon style={{ fontSize: 68 }} />
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
              Order Placed Successfully
            </Typography>

            <Typography
              variant="h5"
              style={{
                color: '#6b7280',
                marginBottom: 30,
              }}
            >
              Thank you for ordering.
            </Typography>

            <Box
              style={{
                backgroundColor: '#f9fafb',
                borderRadius: 24,
                padding: '26px 22px',
                maxWidth: 520,
                margin: '0 auto',
                border: '1px solid #e5e7eb',
              }}
            >
              <ReceiptIcon
                style={{
                  fontSize: 44,
                  color: '#dc2626',
                  marginBottom: 10,
                }}
              />

              <Typography
                variant="body1"
                style={{
                  color: '#6b7280',
                  fontWeight: 'bold',
                  marginBottom: 8,
                }}
              >
                Your Order Number
              </Typography>

              <Typography
                variant="h2"
                style={{
                  color: '#dc2626',
                  fontWeight: 'bold',
                  letterSpacing: 2,
                }}
              >
                {newOrder && newOrder.number ? newOrder.number : '---'}
              </Typography>

              <Typography
                variant="body2"
                style={{
                  color: '#9ca3af',
                  marginTop: 12,
                }}
              >
                Please wait for your number to be called.
              </Typography>
            </Box>
          </>
        )}
      </Box>

      <Box
        style={{
          width: '100%',
          maxWidth: 820,
          display: 'flex',
          justifyContent: 'center',
          marginTop: 25,
        }}
      >
        <Button
          onClick={() => props.history.push('/')}
          variant="contained"
          size="large"
          startIcon={<ReplayIcon />}
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
          Order Again
        </Button>
      </Box>
    </Box>
  );
}
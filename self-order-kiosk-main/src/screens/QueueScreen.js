import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from '@material-ui/core';

import { Store } from '../Store';
import { Alert } from '@material-ui/lab';
import React, { useContext, useEffect } from 'react';
import { listQueue } from '../actions';
import Logo from '../components/Logo';
import BuildIcon from '@material-ui/icons/Build';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function QueueScreen() {
  const { state, dispatch } = useContext(Store);
  const { queue, loading, error } = state.queueList;

  useEffect(() => {
    listQueue(dispatch);

    const interval = setInterval(() => {
      listQueue(dispatch);
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Box
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f3f4f6',
      }}
    >
      <Box
        style={{
          background:
            'linear-gradient(135deg, #2563eb 0%, #60a5fa 45%, #e0f2fe 70%, #f8fafc 100%)',
          padding: '28px 35px',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item md={3} sm={12} xs={12}>
            <Logo />
          </Grid>

          <Grid item md={6} sm={12} xs={12}>
            <Typography
              variant="h3"
              component="h1"
              style={{
                color: '#000000',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Order Queue
            </Typography>

            <Typography
              variant="h6"
              style={{
                color: '#000000',
                textAlign: 'center',
                marginTop: 6,
              }}
            >
              Please wait for your order number to be called.
            </Typography>
          </Grid>

          <Grid item md={3} sm={12} xs={12}>
            <Box
              style={{
                backgroundColor: 'rgba(28, 243, 39, 0.92)',
                borderRadius: 18,
                padding: '14px 18px',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h6"
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                }}
              >
                Status
              </Typography>

              <Typography
                variant="h6"
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                }}
              >
                Live Queue
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        style={{
          padding: '35px',
        }}
      >
        {loading ? (
          <Box
            style={{
              height: '60vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress
              size={70}
              thickness={5}
              style={{
                color: '#dc2626',
              }}
            />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <Paper
                style={{
                  minHeight: 520,
                  borderRadius: 30,
                  padding: 28,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                }}
              >
                <Box
                  style={{
                    backgroundColor: '#111827',
                    color: '#ffffff',
                    borderRadius: 22,
                    padding: '22px 24px',
                    marginBottom: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <BuildIcon style={{ fontSize: 42 }} />

                  <Box>
                    <Typography
                      variant="h4"
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      In Progress
                    </Typography>

                    <Typography
                      variant="body1"
                      style={{
                        color: '#d1d5db',
                      }}
                    >
                      Orders currently being prepared
                    </Typography>
                  </Box>
                </Box>

                <List>
                  {queue &&
                  queue.inProgressOrders &&
                  queue.inProgressOrders.length > 0 ? (
                    queue.inProgressOrders.map((order) => (
                      <ListItem
                        key={order.number}
                        style={{
                          backgroundColor: '#f9fafb',
                          borderRadius: 22,
                          marginBottom: 16,
                          padding: '22px 26px',
                          border: '1px solid #e5e7eb',
                        }}
                      >
                        <Box
                          style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            variant="body1"
                            style={{
                              color: '#6b7280',
                              fontWeight: 'bold',
                            }}
                          >
                            Order Number
                          </Typography>

                          <Typography
                            variant="h2"
                            style={{
                              color: '#111827',
                              fontWeight: 'bold',
                              letterSpacing: 2,
                            }}
                          >
                            {order.number}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))
                  ) : (
                    <Box
                      style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                      }}
                    >
                      <Typography
                        variant="h5"
                        style={{
                          color: '#9ca3af',
                          fontWeight: 'bold',
                        }}
                      >
                        No orders in progress
                      </Typography>
                    </Box>
                  )}
                </List>
              </Paper>
            </Grid>

            <Grid item md={6} xs={12}>
              <Paper
                style={{
                  minHeight: 520,
                  borderRadius: 30,
                  padding: 28,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  overflow: 'hidden',
                }}
              >
                <Box
                  style={{
                    backgroundColor: '#dc2626',
                    color: '#ffffff',
                    borderRadius: 22,
                    padding: '22px 24px',
                    marginBottom: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <CheckCircleIcon style={{ fontSize: 42 }} />

                  <Box>
                    <Typography
                      variant="h4"
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      Now Serving
                    </Typography>

                    <Typography
                      variant="body1"
                      style={{
                        color: '#fee2e2',
                      }}
                    >
                      Orders ready for pickup
                    </Typography>
                  </Box>
                </Box>

                <List>
                  {queue &&
                  queue.servingOrders &&
                  queue.servingOrders.length > 0 ? (
                    queue.servingOrders.map((order) => (
                      <ListItem
                        key={order.number}
                        style={{
                          backgroundColor: '#fff1f2',
                          borderRadius: 22,
                          marginBottom: 16,
                          padding: '22px 26px',
                          border: '1px solid #fecaca',
                        }}
                      >
                        <Box
                          style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            variant="body1"
                            style={{
                              color: '#991b1b',
                              fontWeight: 'bold',
                            }}
                          >
                            Order Number
                          </Typography>

                          <Typography
                            variant="h1"
                            style={{
                              color: '#dc2626',
                              fontWeight: 'bold',
                              letterSpacing: 2,
                            }}
                          >
                            {order.number}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))
                  ) : (
                    <Box
                      style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                      }}
                    >
                      <Typography
                        variant="h5"
                        style={{
                          color: '#9ca3af',
                          fontWeight: 'bold',
                        }}
                      >
                        No orders serving yet
                      </Typography>
                    </Box>
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
import {
  Box,
  Button,
  CircularProgress,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useContext, useEffect } from 'react';
import { Store } from '../Store';
import { listOrders } from '../actions';
import axios from 'axios';
import Logo from '../components/Logo';
import BuildIcon from '@material-ui/icons/Build';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import RefreshIcon from '@material-ui/icons/Refresh';

export default function AdminScreen() {
  const { state, dispatch } = useContext(Store);
  const { orders, loading, error } = state.orderList;

  useEffect(() => {
    listOrders(dispatch);
  }, [dispatch]);

  const refreshHandler = () => {
    listOrders(dispatch);
  };

  const setOrderStateHandler = async (order, action) => {
    try {
      await axios.put('/api/orders/' + order._id, {
        action: action,
      });
      listOrders(dispatch);
    } catch (err) {
      alert(err.message);
    }
  };

  const getOrderStatus = (order) => {
    if (order.isDelivered) return 'Delivered';
    if (order.isReady) return 'Ready';
    if (order.inProgress) return 'In Progress';
    return 'Unknown';
  };

  const getStatusStyle = (order) => {
    if (order.isDelivered) {
      return {
        backgroundColor: '#dcfce7',
        color: '#16a34a',
      };
    }

    if (order.isReady) {
      return {
        backgroundColor: '#fee2e2',
        color: '#dc2626',
      };
    }

    if (order.inProgress) {
      return {
        backgroundColor: '#fef3c7',
        color: '#d97706',
      };
    }

    return {
      backgroundColor: '#e5e7eb',
      color: '#374151',
    };
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
      }}
    >
      <Box
        style={{
          background:
            'linear-gradient(135deg, #2563eb 0%, #60a5fa 45%, #e0f2fe 70%, #f8fafc 100%)',
          padding: '24px 35px',
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
                fontWeight: 'bold',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              Admin Order Dashboard
            </Typography>

            <Typography
              variant="h6"
              style={{
                color: '#000000',
                textAlign: 'center',
                marginTop: 6,
              }}
            >
              Manage orders, queue status, and order completion.
            </Typography>
          </Grid>

          <Grid item md={3} sm={12} xs={12}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                onClick={refreshHandler}
                variant="contained"
                startIcon={<RefreshIcon />}
                style={{
                  borderRadius: 14,
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  padding: '12px 20px',
                }}
              >
                Refresh
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        style={{
          padding: 35,
        }}
      >
        <Grid container spacing={3} style={{ marginBottom: 25 }}>
          <Grid item md={4} xs={12}>
            <Paper
              style={{
                borderRadius: 24,
                padding: 24,
                boxShadow: '0 10px 28px rgba(0,0,0,0.10)',
              }}
            >
              <Typography
                variant="body1"
                style={{
                  color: '#6b7280',
                  fontWeight: 'bold',
                }}
              >
                Total Orders
              </Typography>

              <Typography
                variant="h3"
                style={{
                  color: '#111827',
                  fontWeight: 'bold',
                  marginTop: 8,
                }}
              >
                {orders ? orders.length : 0}
              </Typography>
            </Paper>
          </Grid>

          <Grid item md={4} xs={12}>
            <Paper
              style={{
                borderRadius: 24,
                padding: 24,
                boxShadow: '0 10px 28px rgba(0,0,0,0.10)',
              }}
            >
              <Typography
                variant="body1"
                style={{
                  color: '#6b7280',
                  fontWeight: 'bold',
                }}
              >
                In Progress
              </Typography>

              <Typography
                variant="h3"
                style={{
                  color: '#d97706',
                  fontWeight: 'bold',
                  marginTop: 8,
                }}
              >
                {orders ? orders.filter((order) => order.inProgress).length : 0}
              </Typography>
            </Paper>
          </Grid>

          <Grid item md={4} xs={12}>
            <Paper
              style={{
                borderRadius: 24,
                padding: 24,
                boxShadow: '0 10px 28px rgba(0,0,0,0.10)',
              }}
            >
              <Typography
                variant="body1"
                style={{
                  color: '#6b7280',
                  fontWeight: 'bold',
                }}
              >
                Ready Orders
              </Typography>

              <Typography
                variant="h3"
                style={{
                  color: '#dc2626',
                  fontWeight: 'bold',
                  marginTop: 8,
                }}
              >
                {orders ? orders.filter((order) => order.isReady).length : 0}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {loading ? (
          <Box
            style={{
              height: '55vh',
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
          <TableContainer
            component={Paper}
            style={{
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
            }}
          >
            <Table aria-label="Orders">
              <TableHead>
                <TableRow
                  style={{
                    backgroundColor: '#111827',
                  }}
                >
                  <TableCell style={headCellStyle}>Order No.</TableCell>
                  <TableCell style={headCellStyle}>Total</TableCell>
                  <TableCell style={headCellStyle}>Count</TableCell>
                  <TableCell style={headCellStyle}>Items</TableCell>
                  <TableCell style={headCellStyle}>Type</TableCell>
                  <TableCell style={headCellStyle}>Payment</TableCell>
                  <TableCell style={headCellStyle}>Status</TableCell>
                  <TableCell style={headCellStyle} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow key={order._id || order.number}>
                      <TableCell>
                        <Typography
                          variant="h5"
                          style={{
                            fontWeight: 'bold',
                            color: '#dc2626',
                          }}
                        >
                          #{order.number}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          style={{
                            fontWeight: 'bold',
                            color: '#111827',
                          }}
                        >
                          ₱{order.totalPrice}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={`${order.orderItems.length} item(s)`}
                          style={{
                            backgroundColor: '#f3f4f6',
                            fontWeight: 'bold',
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        {order.orderItems.map((item) => (
                          <Box
                            key={item.name}
                            style={{
                              marginBottom: 6,
                              color: '#374151',
                            }}
                          >
                            <strong>{item.name}</strong> × {item.quantity}
                          </Box>
                        ))}
                      </TableCell>

                      <TableCell>
                        <Typography
                          style={{
                            color: '#374151',
                            fontWeight: 'bold',
                          }}
                        >
                          {order.orderType || 'Products'}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          style={{
                            color: '#374151',
                            fontWeight: 'bold',
                          }}
                        >
                          {order.paymentType || 'Counter'}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={getOrderStatus(order)}
                          style={{
                            ...getStatusStyle(order),
                            fontWeight: 'bold',
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Box
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: 8,
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<CheckCircleIcon />}
                            onClick={() =>
                              setOrderStateHandler(order, 'ready')
                            }
                            style={{
                              borderRadius: 12,
                              backgroundColor: '#dc2626',
                              color: '#ffffff',
                              fontWeight: 'bold',
                            }}
                          >
                            Ready
                          </Button>

                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<LocalShippingIcon />}
                            onClick={() =>
                              setOrderStateHandler(order, 'deliver')
                            }
                            style={{
                              borderRadius: 12,
                              backgroundColor: '#16a34a',
                              color: '#ffffff',
                              fontWeight: 'bold',
                            }}
                          >
                            Deliver
                          </Button>

                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<CancelIcon />}
                            onClick={() =>
                              setOrderStateHandler(order, 'cancel')
                            }
                            style={{
                              borderRadius: 12,
                              backgroundColor: '#6b7280',
                              color: '#ffffff',
                              fontWeight: 'bold',
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Box
                        style={{
                          textAlign: 'center',
                          padding: 50,
                        }}
                      >
                        <BuildIcon
                          style={{
                            fontSize: 60,
                            color: '#9ca3af',
                            marginBottom: 10,
                          }}
                        />

                        <Typography
                          variant="h5"
                          style={{
                            color: '#6b7280',
                            fontWeight: 'bold',
                          }}
                        >
                          No orders yet
                        </Typography>

                        <Typography
                          variant="body1"
                          style={{
                            color: '#9ca3af',
                            marginTop: 6,
                          }}
                        >
                          New customer orders will appear here.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

const headCellStyle = {
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: 15,
};
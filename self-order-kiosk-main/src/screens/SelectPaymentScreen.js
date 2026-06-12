import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useContext } from 'react';
import { setPaymentType } from '../actions';
import { Store } from '../Store';
import PaymentIcon from '@material-ui/icons/Payment';
import StorefrontIcon from '@material-ui/icons/Storefront';

export default function SelectPaymentScreen(props) {
  const { dispatch } = useContext(Store);

  const selectHandler = (paymentType) => {
    setPaymentType(dispatch, paymentType);

    if (paymentType === 'Pay here') {
      props.history.push('/payment');
    } else {
      props.history.push('/complete');
    }
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        width: '100%',
        background:
          'linear-gradient(135deg, #2563eb 0%, #60a5fa 45%, #e0f2fe 70%, #f8fafc 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '35px',
        boxSizing: 'border-box',
      }}
    >
      <Box
        style={{
          width: '100%',
          maxWidth: 1100,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          style={{
            color: '#ffffff',
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
          Select Payment Method
        </Typography>

        <Typography
          variant="h6"
          style={{
            color: '#d1d5db',
            marginBottom: 45,
          }}
        >
          Choose how you want to pay for your order.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item md={5} sm={6} xs={12}>
            <Card
              style={{
                borderRadius: 30,
                overflow: 'hidden',
                boxShadow: '0 22px 50px rgba(0,0,0,0.35)',
                backgroundColor: '#ffffff',
              }}
            >
              <CardActionArea onClick={() => selectHandler('Pay here')}>
                <Box
                  style={{
                    height: 280,
                    background:
                      'linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 30,
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="Pay here"
                    image="/images/payhere.png"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      marginBottom: 10,
                    }}
                  />
                </Box>

                <CardContent
                  style={{
                    padding: 32,
                  }}
                >
                  <Box
                    style={{
                      width: 78,
                      height: 78,
                      borderRadius: '50%',
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '-70px auto 20px',
                      border: '5px solid #ffffff',
                      boxShadow: '0 10px 25px rgba(220,38,38,0.35)',
                    }}
                  >
                    <PaymentIcon style={{ fontSize: 40 }} />
                  </Box>

                  <Typography
                    variant="h4"
                    component="h2"
                    style={{
                      fontWeight: 'bold',
                      color: '#111827',
                      marginBottom: 10,
                    }}
                  >
                    Pay Here
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{
                      color: '#6b7280',
                      fontSize: 16,
                      lineHeight: 1.5,
                    }}
                  >
                    Pay directly using the kiosk payment terminal.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item md={5} sm={6} xs={12}>
            <Card
              style={{
                borderRadius: 30,
                overflow: 'hidden',
                boxShadow: '0 22px 50px rgba(0,0,0,0.35)',
                backgroundColor: '#ffffff',
              }}
            >
              <CardActionArea onClick={() => selectHandler('At counter')}>
                <Box
                  style={{
                    height: 280,
                    background:
                      'linear-gradient(135deg, #fee2e2 0%, #ffffff 100%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 30,
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="At counter"
                    image="/images/atcounter.png"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      marginBottom: 10,
                    }}
                  />
                </Box>

                <CardContent
                  style={{
                    padding: 32,
                  }}
                >
                  <Box
                    style={{
                      width: 78,
                      height: 78,
                      borderRadius: '50%',
                      backgroundColor: '#111827',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '-70px auto 20px',
                      border: '5px solid #ffffff',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                    }}
                  >
                    <StorefrontIcon style={{ fontSize: 40 }} />
                  </Box>

                  <Typography
                    variant="h4"
                    component="h2"
                    style={{
                      fontWeight: 'bold',
                      color: '#111827',
                      marginBottom: 10,
                    }}
                  >
                    Pay at Counter
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{
                      color: '#6b7280',
                      fontSize: 16,
                      lineHeight: 1.5,
                    }}
                  >
                    Submit your order now and pay at the cashier counter.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
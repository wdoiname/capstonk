import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PaymentIcon from '@material-ui/icons/Payment';
import { addToOrder, removeFromOrder } from '../actions';
import { Store } from '../Store';

export default function ReviewScreen(props) {
  const { state, dispatch } = useContext(Store);

  const {
    orderItems,
    itemsCount,
    totalPrice,
    taxPrice,
    orderType,
  } = state.order;

  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});

  const closeHandler = () => {
    setIsOpen(false);
  };

  const productClickHandler = (p) => {
    setProduct(p);
    setQuantity(p.quantity || 1);
    setIsOpen(true);
  };

  const addToOrderHandler = () => {
    addToOrder(dispatch, { ...product, quantity });
    setIsOpen(false);
  };

  const cancelOrRemoveFromOrder = () => {
    removeFromOrder(dispatch, product);
    setIsOpen(false);
  };

  const proceedToCheckoutHandler = () => {
    props.history.push('/select-payment');
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        paddingBottom: 120,
      }}
    >
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={isOpen}
        onClose={closeHandler}
        PaperProps={{
          style: {
            borderRadius: 24,
            padding: 20,
          },
        }}
      >
        <DialogTitle style={{ textAlign: 'center' }}>
          <Typography
            variant="h5"
            style={{
              fontWeight: 'bold',
              color: '#111827',
            }}
          >
            Edit {product.name}
          </Typography>

          <Typography
            variant="body2"
            style={{
              color: '#6b7280',
              marginTop: 5,
            }}
          >
            {product.Type ||
              product.type ||
              product.description ||
              'Motorcycle Item'}
          </Typography>
        </DialogTitle>

        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 25,
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: 180,
              height: 150,
              objectFit: 'contain',
            }}
          />
        </Box>

        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 14,
            marginBottom: 25,
          }}
        >
          <Button
            variant="contained"
            disabled={quantity === 1}
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            style={{
              minWidth: 55,
              height: 55,
              borderRadius: '50%',
              backgroundColor: quantity === 1 ? '#d1d5db' : '#111827',
              color: '#ffffff',
            }}
          >
            <RemoveIcon />
          </Button>

          <TextField
            inputProps={{
              style: {
                textAlign: 'center',
                fontSize: 32,
                fontWeight: 'bold',
              },
              min: 1,
            }}
            style={{
              width: 90,
            }}
            type="number"
            variant="outlined"
            value={quantity}
            onChange={(e) => {
              const value = Number(e.target.value);
              setQuantity(value < 1 ? 1 : value);
            }}
          />

          <Button
            variant="contained"
            onClick={() => setQuantity(quantity + 1)}
            style={{
              minWidth: 55,
              height: 55,
              borderRadius: '50%',
              backgroundColor: '#dc2626',
              color: '#ffffff',
            }}
          >
            <AddIcon />
          </Button>
        </Box>

        <Typography
          variant="h5"
          style={{
            textAlign: 'center',
            color: '#dc2626',
            fontWeight: 'bold',
            marginBottom: 25,
          }}
        >
          ₱{product.price}
        </Typography>

        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 15,
          }}
        >
          <Button
            onClick={cancelOrRemoveFromOrder}
            variant="contained"
            size="large"
            fullWidth
            style={{
              borderRadius: 14,
              padding: 14,
              backgroundColor: '#6b7280',
              color: '#ffffff',
              fontWeight: 'bold',
            }}
          >
            Remove
          </Button>

          <Button
            onClick={addToOrderHandler}
            variant="contained"
            size="large"
            fullWidth
            style={{
              borderRadius: 14,
              padding: 14,
              backgroundColor: '#dc2626',
              color: '#ffffff',
              fontWeight: 'bold',
            }}
          >
            Update Order
          </Button>
        </Box>
      </Dialog>

      <Box
        style={{
          background:
            'linear-gradient(135deg, #2563eb 0%, #60a5fa 45%, #e0f2fe 70%, #f8fafc 100%)',
          padding: '45px 30px 55px',
          color: '#ffffff',
          textAlign: 'center',
          borderBottomLeftRadius: 36,
          borderBottomRightRadius: 36,
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          style={{
            color: '#000000',
            fontWeight: 'bold',
          }}
        >
          Review Your Order
        </Typography>

        <Typography
          variant="h6"
          style={{
            color: '#000000',
            marginTop: 10,
          }}
        >
          Check your selected motorcycle parts or services before checkout.
        </Typography>
      </Box>

      <Box
        style={{
          maxWidth: 1050,
          margin: '-25px auto 0',
          padding: '0 24px',
        }}
      >
        <Box
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 24,
            padding: '22px 26px',
            marginBottom: 25,
            boxShadow: '0 10px 28px rgba(0,0,0,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              style={{
                fontWeight: 'bold',
                color: '#111827',
              }}
            >
              {orderType || 'Products'} Order Summary
            </Typography>

            <Typography
              variant="body1"
              style={{
                color: '#6b7280',
                marginTop: 4,
              }}
            >
              Tap an item to edit quantity or remove it.
            </Typography>
          </Box>

          <Box
            style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '12px 18px',
              borderRadius: 18,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <ShoppingCartIcon />
            {itemsCount} item(s)
          </Box>
        </Box>

        <Grid container spacing={3}>
          {orderItems.length === 0 ? (
            <Grid item xs={12}>
              <Box
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 24,
                  padding: 45,
                  textAlign: 'center',
                  boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    color: '#6b7280',
                    fontWeight: 'bold',
                  }}
                >
                  Your order is empty.
                </Typography>

                <Typography
                  variant="body1"
                  style={{
                    color: '#9ca3af',
                    marginTop: 8,
                  }}
                >
                  Go back and add motorcycle parts or services to continue.
                </Typography>
              </Box>
            </Grid>
          ) : (
            orderItems.map((orderItem) => (
              <Grid item md={12} xs={12} key={orderItem.name}>
                <Card
                  onClick={() => productClickHandler(orderItem)}
                  style={{
                    borderRadius: 22,
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                    cursor: 'pointer',
                  }}
                >
                  <CardActionArea>
                    <CardContent
                      style={{
                        padding: 20,
                      }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item md={2} sm={3} xs={12}>
                          <Box
                            style={{
                              height: 120,
                              backgroundColor: '#f9fafb',
                              borderRadius: 18,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 10,
                            }}
                          >
                            <img
                              src={orderItem.image}
                              alt={orderItem.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                              }}
                            />
                          </Box>
                        </Grid>

                        <Grid item md={5} sm={5} xs={12}>
                          <Typography
                            variant="caption"
                            style={{
                              color: '#dc2626',
                              fontWeight: 'bold',
                              textTransform: 'uppercase',
                              letterSpacing: 0.7,
                            }}
                          >
                            {orderItem.category}
                          </Typography>

                          <Typography
                            variant="h5"
                            style={{
                              fontWeight: 'bold',
                              color: '#111827',
                              marginTop: 5,
                            }}
                          >
                            {orderItem.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            style={{
                              color: '#6b7280',
                              marginTop: 5,
                            }}
                          >
                            {orderItem.Type ||
                              orderItem.type ||
                              orderItem.description ||
                              'Motorcycle Item'}
                          </Typography>
                        </Grid>

                        <Grid item md={3} sm={2} xs={6}>
                          <Typography
                            variant="body2"
                            style={{
                              color: '#6b7280',
                            }}
                          >
                            Quantity
                          </Typography>

                          <Typography
                            variant="h5"
                            style={{
                              fontWeight: 'bold',
                              color: '#111827',
                            }}
                          >
                            {orderItem.quantity} × ₱{orderItem.price}
                          </Typography>
                        </Grid>

                        <Grid item md={2} sm={2} xs={6}>
                          <Typography
                            variant="body2"
                            style={{
                              color: '#6b7280',
                            }}
                          >
                            Subtotal
                          </Typography>

                          <Typography
                            variant="h5"
                            style={{
                              fontWeight: 'bold',
                              color: '#dc2626',
                            }}
                          >
                            ₱{orderItem.quantity * orderItem.price}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Box
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginTop: 12,
                        }}
                      >
                        <Button
                          variant="contained"
                          style={{
                            borderRadius: 20,
                            backgroundColor: '#111827',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            padding: '7px 18px',
                          }}
                        >
                          Edit
                        </Button>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Box
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e5e7eb',
          boxShadow: '0 -8px 24px rgba(0,0,0,0.12)',
          padding: '14px 28px',
          zIndex: 10,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item md={7} sm={12} xs={12}>
            <Box
              style={{
                backgroundColor: '#f9fafb',
                borderRadius: 16,
                padding: '14px 18px',
                fontWeight: 'bold',
                color: '#111827',
              }}
            >
              My Order - {orderType || 'Products'} | Tax: ₱{taxPrice || 0} |
              Total: ₱{totalPrice || 0} | Items: {itemsCount || 0}
            </Box>
          </Grid>

          <Grid item md={5} sm={12} xs={12}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 14,
              }}
            >
              <Button
                onClick={() => {
                  props.history.push('/order');
                }}
                variant="contained"
                size="large"
                startIcon={<ArrowBackIcon />}
                style={{
                  borderRadius: 14,
                  backgroundColor: '#6b7280',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  padding: '12px 26px',
                }}
              >
                Back
              </Button>

              <Button
                onClick={proceedToCheckoutHandler}
                variant="contained"
                size="large"
                disabled={orderItems.length === 0}
                startIcon={<PaymentIcon />}
                style={{
                  borderRadius: 14,
                  backgroundColor:
                    orderItems.length === 0 ? '#d1d5db' : '#dc2626',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  padding: '12px 30px',
                }}
              >
                Proceed To Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
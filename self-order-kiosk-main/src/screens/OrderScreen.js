import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useContext, useEffect, useState } from 'react';

import {
  addToOrder,
  clearOrder,
  listCategories,
  listProducts,
  listServiceCategories,
  listServices,
  removeFromOrder,
} from '../actions';

import { Store } from '../Store';

export default function OrderScreen(props) {
  const { state, dispatch } = useContext(Store);

  const {
    orderItems,
    itemsCount,
    totalPrice,
    orderType,
  } = state.order;

  const isServiceMode = orderType === 'Services';

  const [categoryName, setCategoryName] = useState(
    isServiceMode ? 'Maintenance' : 'Parts'
  );
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const { categories, loading, error } = state.categoryList;

  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = state.productList;

  const {
    serviceCategories,
    loading: loadingServiceCategories,
    error: errorServiceCategories,
  } = state.serviceCategoryList;

  const {
    services,
    loading: loadingServices,
    error: errorServices,
  } = state.serviceList;

  useEffect(() => {
    if (isServiceMode) {
      if (!serviceCategories) {
        listServiceCategories(dispatch);
      } else {
        listServices(dispatch, categoryName);
      }
    } else {
      if (!categories) {
        listCategories(dispatch);
      } else {
        listProducts(dispatch, categoryName);
      }
    }
  }, [
    dispatch,
    categories,
    serviceCategories,
    categoryName,
    isServiceMode,
  ]);

  useEffect(() => {
    if (isServiceMode) {
      setCategoryName('Maintenance');
      listServiceCategories(dispatch);
      listServices(dispatch, 'Maintenance');
    } else {
      setCategoryName('Parts');
      listCategories(dispatch);
      listProducts(dispatch, 'Parts');
    }
  }, [dispatch, isServiceMode]);

  const closeHandler = () => {
    setIsOpen(false);
  };

  const itemClickHandler = (item) => {
    if (!isServiceMode && item.stock <= 0) {
      return;
    }

    setSelectedItem(item);
    setQuantity(1);
    setIsOpen(true);
  };

  const addToOrderHandler = () => {
    if (!isServiceMode && quantity > selectedItem.stock) {
      alert(`Only ${selectedItem.stock} stock available for ${selectedItem.name}`);
      return;
    }

    addToOrder(dispatch, {
      ...selectedItem,
      quantity,
      itemType: isServiceMode ? 'Service' : 'Product',
      service: isServiceMode ? selectedItem._id : undefined,
      serviceId: isServiceMode ? selectedItem._id : undefined,
      product: !isServiceMode ? selectedItem._id : undefined,
      productId: !isServiceMode ? selectedItem._id : undefined,
    });

    setIsOpen(false);
  };

  const cancelOrRemoveFromOrder = () => {
    removeFromOrder(dispatch, selectedItem);
    setIsOpen(false);
  };

  const categoryClickHandler = (name) => {
    setCategoryName(name);

    if (isServiceMode) {
      listServices(dispatch, name);
    } else {
      listProducts(dispatch, name);
    }
  };

  const previewOrderHandler = () => {
    props.history.push('/review');
  };

  const currentCategories = isServiceMode ? serviceCategories : categories;
  const currentLoadingCategories = isServiceMode
    ? loadingServiceCategories
    : loading;
  const currentErrorCategories = isServiceMode
    ? errorServiceCategories
    : error;

  const currentItems = isServiceMode ? services : products;
  const currentLoadingItems = isServiceMode ? loadingServices : loadingProducts;
  const currentErrorItems = isServiceMode ? errorServices : errorProducts;

  return (
    <Box
      style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        flexDirection: 'column',
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
            Add {selectedItem.name}
          </Typography>

          <Typography
            variant="body2"
            style={{
              color: '#6b7280',
              marginTop: 5,
            }}
          >
            {isServiceMode
              ? selectedItem.description || 'Motorcycle Service'
              : selectedItem.Type || selectedItem.type || 'Motorcycle Part'}
          </Typography>

          {!isServiceMode && (
            <Typography
              variant="body2"
              style={{
                color: selectedItem.stock > 0 ? '#16a34a' : '#dc2626',
                fontWeight: 'bold',
                marginTop: 8,
              }}
            >
              Stock Available: {selectedItem.stock || 0}
            </Typography>
          )}
        </DialogTitle>

        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 25,
          }}
        >
          <img
            src={selectedItem.image}
            alt={selectedItem.name}
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
              max: isServiceMode ? 99 : selectedItem.stock || 1,
            }}
            style={{
              width: 90,
            }}
            type="number"
            variant="outlined"
            value={quantity}
            onChange={(e) => {
              const value = Number(e.target.value);
              const maxValue = isServiceMode ? 99 : selectedItem.stock || 1;

              if (value < 1) {
                setQuantity(1);
              } else if (value > maxValue) {
                setQuantity(maxValue);
              } else {
                setQuantity(value);
              }
            }}
          />

          <Button
            variant="contained"
            disabled={!isServiceMode && quantity >= selectedItem.stock}
            onClick={() => {
              if (isServiceMode || quantity < selectedItem.stock) {
                setQuantity(quantity + 1);
              }
            }}
            style={{
              minWidth: 55,
              height: 55,
              borderRadius: '50%',
              backgroundColor:
                !isServiceMode && quantity >= selectedItem.stock
                  ? '#d1d5db'
                  : '#dc2626',
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
          ₱{selectedItem.price}
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
            {orderItems.find((x) => x.name === selectedItem.name)
              ? 'Remove'
              : 'Cancel'}
          </Button>

          <Button
            onClick={addToOrderHandler}
            variant="contained"
            size="large"
            fullWidth
            disabled={!isServiceMode && selectedItem.stock <= 0}
            style={{
              borderRadius: 14,
              padding: 14,
              backgroundColor:
                !isServiceMode && selectedItem.stock <= 0
                  ? '#9ca3af'
                  : '#dc2626',
              color: '#ffffff',
              fontWeight: 'bold',
            }}
          >
            {!isServiceMode && selectedItem.stock <= 0
              ? 'Out of Stock'
              : 'Add To Order'}
          </Button>
        </Box>
      </Dialog>

      <Box
        style={{
          flex: 1,
          display: 'flex',
        }}
      >
        <Grid container>
          <Grid
            item
            md={2}
            sm={3}
            xs={12}
            style={{
              background: 'linear-gradient(180deg, #2563eb 0%, #fdfdfd 100%)',
              minHeight: '100vh',
              padding: 18,
              boxShadow: '4px 0 18px rgba(0,0,0,0.18)',
            }}
          >
            <List>
              {currentLoadingCategories ? (
                <Box style={{ textAlign: 'center', marginTop: 30 }}>
                  <CircularProgress />
                </Box>
              ) : currentErrorCategories ? (
                <Alert severity="error">{currentErrorCategories}</Alert>
              ) : (
                <>
                  <ListItem
                    button
                    onClick={() =>
                      categoryClickHandler(isServiceMode ? 'Maintenance' : 'Parts')
                    }
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: 25,
                    }}
                  >
                    <Box
                      style={{
                        textAlign: 'center',
                        width: '100%',
                      }}
                    >
                      <img
                        src="/images/logo1.png"
                        alt="Citibikes Logo"
                        style={{
                          width: 230,
                          maxWidth: '100%',
                          height: 'auto',
                          objectFit: 'contain',
                          marginBottom: 18,
                        }}
                      />

                      <Typography
                        variant="h6"
                        style={{
                          color: '#ffffff',
                          fontWeight: 'bold',
                          marginBottom: 10,
                          letterSpacing: 1,
                        }}
                      >
                        {isServiceMode ? 'Service Categories' : 'Categories'}
                      </Typography>
                    </Box>
                  </ListItem>

                  {currentCategories &&
                    currentCategories.map((category) => (
                      <ListItem
                        button
                        key={category.name}
                        onClick={() => categoryClickHandler(category.name)}
                        style={{
                          marginBottom: 14,
                          borderRadius: 16,
                          backgroundColor:
                            categoryName === category.name
                              ? '#dc2626'
                              : 'rgba(255,255,255,0.08)',
                          color: '#ffffff',
                          padding: '12px 10px',
                          transition: '0.2s ease',
                        }}
                      >
                        <Avatar
                          alt={category.name}
                          src={category.image}
                          style={{
                            width: 46,
                            height: 46,
                            marginRight: 12,
                            backgroundColor: '#ffffff',
                            border: '2px solid #ffffff',
                          }}
                        />

                        <Typography
                          style={{
                            fontWeight: 'bold',
                            fontSize: 14,
                          }}
                        >
                          {category.name}
                        </Typography>
                      </ListItem>
                    ))}
                </>
              )}
            </List>
          </Grid>

          <Grid item md={10} sm={9} xs={12}>
            <Box
              style={{
                padding: '28px 32px 120px',
              }}
            >
              <Box
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 24,
                  padding: '24px 28px',
                  marginBottom: 28,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 20,
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    component="h1"
                    style={{
                      fontWeight: 'bold',
                      color: '#111827',
                    }}
                  >
                    {categoryName || (isServiceMode ? 'Services' : 'Motorcycle Parts')}
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{
                      color: '#6b7280',
                      marginTop: 5,
                    }}
                  >
                    {isServiceMode
                      ? 'Select motorcycle services and add them to your request.'
                      : 'Select parts and add them to your order.'}
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
                {currentLoadingItems ? (
                  <Box
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      marginTop: 60,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : currentErrorItems ? (
                  <Alert severity="error">{currentErrorItems}</Alert>
                ) : currentItems && currentItems.length === 0 ? (
                  <Box
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      marginTop: 60,
                    }}
                  >
                    <Typography variant="h5" style={{ color: '#6b7280' }}>
                      No {isServiceMode ? 'services' : 'products'} found in this category.
                    </Typography>
                  </Box>
                ) : (
                  currentItems &&
                  currentItems.map((item) => (
                    <Grid item md={3} sm={6} xs={12} key={item._id}>
                      <Card
                        onClick={() => itemClickHandler(item)}
                        style={{
                          height: '100%',
                          borderRadius: 24,
                          overflow: 'hidden',
                          cursor:
                            !isServiceMode && item.stock <= 0
                              ? 'not-allowed'
                              : 'pointer',
                          opacity:
                            !isServiceMode && item.stock <= 0 ? 0.65 : 1,
                          boxShadow: '0 10px 28px rgba(0,0,0,0.12)',
                          transition: '0.2s ease',
                          backgroundColor: '#ffffff',
                        }}
                      >
                        <CardActionArea
                          disabled={!isServiceMode && item.stock <= 0}
                        >
                          <Box
                            style={{
                              height: 190,
                              backgroundColor: '#f9fafb',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 16,
                            }}
                          >
                            <CardMedia
                              component="img"
                              alt={item.name}
                              image={item.image}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                              }}
                            />
                          </Box>
                        </CardActionArea>

                        <CardContent
                          style={{
                            padding: 18,
                          }}
                        >
                          <Typography
                            variant="caption"
                            style={{
                              color: '#dc2626',
                              fontWeight: 'bold',
                              letterSpacing: 0.7,
                              textTransform: 'uppercase',
                            }}
                          >
                            {item.category}
                          </Typography>

                          <Typography
                            gutterBottom
                            variant="h6"
                            style={{
                              fontWeight: 'bold',
                              color: '#111827',
                              minHeight: 55,
                              marginTop: 6,
                            }}
                          >
                            {item.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            style={{
                              color: '#6b7280',
                              minHeight: 44,
                              marginBottom: 8,
                            }}
                          >
                            {isServiceMode
                              ? item.description || 'Motorcycle Service'
                              : item.Type || item.type || 'Motorcycle Part'}
                          </Typography>

                          {!isServiceMode && (
                            <Typography
                              variant="body2"
                              style={{
                                color: item.stock > 0 ? '#16a34a' : '#dc2626',
                                fontWeight: 'bold',
                                marginBottom: 12,
                              }}
                            >
                              {item.stock > 0
                                ? `Stock: ${item.stock}`
                                : 'Out of Stock'}
                            </Typography>
                          )}

                          {isServiceMode && (
                            <Typography
                              variant="body2"
                              style={{
                                color: '#16a34a',
                                fontWeight: 'bold',
                                marginBottom: 12,
                              }}
                            >
                              Service Available
                            </Typography>
                          )}

                          <Box
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: 12,
                            }}
                          >
                            <Typography
                              variant="h5"
                              style={{
                                color: '#dc2626',
                                fontWeight: 'bold',
                              }}
                            >
                              ₱{item.price}
                            </Typography>

                            <Button
                              variant="contained"
                              size="small"
                              disabled={!isServiceMode && item.stock <= 0}
                              style={{
                                borderRadius: 20,
                                backgroundColor:
                                  !isServiceMode && item.stock <= 0
                                    ? '#9ca3af'
                                    : '#111827',
                                color: '#ffffff',
                                fontWeight: 'bold',
                                padding: '7px 16px',
                              }}
                            >
                              {!isServiceMode && item.stock <= 0
                                ? 'Out'
                                : 'Add'}
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            </Box>
          </Grid>
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
              My Order - {orderType || 'Products'} Total:
              ₱{totalPrice || 0} | Items: {itemsCount || 0}
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
                  clearOrder(dispatch);
                  props.history.push('/');
                }}
                variant="contained"
                size="large"
                style={{
                  borderRadius: 14,
                  backgroundColor: '#6b7280',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  padding: '12px 26px',
                }}
              >
                Cancel Order
              </Button>

              <Button
                onClick={previewOrderHandler}
                variant="contained"
                size="large"
                disabled={orderItems.length === 0}
                style={{
                  borderRadius: 14,
                  backgroundColor:
                    orderItems.length === 0 ? '#d1d5db' : '#dc2626',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  padding: '12px 36px',
                }}
              >
                Done
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
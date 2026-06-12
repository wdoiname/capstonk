import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade,
  Typography,
} from '@material-ui/core';
import React, { useContext } from 'react';
import BuildIcon from '@material-ui/icons/Build';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { setOrderType } from '../actions';
import { Store } from '../Store';

export default function ChooseScreen(props) {
  const { dispatch } = useContext(Store);

  const chooseHandler = (orderType) => {
    setOrderType(dispatch, orderType);
    props.history.push('/order');
  };

  const cardStyle = {
    borderRadius: 28,
    overflow: 'hidden',
    boxShadow: '0 20px 45px rgba(0,0,0,0.25)',
    backgroundColor: '#ffffff',
    height: '100%',
  };

  const actionAreaStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const imageBoxStyle = {
    height: 260,
    background: 'linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };

  const contentStyle = {
    padding: 30,
    flex: 1,
  };

  const iconCircleStyle = {
    width: 70,
    height: 70,
    borderRadius: '50%',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '-65px auto 18px',
    border: '5px solid #ffffff',
    boxShadow: '0 8px 18px rgba(0,0,0,0.25)',
  };

  return (
    <Fade in={true}>
      <Box
        style={{
          minHeight: '100vh',
          width: '100%',
          background:
            'linear-gradient(135deg, #2563eb 0%, #60a5fa 45%, #e0f2fe 70%, #f8fafc 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px 30px',
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
              marginBottom: 8,
              textShadow: '0 3px 8px rgba(0,0,0,0.25)',
            }}
          >
            What can we help you with?
          </Typography>

          <Typography
            variant="h6"
            style={{
              color: '#f8fafc',
              marginBottom: 35,
              textShadow: '0 2px 6px rgba(0,0,0,0.20)',
            }}
          >
            Choose whether you want to browse motorcycle parts or request services.
          </Typography>

          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 32,
              width: '100%',
              alignItems: 'stretch',
            }}
          >
            <Card style={cardStyle}>
              <CardActionArea
                onClick={() => chooseHandler('Products')}
                style={actionAreaStyle}
              >
                <Box style={imageBoxStyle}>
                  <CardMedia
                    component="img"
                    alt="Motorcycle Products"
                    image="/images/product.png"
                    style={imageStyle}
                  />
                </Box>

                <CardContent style={contentStyle}>
                  <Box
                    style={{
                      ...iconCircleStyle,
                      backgroundColor: '#111827',
                    }}
                  >
                    <ShoppingCartIcon style={{ fontSize: 34 }} />
                  </Box>

                  <Typography
                    variant="h4"
                    component="h2"
                    style={{
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: 10,
                    }}
                  >
                    Products
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{
                      color: '#0f0b0b',
                      fontSize: 16,
                    }}
                  >
                    Browse parts, tires, wheels, oils, fluids, and motorcycle accessories.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card style={cardStyle}>
              <CardActionArea
                onClick={() => chooseHandler('Services')}
                style={actionAreaStyle}
              >
                <Box style={imageBoxStyle}>
                  <CardMedia
                    component="img"
                    alt="Motorcycle Services"
                    image="/images/services.png"
                    style={imageStyle}
                  />
                </Box>

                <CardContent style={contentStyle}>
                  <Box
                    style={{
                      ...iconCircleStyle,
                      backgroundColor: '#111827',
                    }}
                  >
                    <BuildIcon style={{ fontSize: 34 }} />
                  </Box>

                  <Typography
                    variant="h4"
                    component="h2"
                    style={{
                      fontWeight: 'bold',
                      color: '#000000',
                      marginBottom: 10,
                    }}
                  >
                    Services
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{
                      color: '#0f0b0b',
                      fontSize: 16,
                    }}
                  >
                    Request maintenance, repair, installation, and motorcycle checkup services.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}
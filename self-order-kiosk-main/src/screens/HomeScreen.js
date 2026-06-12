import React from 'react';
import { Box, CardActionArea, Typography } from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';

export default function HomeScreen(props) {
  return (
    <>
      <style>
        {`
          @keyframes touchMove {
            0% {
              transform: translateY(0) scale(1);
              box-shadow: 0 12px 30px rgba(0,0,0,0.25);
            }
            50% {
              transform: translateY(-12px) scale(1.05);
              box-shadow: 0 20px 40px rgba(0,0,0,0.35);
            }
            100% {
              transform: translateY(0) scale(1);
              box-shadow: 0 12px 30px rgba(0,0,0,0.25);
            }
          }

          @keyframes iconPulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.18);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>

      <Box
        style={{
          minHeight: '100vh',
          width: '100%',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
         backgroundImage:
  'url("/images/logo1.png"), linear-gradient(135deg, #2563eb 0%, #60a5fa 45%, #e0f2fe 70%, #f8fafc 100%)',
backgroundSize: 'contain, cover',
backgroundPosition: 'center 35%, center',
backgroundRepeat: 'no-repeat, no-repeat',
        }}
      >
        <CardActionArea
          onClick={() => props.history.push('/choose')}
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'column',
            paddingBottom: 70,
            boxSizing: 'border-box',
          }}
        >
          <Box
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              padding: '18px 38px',
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              animation: 'touchMove 1.6s ease-in-out infinite',
            }}
          >
            <TouchAppIcon
              style={{
                fontSize: 60,
                color: '#dc2626',
                animation: 'iconPulse 1.2s ease-in-out infinite',
              }}
            />

            <Typography
              variant="h4"
              component="h1"
              style={{
                fontWeight: 'bold',
                color: '#111827',
                letterSpacing: 1,
              }}
            >
              Touch to Start
            </Typography>
          </Box>
        </CardActionArea>
      </Box>
    </>
  );
}
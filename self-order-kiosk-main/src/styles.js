import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#f3f4f6',
  },

  main: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
  },

  navy: {
    background:
      'linear-gradient(135deg, #07111f 0%, #111827 55%, #991b1b 100%)',
    color: '#ffffff',
  },

  sidebar: {
    background: 'linear-gradient(180deg, #07111f 0%, #111827 100%)',
    color: '#ffffff',
    minHeight: '100vh',
    padding: 20,
    boxShadow: '4px 0 18px rgba(0,0,0,0.18)',
  },

  logo: {
    width: 160,
    height: 160,
    objectFit: 'contain',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 18,
  },

  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },

  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 32,
    width: '100%',
    maxWidth: 1100,
    margin: '0 auto',
  },

  card: {
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    boxShadow: '0 14px 35px rgba(0,0,0,0.16)',
    cursor: 'pointer',
  },

  productCard: {
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 28px rgba(0,0,0,0.12)',
    transition: '0.2s ease',
    cursor: 'pointer',

    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
    },
  },

  media: {
    height: 220,
    objectFit: 'contain',
    padding: 16,
    backgroundColor: '#f9fafb',
  },

  productImage: {
    width: '100%',
    height: 190,
    objectFit: 'contain',
  },

  productName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#111827',
    marginTop: 10,
  },

  productPrice: {
    color: '#dc2626',
    fontWeight: 'bold',
    fontSize: 22,
  },

  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  addButton: {
    backgroundColor: '#111827',
    color: '#ffffff',
    borderRadius: 20,
    padding: '8px 18px',
    fontWeight: 'bold',

    '&:hover': {
      backgroundColor: '#dc2626',
    },
  },

  menuButton: {
    width: '100%',
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',

    '&:hover': {
      backgroundColor: '#dc2626',
    },
  },

  orderBox: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 22,
    minHeight: '90vh',
    boxShadow: '0 10px 28px rgba(0,0,0,0.10)',
  },

  row: {
    display: 'flex',
    alignItems: 'center',
  },

  column: {
    display: 'flex',
    flexDirection: 'column',
  },

  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  between: {
    justifyContent: 'space-between',
    width: '100%',
  },

  around: {
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },

  largeButton: {
    padding: '12px 24px',
    borderRadius: 14,
    fontWeight: 'bold',
  },

  largeInput: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  largeNumber: {
    width: 100,
    margin: '0 12px',
  },

  bordered: {
    borderTop: '1px solid #e5e7eb',
    padding: 14,
    backgroundColor: '#ffffff',
    fontWeight: 'bold',
  },

  space: {
    marginTop: 14,
  },

  green: {
    color: '#16a34a',
    fontWeight: 'bold',
  },

  danger: {
    color: '#dc2626',
    fontWeight: 'bold',
  },

  muted: {
    color: '#6b7280',
  },
});

export default useStyles;
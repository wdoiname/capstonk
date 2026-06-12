const data = {
  categories: [
    {
      name: 'Parts',
      image: '/images/yamaha.jpg',
    },
    {
      name: 'Tires & Wheels',
      image: '/images/pirelli.jpg',
    },
    {
      name: 'Oils & Fluids',
      image: '/images/coolant.jpg',
    },
  ],

  products: [
    {
      category: 'Parts',
      name: 'Brake Pad',
      price: 2,
      image: '/images/yamaha.jpg',
      Type: 'Sintered or Ceramic',
      stock: 10,
    },
    {
      category: 'Parts',
      name: 'Spark Plug (NGK)',
      price: 1.9,
      image: '/images/sparkplug.jpg',
      Type: 'Iridium or Platinum',
      stock: 10,
    },
    {
      category: 'Parts',
      name: 'DID Drive Chain',
      price: 1.5,
      image: '/images/drivechaine.jpg',
      Type: '520 Series',
      stock: 10,
    },
    {
      category: 'Tires & Wheels',
      name: 'Pirelli Diablo Rosso',
      price: 3,
      image: '/images/pirelli.jpg',
      Type: 'Radial',
      stock: 10,
    },
    {
      category: 'Tires & Wheels',
      name: 'Michelin Pilot Street',
      price: 1.9,
      image: '/images/michelin.jpg',
      Type: 'Tubeless',
      stock: 10,
    },
    {
      category: 'Oils & Fluids',
      name: 'Engine Ice Coolant',
      price: 1.5,
      image: '/images/coolant.jpg',
      Type: 'High Performance',
      stock: 10,
    },
    {
      category: 'Oils & Fluids',
      name: 'Brembo DOT 4',
      price: 3,
      image: '/images/Dot4.jpg',
      Type: 'Brake Fluid',
      stock: 10,
    },
  ],

  serviceCategories: [
    {
      name: 'Maintenance',
      image: '/images/services.png',
    },
    {
      name: 'Cleaning',
      image: '/images/services.png',
    },
    {
      name: 'Brake Service',
      image: '/images/services.png',
    },
    {
      name: 'Installation',
      image: '/images/services.png',
    },
    {
      name: 'Electrical',
      image: '/images/services.png',
    },
    {
      name: 'Inspection',
      image: '/images/services.png',
    },
  ],

  services: [
    {
      name: 'CVT Cleaning',
      description: 'Cleaning of CVT system for scooter motorcycles.',
      price: 350,
      image: '/images/cvt-cleaning.jpg',
      category: 'Cleaning',
    },
    {
      name: 'Change Oil',
      description: 'Motorcycle engine oil replacement service.',
      price: 150,
      image: '/images/change-oil.jpg',
      category: 'Maintenance',
    },
    {
      name: 'Tune Up',
      description: 'Basic motorcycle tune up and inspection.',
      price: 300,
      image: '/images/tune-up.jpg',
      category: 'Maintenance',
    },
    {
      name: 'Brake Cleaning',
      description: 'Cleaning and checking of front or rear brake system.',
      price: 200,
      image: '/images/brake-cleaning.jpg',
      category: 'Brake Service',
    },
    {
      name: 'Chain Cleaning',
      description: 'Chain cleaning and lubrication service.',
      price: 150,
      image: '/images/chain-cleaning.jpg',
      category: 'Cleaning',
    },
    {
      name: 'Tire Installation',
      description: 'Installation service for motorcycle tires.',
      price: 250,
      image: '/images/tire-installation.jpg',
      category: 'Installation',
    },
    {
      name: 'Battery Check',
      description: 'Battery testing and electrical checkup.',
      price: 100,
      image: '/images/battery-check.jpg',
      category: 'Electrical',
    },
    {
      name: 'General Checkup',
      description: 'Overall motorcycle condition inspection.',
      price: 200,
      image: '/images/general-checkup.jpg',
      category: 'Inspection',
    },
  ],
};

module.exports = data;
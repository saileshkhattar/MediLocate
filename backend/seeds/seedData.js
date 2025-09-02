// seeds/seedData.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import your models (adjust paths as needed)
const Pharmacy = require('../models/PharmacySchema');
const PharmacyProfile = require('../models/PharmacyProfile');
const Product = require('../models/Product');

require("dotenv").config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URL, {
    });
    console.log('MongoDB connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Hash password function
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Pharmacy seed data
const pharmaciesData = [
  {
    email: 'apollo.connaught@pharmacy.com',
    name: 'Dr. Rajesh Kumar',
    pharmacyName: 'Apollo Pharmacy',
    address: 'A-15, Connaught Place, New Delhi - 110001',
    phoneNumber: '9876543210',
    gstNumber: '07APLAA1234A1Z5',
    licenseNumber: 'DL-APL-2023-001'
  },
  {
    email: 'medplus.dlf@pharmacy.com',
    name: 'Dr. Priya Sharma',
    pharmacyName: 'MedPlus Pharmacy',
    address: 'Shop 23, DLF Phase 1, Gurugram, Haryana - 122002',
    phoneNumber: '9876543211',
    gstNumber: '06MEDAA5678B2Z6',
    licenseNumber: 'HR-MED-2023-002'
  },
  {
    email: 'wellness.vasant@pharmacy.com',
    name: 'Dr. Amit Patel',
    pharmacyName: 'Wellness Pharmacy',
    address: 'B-4/5, Vasant Vihar, New Delhi - 110057',
    phoneNumber: '9876543212',
    gstNumber: '07WELAB9012C3Z7',
    licenseNumber: 'DL-WEL-2023-003'
  },
  {
    email: 'healthkart.karolbagh@pharmacy.com',
    name: 'Dr. Sunita Singh',
    pharmacyName: 'HealthKart Pharmacy',
    address: '145, Karol Bagh Market, New Delhi - 110005',
    phoneNumber: '9876543213',
    gstNumber: '07HLTAA3456D4Z8',
    licenseNumber: 'DL-HLT-2023-004'
  },
  {
    email: 'netmeds.noida@pharmacy.com',
    name: 'Dr. Vikram Gupta',
    pharmacyName: 'Netmeds Pharmacy',
    address: 'C-56, Sector 62, Noida, Uttar Pradesh - 201301',
    phoneNumber: '9876543214',
    gstNumber: '09NETAA7890E5Z9',
    licenseNumber: 'UP-NET-2023-005'
  },
  {
    email: 'pharmeasy.lajpat@pharmacy.com',
    name: 'Dr. Neha Agarwal',
    pharmacyName: 'PharmEasy Store',
    address: '78, Lajpat Nagar Central Market, New Delhi - 110024',
    phoneNumber: '9876543215',
    gstNumber: '07PHRAB2345F6Z1',
    licenseNumber: 'DL-PHR-2023-006'
  },
  {
    email: 'lifecare.rohini@pharmacy.com',
    name: 'Dr. Ramesh Chandra',
    pharmacyName: 'LifeCare Pharmacy',
    address: 'Shop 12, Sector 7, Rohini, New Delhi - 110085',
    phoneNumber: '9876543216',
    gstNumber: '07LIFAA6789G7Z2',
    licenseNumber: 'DL-LIF-2023-007'
  },
  {
    email: 'medstore.faridabad@pharmacy.com',
    name: 'Dr. Kavita Jain',
    pharmacyName: 'MedStore Plus',
    address: 'SCF-45, Sector 16A, Faridabad, Haryana - 121002',
    phoneNumber: '9876543217',
    gstNumber: '06MEDAA1357H8Z3',
    licenseNumber: 'HR-MED-2023-008'
  },
  {
    email: 'quickmed.dwarka@pharmacy.com',
    name: 'Dr. Arjun Malhotra',
    pharmacyName: 'QuickMed Pharmacy',
    address: 'Plot 89, Sector 12, Dwarka, New Delhi - 110075',
    phoneNumber: '9876543218',
    gstNumber: '07QUIAA9876I9Z4',
    licenseNumber: 'DL-QUI-2023-009'
  },
  {
    email: 'careplus.ghaziabad@pharmacy.com',
    name: 'Dr. Manisha Verma',
    pharmacyName: 'CarePlus Pharmacy',
    address: 'G-34, Raj Nagar, Ghaziabad, Uttar Pradesh - 201002',
    phoneNumber: '9876543219',
    gstNumber: '09CARAA4567J1Z5',
    licenseNumber: 'UP-CAR-2023-010'
  }
];

// Products seed data (will be associated with pharmacies)
const productsData = [
  {
    name: 'Paracetamol 500mg',
    category: 'Medicine',
    power: '500mg',
    price: 45,
    discountedPrice: 38,
    quantity: 150
  },
  {
    name: 'Paracetamol 650mg',
    category: 'Medicine', 
    power: '650mg',
    price: 65,
    discountedPrice: 55,
    quantity: 120
  },
  {
    name: 'Aspirin 325mg',
    category: 'Medicine',
    power: '325mg',
    price: 85,
    discountedPrice: 72,
    quantity: 200
  },
  {
    name: 'Ibuprofen 400mg',
    category: 'Medicine',
    power: '400mg',
    price: 95,
    discountedPrice: null,
    quantity: 180
  },
  {
    name: 'Cetirizine 10mg',
    category: 'Medicine',
    power: '10mg',
    price: 125,
    discountedPrice: 110,
    quantity: 90
  },
  {
    name: 'Omeprazole 20mg',
    category: 'Medicine',
    power: '20mg',
    price: 180,
    discountedPrice: 155,
    quantity: 75
  },
  {
    name: 'Vitamin D3 1000 IU',
    category: 'Supplements',
    power: '1000 IU',
    price: 320,
    discountedPrice: 285,
    quantity: 45
  },
  {
    name: 'Multivitamin Tablets',
    category: 'Supplements',
    power: '30 tablets',
    price: 450,
    discountedPrice: null,
    quantity: 60
  },
  {
    name: 'Calcium + Vitamin D3',
    category: 'Supplements',
    power: '500mg + 250 IU',
    price: 280,
    discountedPrice: 245,
    quantity: 85
  },
  {
    name: 'Omega-3 Fish Oil',
    category: 'Supplements',
    power: '1000mg',
    price: 650,
    discountedPrice: 575,
    quantity: 30
  },
  {
    name: 'Digital Thermometer',
    category: 'Equipment',
    power: 'Digital',
    price: 850,
    discountedPrice: 750,
    quantity: 25
  },
  {
    name: 'Blood Pressure Monitor',
    category: 'Equipment',
    power: 'Automatic',
    price: 2500,
    discountedPrice: 2200,
    quantity: 15
  },
  {
    name: 'Glucose Strips (50 strips)',
    category: 'Equipment',
    power: '50 strips',
    price: 920,
    discountedPrice: null,
    quantity: 40
  },
  {
    name: 'Antiseptic Liquid',
    category: 'Personal Care',
    power: '500ml',
    price: 125,
    discountedPrice: 110,
    quantity: 95
  },
  {
    name: 'Hand Sanitizer',
    category: 'Personal Care',
    power: '200ml',
    price: 85,
    discountedPrice: 75,
    quantity: 120
  },
  {
    name: 'Face Mask (Pack of 10)',
    category: 'Personal Care',
    power: '10 pieces',
    price: 150,
    discountedPrice: null,
    quantity: 200
  },
  {
    name: 'Baby Oil',
    category: 'Baby Care',
    power: '200ml',
    price: 180,
    discountedPrice: 165,
    quantity: 70
  },
  {
    name: 'Baby Powder',
    category: 'Baby Care',
    power: '100g',
    price: 145,
    discountedPrice: null,
    quantity: 55
  },
  {
    name: 'Baby Lotion',
    category: 'Baby Care',
    power: '200ml',
    price: 225,
    discountedPrice: 195,
    quantity: 45
  },
  {
    name: 'Diaper Rash Cream',
    category: 'Baby Care',
    power: '50g',
    price: 185,
    discountedPrice: 160,
    quantity: 65
  }
];

// Function to seed pharmacies and profiles
const seedPharmacies = async () => {
  try {
    console.log('Seeding pharmacies...');
    
    const createdPharmacies = [];
    
    for (const pharmacyData of pharmaciesData) {
      // Hash password: pharmacyname_password
      const password = `${pharmacyData.pharmacyName.replace(/\s+/g, '')}_password`;
      const hashedPassword = await hashPassword(password);
      
      // Create pharmacy user
      const pharmacy = new Pharmacy({
        email: pharmacyData.email,
        name: pharmacyData.name,
        passwordHash: hashedPassword,
        role: 'pharmacy',
        isProfileComplete: true
      });
      
      const savedPharmacy = await pharmacy.save();
      
      // Create pharmacy profile
      const pharmacyProfile = new PharmacyProfile({
        pharmacy: savedPharmacy._id,
        name: pharmacyData.name,
        address: pharmacyData.address,
        phoneNumber: pharmacyData.phoneNumber,
        gstNumber: pharmacyData.gstNumber,
        licenseNumber: pharmacyData.licenseNumber,
        pharmacyName: pharmacyData.pharmacyName,
        images: ['public/defaults/default-pharmacy.png']
      });
      
      await pharmacyProfile.save();
      
      createdPharmacies.push({
        pharmacyId: savedPharmacy._id,
        pharmacyName: pharmacyData.pharmacyName,
        email: pharmacyData.email,
        password: password // Store for reference
      });
      
      console.log(`✅ Created pharmacy: ${pharmacyData.pharmacyName}`);
    }
    
    return createdPharmacies;
    
  } catch (error) {
    console.error('Error seeding pharmacies:', error);
    throw error;
  }
};

// Function to seed products
const seedProducts = async (pharmacies) => {
  try {
    console.log('Seeding products...');
    
    let totalProducts = 0;
    
    for (const pharmacy of pharmacies) {
      // Each pharmacy gets a random subset of products (5-15 products per pharmacy)
      const numProducts = Math.floor(Math.random() * 11) + 5; // 5-15 products
      const shuffledProducts = [...productsData].sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProducts.slice(0, numProducts);
      
      for (const productData of selectedProducts) {
        // Add some variation to prices and quantities for different pharmacies
        const priceVariation = Math.random() * 0.2 - 0.1; // ±10% price variation
        const quantityVariation = Math.floor(Math.random() * 50) - 25; // ±25 quantity variation
        
        const product = new Product({
          name: productData.name,
          category: productData.category,
          power: productData.power,
          price: Math.max(10, Math.round(productData.price * (1 + priceVariation))),
          discountedPrice: productData.discountedPrice ? 
            Math.max(8, Math.round(productData.discountedPrice * (1 + priceVariation))) : 
            undefined,
          quantity: Math.max(0, productData.quantity + quantityVariation),
          image: 'public/defaults/default_product.png',
          pharmacy: pharmacy.pharmacyId
        });
        
        await product.save();
        totalProducts++;
      }
      
      console.log(`✅ Added products for: ${pharmacy.pharmacyName}`);
    }
    
    console.log(`✅ Total products created: ${totalProducts}`);
    
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};

// Main seed function
const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data (optional - uncomment if you want to start fresh)
    // console.log('Clearing existing data...');
    // await Pharmacy.deleteMany({});
    // await PharmacyProfile.deleteMany({});
    // await Product.deleteMany({});
    
    // Seed pharmacies first
    const createdPharmacies = await seedPharmacies();
    
    // Then seed products
    await seedProducts(createdPharmacies);
    
    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login credentials for testing:');
    console.log('================================');
    
    createdPharmacies.forEach((pharmacy, index) => {
      console.log(`${index + 1}. ${pharmacy.pharmacyName}`);
      console.log(`   Email: ${pharmacy.email}`);
      console.log(`   Password: ${pharmacy.password}`);
      console.log('');
    });
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run the seed function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
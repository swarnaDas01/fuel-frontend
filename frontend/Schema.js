


// Add Order 
[
    {
        id: 1,
        name: 'Alice Johnson',
        pumpName: 'HEW',
        total: 2795.95,
        status: 'On Hold',
        method: 'PayPal',
        date: '15 Minutes ago',
        fuelType: 'Octane',
        quantity: 50.3, // in liters
        unitPrice: 90, // in tk per liter
        sellingPrice: 110, // in tk per liter
        totalPrice: 4527, // in tk
        paymentDetails: {}
    }
]


// Sales
const inventorySalesData = [
    {
        dateAndTime: '2023-10-08T14:30:00Z',
        fuelType: 'Octane',
        quantity: 35.2, // in liters
        unitPrice: 90, // in tk per liter
        sellingPrice: 110, // in tk per liter
        totalPrice: 3168, // in tk
        paymentMethod: 'Credit Card',
        customerInformation: {
            name: 'Alice Johnson',
            contact: '123-456-7890'
        },
        pumpName: "HEX",
        discountsOrPromotions: '10% off',
        invoiceNumber: 'INV20231008001',
        paymentStatus: 'Paid',
        salesTax: 200, // in tk
        transactionStatus: 'Completed'
    }
];


// suppliers
const suppliers = [
    {
        id: 1,
        name: 'Supplier 1',
        contact: '123-456-7890',
        address: '1234 Elm St, City, State',
        email: 'supplier1@example.com',
        fuelQuantities: [
            { fuelType: 'octane', quantity: 5000, unitPrice: 90, sellingPrice: 110, }, // in liters
            { fuelType: 'diesel', quantity: 8000, unitPrice: 70, sellingPrice: 90, }, // in liters
        ],
        minimumOrderQuantity: 50, // in liters
        maximumOrderQuantity: 1000, // in liters
        deliveryTime: '2-3 business days',
        paymentMethods: ['Credit Card', 'Bank Transfer', 'Cash', 'Bkash'],
    }
];


// admins, admin users 
const user = [
    {
        id: 1,
        name: 'John Smith',
        phone: 175235344,
        email: ' john.smith@gmail.com',
        password: 'password',
        role: ['admin', 'manager', 'employee', 'supplier'],
        pumpName: ['HEW', 'ABC', 'XYZ'],
    }
];



// add Stock
[
    {
        fuelInfo: [
            {
                fuelType: "Octane",
                quantity: 5000,
                unitPrice: 90,
                sellingPrice: 110,
                totalPrice: 450000,
            },
            {
                fuelType: "Diesel",
                quantity: 8000,
                unitPrice: 80,
                sellingPrice: 95,
                totalPrice: 640000,
            },
            {
                fuelType: "Gasoline",
                quantity: 5000,
                unitPrice: 50,
                sellingPrice: 65,
                totalPrice: 250000,
            }
        ],
        lastStockUpdate: '2023-10-08T09:30:00Z',
    }
]

// fuel station
[
    {
        id: 1,
        pumpName: 'HEW',
        stocksId: [451, 642],
        location: "1234 Elm St, City, State",
        services: ['Car Wash', 'Air Pump', 'Convenience Store'],  // Available services
    }
]
const mongoose = require("mongoose");
const User = require("./models/User");
const HealthWorker = require("./models/HealthWorker");
const Appointment = require("./models/Appointment");
const Message = require("./models/Message");  
const BpProfile = require("./models/BpProfile");
const bcrypt = require('bcryptjs');

mongoose.connect("mongodb://localhost/healthmate", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const usersData = [
  {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://example.com/avatar.jpg",
    password: "password123",
    password2: "password123",
    condition: {
      hypertensive: true,
      diabetic: false,
    },
    messages: [
      {
        text: "Hello!",
      },
      {
        text: "How are you?",
      },
    ],
    isStaff: false,
    isAdmin: false,
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://example.com/avatar.jpg",
    password: "password456",
    password2: "password456",
    condition: {
      hypertensive: false,
      diabetic: true,
    },
    messages: [
      {
        text: "Hi there!",
      },
    ],
    isStaff: false,
    isAdmin: false,
  },
  {
    name: "sarah Smith",
    email: "doctor@example.com",
    avatar: "https://example.com/avatar.jpg",
    password: "password456",
    password2: "password456",
    condition: {
      hypertensive: false,
      diabetic: false,
    },
    messages: [
      {
        text: "Hi there!",
      },
    ],
    isStaff: true,
    isAdmin: false,
  },
  {
    name: "Mary Cares",
    email: "doctor2@example.com",
    avatar: "https://example.com/avatar.jpg",
    password: "password456",
    password2: "password456",
    condition: {
      hypertensive: false,
      diabetic: false,
    },
    messages: [
      {
        text: "Hi there!",
      },
    ],
    isStaff: true,
    isAdmin: false,
  },
  // Add more user objects as needed
];

async function seed() {
  try {
    // Remove existing users
    await User.deleteMany();

    // Create new users from the seed data
    usersData.forEach((user) => {
      user.password = bcrypt.hashSync(user.password, 10);
      
    });

    const createdUsers = await User.create(usersData);

    console.log("Seed data inserted successfully");
    console.log(createdUsers);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
  }
}

seed();

const healthWorkersData = [
  {
    title: "doctor",
    user: "64a886da180ac28ef3638fab", // ObjectId of the associated user (Sarah Smith)
    age: "35",
    gender: "Female",
    contactDetails: {
      address: "123 Main St",
      phone: "123-456-7890",
      email: "doctor@example.com",
    },
    nin: "1234567890",
    professionalDesignation: "General Practitioner",
    licenceDetails: {
      licenceType: "Medical",
      licenceNum: "M12345",
      expiryDate: new Date("2024-12-31"),
    },
    availability: [],
  },
  // Add more health worker objects as needed
];

// Seed profile cards
const profileCardsData = [
  {
    user: "64a886da180ac28ef3638fa9", // ObjectId of the associated user (Jane Smith)
    name: "Jane Smith",
    age: 40,
    gender: "Female",
    phone: "987-654-3210",
    address: "456 Elm St",
    bloodPressureReadings: [],
    medications: [],
    otherHealthConditions: "None",
    familyHistory: "High blood pressure",
    allergies: "None",
    emergencyContact: "John Doe (123-456-7890)",
  },
  // Add more profile card objects as needed
];

// bpProfile

const BpProfileCard = require("./models/BpProfile");

async function seedBP() {
  try {
    const usersArr = await User.find();
    // Remove existing profile cards and messages
    await BpProfileCard.deleteMany();

    const hypertensives = usersArr.filter(
      (user) => user.condition.hypertensive
    );

    // Create new profile cards from the seed data
    const profileCardsData = hypertensives.map((user) => ({
      user: mongoose.Types.ObjectId(user._id), // Convert string ObjectId to ObjectId type
      name: user.name,
      age: 0, // Set age to a default value as it's not provided in the user object
      gender: "Male", // Example gender
      phone: "123-456-7890", // Example phone number
      address: "123 Main St", // Example address
      bloodPressureReadings: [
        {
          systolic: 120,
          diastolic: 80,
          date: new Date("2022-01-01"),
        },
        {
          systolic: 130,
          diastolic: 90,
          date: new Date("2022-01-02"),
        },
      ], // Example blood pressure readings
      medications: [
        {
          name: "Lisinopril",
          dose: "10mg",
          frequency: "Once daily",
        },
      ], // Example medications
      otherHealthConditions: "None", // Example other health conditions
      familyHistory: "None", // Example family history
      allergies: "None", // Example allergies
      emergencyContact: "John Smith (987-654-3210)", // Example emergency contact
    }));

    const createdProfileCards = await BpProfile.create(profileCardsData);

    console.log("Seed data inserted successfully");
    console.log(createdProfileCards);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the database connection
  }
}

seedBP();

// seed insulin

const InsulinProfile = require("./models/InsulinProfile");

async function seedInsulin() {
  try {
    const diabeticData = await User.find({ "condition.diabetic": true });

    const messagesData = [
      {
        user: "64a886da180ac28ef3638fa9", // ObjectId of the associated user (Jane Smith)
        text: "Hello!",
        date: new Date(),
      },
      // Add more message objects as needed
    ];

    const insulinProfilesData = diabeticData.map((user) => ({
      user: mongoose.Types.ObjectId(user._id), // Convert string ObjectId to ObjectId type
      name: user.name,
      address: "123 Main St", // Example address
      age: 30, // Example age
      phone: "123-456-7890", // Example phone number
      diagnosisDate: new Date("2022-01-01"), // Example diagnosis date
      typeOfDiabetes: "Type 2", // Example type of diabetes
      medications: [
        {
          medName: "Metformin",
          medDose: "500mg",
          frequency: "Twice daily",
        },
      ], // Example medications
      allergies: "None", // Example allergies
      emergencyContact: {
        contactName: "John Smith",
        contactPhone: "987-654-3210",
      }, // Example emergency contact
      glucoseReadings: [
        {
          readingDate: new Date("2022-01-01"),
          glucoseLevel: "120 mg/dL",
        },
        {
          readingDate: new Date("2022-01-02"),
          glucoseLevel: "110 mg/dL",
        },
      ], // Example glucose readings
      insulinDose: [
        {
          insulinType: "Rapid-acting",
        },
        {
          insulinType: "Long-acting",
        },
      ], // Example insulin doses
      doctor: {
        docName: "Dr. Johnson",
        docPhone: "555-987-6543",
        docEmail: "drjohnson@example.com",
      }, // Example doctor details
    }));

    // Remove existing insulin profiles
    await InsulinProfile.deleteMany();

    // Create new insulin profiles from the seed data
    const createdInsulinProfiles = await InsulinProfile.create(
      insulinProfilesData
    );

    console.log("Seed data inserted successfully");
    console.log(createdInsulinProfiles);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the database connection
  }
}

seedInsulin();



// Seed health workers

async function seedHealthWorkers() {
  const usersArr = await User.find({ "isStaff": true });

  let data = []

  usersArr.map((user) => {
    const profileData = {
      title: "doctor",
      name: user.name,
      user: mongoose.Types.ObjectId(user._id), // ObjectId of the associated user
      age: "35",
      gender: "Male",
      contactDetails: {
        address: "123 Main St",
        phone: "123-456-7890",
        email: "doctor@example.com",
      },
      nin: "ABC123",
      professionalDesignation: "Medical Doctor",
      licenceDetails: {
        licenceType: "Medical",
        licenceNum: "12345",
        expiryDate: new Date("2024-12-31"),
      },
      availability: [
        {
          day: "Monday",
          time: "Morning",
          date: new Date(),
        },
        {
          day: "Wednesday",
          time: "Afternoon",
          date: new Date(),
        },
      ],
    };

data.push(profileData)
  });
  // Add more health worker objects as needed

  try {
    // Remove existing health workers
    await HealthWorker.deleteMany();

    // Create new health workers from the seed data
    const createdHealthWorkers = await HealthWorker.create(data);

    console.log("Seed data inserted successfully");
    console.log(createdHealthWorkers);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

seedHealthWorkers();

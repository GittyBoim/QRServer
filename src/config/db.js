const mongoose = require('mongoose'); // מייבא את ספריית Mongoose

// פונקציית חיבור למסד נתונים
const connectDB = async () => {
  try {
    // חיבור למסד הנתונים
    const conn = await mongoose.connect(process.env.MONGO_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`); 

  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // יציאה עם שגיאה
  }
};

module.exports = connectDB; // יצוא הפונקציה

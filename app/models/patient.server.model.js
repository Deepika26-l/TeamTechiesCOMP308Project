// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

// Define a new 'PatientSchema'
const PatientSchema = new Schema({
	patientID: {type: Number, unique: true},
	password: {
		type: String,

		// Validate the 'password' value length
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
	},
	firstName: String,
	lastName: String,
	address: String,
	city: String,
	phone: Number,
	email: {
		type: String,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	}
});

// Set the 'fullname' virtual property
PatientSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
// before saving it into database
PatientSchema.pre('save', function(next){
	//hash the password before saving it
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

// Create an instance method for authenticating Patient
PatientSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the Patient enters
	return this.password === bcrypt.hashSync(password, saltRounds);
};

// Configure the 'PatientSchema' to use getters and virtuals when transforming to JSON
PatientSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Patient' model out of the 'PatientSchema'
mongoose.model('Patient', PatientSchema);
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Group Schema
 */
var GroupSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Group name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
  	users: [{
    	type: Schema.ObjectId,
    	ref: 'User'
  	}],
  	projects: [{
    	type: Schema.ObjectId,
    	ref: 'Project'
  	}]
});

mongoose.model('Group', GroupSchema);
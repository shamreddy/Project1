import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './task.html';

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.taskCount.helpers({
	
	totalTasks(){
        // code goes here
		return Tasks.find().count();
    },
    completedTasks(){
        // code goes here
		 return Tasks.find({ completed: true }).count();
    }
})

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);
	var documentId = this._id;
    var isCompleted = this.completed;
    if(isCompleted){
       Tasks.update({ _id: documentId }, {$set: { completed: false }});
        console.log("Task marked as incomplete.");
    } else {
        Tasks.update({ _id: documentId }, {$set: { completed: true }});
        console.log("Task marked as complete.");
    }
  },
  'click .delete'() {
    var documentId = this._id;
    var confirm = window.confirm("Delete this task?");
    if(confirm){
    Meteor.call('tasks.remove', this._id);
	}
  },
  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
});
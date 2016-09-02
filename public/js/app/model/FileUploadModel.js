define([
  'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',
], function ($, _, Backbone) {

  
  //Create local Model to represent the Post Category model I'll retrieve from the server.
  var FileUploadModel = Backbone.Model.extend({

    idAttribute: "_id",  //Map the Model 'id' to the '_id' assigned by the server.

    //When initialized this.id is undefined. This url gets fixed in the initialize() function.
    //url: 'http://'+global.serverIp+':'+global.serverPort+'/api/postcategory/'+this.id+'/update', 
    url: '',

    //Initialize is called upon the instantiation of this model. This function is executed once
    //per model retrieved from the server.
    initialize: function() {
      //This function is often used for debugging, so leave it here.
      //this.on('change', function() {
        //debugger;        
      //  this.save();
      //});
      //debugger;

      this.url = 'http://'+global.serverIp+':'+global.serverPort+'/api/fileupload/'+this.id+'/update';
    },
    
    defaults: {
      '_id': '',
      'file': new Object(),
      //'fileName': '',
      'name': '',
      'url': '',
      'createdTimeStamp': ''
    },

    //Override the default Backbone save() function with one that our API understands.
    save: function() {
      //debugger;

      $.getJSON(this.url, this.attributes, function(data) {
        //Regardless of success or failure, the API returns the JSON data of the model that was just updated.
        //debugger;
        log.push('FileUploadModel.save() executed.');

      }).error( function(err) {
        //This is the error handler.
        //debugger;
        log.push('Error while trying FileUploadModel.save(). Most likely due to communication issue with the server.');
        sendLog();
        console.error('Communication error with server while execute FileUploadModel.save()');
      });

    }
  });
  
  return FileUploadModel;

});

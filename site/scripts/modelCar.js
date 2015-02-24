var jvm = jvm || {};
jvm.modelCar = (function jvmModelCar(w, d, $){
	/* ***** namespace only, no DOM work is done here ***** */

	var Car = function ObjCar(make, model, year){
		this.make = make;
		this.model = model;
		this.year = year;
	}; // End Car
	Car.prototype = {
		getMake:function(){
			return this.make;	
		},
		getModel:function(){
			return this.model;
		},
		getYear:function(){
			return this.year;
		}
	}; // End Car.prototype

	var CarFactory = (function SingeltonCarFactory(){ // factory ensures unique make, model, year. If not unique return it. Else create it
		var createdCars = {};

		var _createdCar = function privateCreatedCar (make, model, year){
			// Check if this particular combintation has been created
			if(createdCars[make + '_' + model  + '_' + year]){
				return createdCars[make + '_' + model  + '_' + year];
			}else{
				var car = new Car(make, model, year);
				createdCars[make + '_' + model  + '_' + year] = car; // store new car combination in private hash
				return car;
			}
		};
		return{ // public API
			createdCar:_createdCar
		};
	})(); // End CarFactory

	/* ***** Extrinsic State Encapsulated in Manager ***** */
	var _CarRecordManager = (function ObjCarRecordManager(){
		
		var carRecordDatabase = {};

		var _addRecord = function privateAddRecord(make, model, year, owner, tag, renewDate){
			var car = CarFactory.createdCar(make, model, owner);
			carRecordDatabase[tag] = { // carRecordDatabase{owner:owner, renewData:renewDate, car:{make_model_year}}
				owner:owner,
				renewDate:renewDate,
				car:car
			};
		};
		var _getRecord = function(){
			return carRecordDatabase;
		};
		var _transferOwnership = function privateTransferOwnership(tag, newOwner, newTag, newRenewDate){
			var record = carRecordDatabase[tag];
			record.owner = newOwner;
			record.tag = newTag;
			record.renewDate = newRenewDate;
		};
		var _renewRegistration = function privateRenewRegistration(tag, renewDate){
			carRecordDatabase[tag].renewDate = renewDate;
		};
		var _isRegistrationCurrent = function priveteIsRegistrationCurrent(){
			var today = new Date();
			return today.getTime() < Date.parse(carRecordDatabase[tag].renewDate);
		};
		return{
			addRecord:_addRecord,
			getRecord:_getRecord
		};

	})(); // End CarRecordManager
	
	return{
		CarRecordManager:_CarRecordManager
	};

})(window, document, jQuery);


























var jvm = jvm || {};
jvm.view = (function(w, d, $){

	var dom = {
		nodes:{
			btnCreateCar:{selector:'#btnCreateCar', node:null, $node:null},
			txtMake:{selector:'#txtMake', node:null, $node:null},
			txtModel:{selector:'#txtModel', node:null, $node:null},
			txtYear:{selector:'#txtYear', node:null, $node:null},
			txtOwner:{selector:'#txtOwner', node:null, $node:null},
			txtTag:{selector:'#txtTag', node:null, $node:null},
			txtRenewDate:{selector:'#txtRenewDate', node:null, $node:null},
			btnPrintCar:{selector:'#btnPrintCar', node:null, $node:null},
			printCars:{selector:'#printCars', node:null, $node:null}						
		},
		createCache:function(){ // optimization: early binding prevents us from repeatedly crawling the DOM
			var strId = null;
			for(var prop in dom.nodes){
				strId = dom.nodes[prop].selector.substring(1, dom.nodes[prop].selector.length); // remove #
				dom.nodes[prop].node = d.getElementById(strId);
				dom.nodes[prop].$node = $(dom.nodes[prop].selector);
			}
		}
	};

	var listener = {
		create:function(options){
			options.$node.on(options.eventName, options.eventListener);
		},
		createCar:function(e){
			var strMake = dom.nodes.txtMake.$node.val();
			var strModel = dom.nodes.txtModel.$node.val();
			var strYear = dom.nodes.txtYear.$node.val();
			var strOwner = dom.nodes.txtOwner.$node.val();
			var strTag = dom.nodes.txtTag.$node.val();
			var strRenewDate = dom.nodes.txtMake.$node.val();
			jvm.modelCar.CarRecordManager.addRecord(strMake, strModel, strYear, strOwner, strTag, strRenewDate);
		},
		printCar:function(e){
			var hashCars = jvm.modelCar.CarRecordManager.getRecord();
			var frag = d.createDocumentFragment();
			var nodeExist = dom.nodes.printCars.node;
			var $nodeExist = dom.nodes.printCars.$node;
			var nodesText = [];
			var nodesNew = [];
			$nodeExist.empty();
			var intCounter = 0;
			for(prop in hashCars){
				nodesText[intCounter] = d.createTextNode('Tag: ' + prop);
				nodesNew[intCounter] = d.createElement('p');
				nodesNew[intCounter].appendChild(nodesText[intCounter]);

				nodesText[intCounter + 1] = d.createTextNode(hashCars[prop].car.make);
				nodesText[intCounter + 2] = d.createTextNode(hashCars[prop].car.model);
				nodesText[intCounter + 3] = d.createTextNode(hashCars[prop].car.year);
				nodesNew[intCounter + 1] = d.createElement('p');
				nodesNew[intCounter + 1].appendChild(nodesText[intCounter + 1]);
				nodesNew[intCounter + 1].appendChild(nodesText[intCounter + 2]);
				nodesNew[intCounter + 1].appendChild(nodesText[intCounter + 3]);


				frag.appendChild(nodesNew[intCounter]);
				frag.appendChild(nodesNew[intCounter + 1]);
				intCounter++;
			}
			nodeExist.appendChild(frag);
		}
	};

	function main(){
		dom.createCache();
		listener.create({$node:dom.nodes.btnCreateCar.$node, eventName:'click', eventListener:listener.createCar});
		listener.create({$node:dom.nodes.btnPrintCar.$node, eventName:'click', eventListener:listener.printCar});
	}

	var lclInterval = w.setInterval(function(){ // optimization: wait for DOM, we don't need jQuery for this
		if(d.getElementsByTagName('div').length > 0){
			w.clearInterval(lclInterval);
			main();
		}
	}, 33);

	
})(window, document, jQuery);
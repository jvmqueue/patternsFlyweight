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
		},
		causeFocus:function(){
			dom.nodes.txtMake.$node.focus();
		},
		printHeader:function(paramStr, paramFrag){
			var frag = paramFrag;
			var nodeText = d.createTextNode(paramStr);
			var nodeNew = d.createElement('h3');
			nodeNew.appendChild(nodeText);
			frag.appendChild(nodeNew); // don't return frag, because DOM nodes are passed by reference
		},
		printInfo:function(paramHash, paramFrag){
			var hash = paramHash;
			var frag = paramFrag;
			var nodeText = null;
			var nodeNew = null;
			for(var prop in paramHash){
				if(typeof hash[prop] === 'string'){
					nodeText = d.createTextNode(prop + ' : ' + hash[prop]);
					nodeNew = d.createElement('p');
					nodeNew.appendChild(nodeText);
					frag.appendChild(nodeNew);
				}
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
			var $nodeExist = dom.nodes.printCars.$node;
			var nodeExist = dom.nodes.printCars.node;
			var nodeNewContainer = d.createElement('div');
			var frag = d.createDocumentFragment();
			$nodeExist.empty();
			var intCounter = 0;
			for(prop in hashCars){
				dom.printHeader(prop, frag); // record names are defined by tag
				dom.printInfo(hashCars[prop].car, frag); // records are saved by make model and year combination
				dom.printInfo(hashCars[prop], frag); // a unique record contains owner and renew date		
			}
			nodeNewContainer.appendChild(frag);
			nodeExist.appendChild(nodeNewContainer);
		}
	};

	function main(){
		dom.createCache();
		dom.causeFocus();
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
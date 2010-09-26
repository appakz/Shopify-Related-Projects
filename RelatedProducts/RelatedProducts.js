/*
  Related Products Script for Shopify
  
  This is a simple library to use on your shopify store for 
  showing related products. It relies on some simple naming conventions for
  your products handles
*/

var relatedProductsUtil = {
    parseHandle: function(fullProductHandle) {
		var splitOnIndex = fullProductHandle.indexOf('_');
		if (splitOnIndex < 0) return;
		
		var handle = fullProductHandle.substring(0, splitOnIndex);
		var suffix = fullProductHandle.substring(splitOnIndex + 1);
		
		return { ProductHandle: handle, ProductSuffix: suffix };
	}
};

var relatedProductsLib = { 
	
	outputSelector : '', //jQuery selector for the DOM element to output the related product to
	suffixLookup : { }, //hash of the related product handle suffixes
	messageLookup : { }, //hash of the message/link format for the matching suffix
	productLookupFunction : function(relatedProductHandle, setupCallback) {}, //function that will perform the product lookup (e.g. the Shopify API function)
	
	showRelatedProduct: function (currentProductHandle) {

		var parsedInfo = relatedProductsUtil.parseHandle(currentProductHandle);

        var relatedProductHandle = this.buildRelatedProductHandle(parsedInfo.ProductSuffix, parsedInfo.ProductHandle);
        if (relatedProductHandle == null) return; 
        this.getRelatedProduct(relatedProductHandle);
	},
	
	buildRelatedProductHandle: function(currentTypeSuffix, currentProductHandle) {
		if (this.suffixLookup[currentTypeSuffix]) {
			return currentProductHandle + '_' + this.suffixLookup[currentTypeSuffix];
		}
		return null;
	},
	
	getRelatedProduct: function(relatedProductHandle) {
		try {
			var relatedProduct = this.productLookupFunction(relatedProductHandle, this.setupRelatedProductLink);
		} catch(e) { }
	},
	
	setupRelatedProductLink: function(productData) {
		if (productData== null) return; //means no proper handle was found, so there's nothing more to do
		
		var message = '';
		var productInfo = relatedProductsUtil.parseHandle(productData.handle);
		if (relatedProductsLib.messageLookup[productInfo.ProductSuffix]) {
			message = relatedProductsLib.messageLookup[productInfo.ProductSuffix].replace('{0}', productData.url);
		}
		if (message == '') return;
		
		jQuery(relatedProductsLib.outputSelector).append(message);
	}
};

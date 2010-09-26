/*
  This is a simple example of how to use the RelatedProducts script.
  
  Note that this script relies on a few things:
    -jQuery
	-jQuery Shopify API (see more here: http://mayert-douglas4935.myshopify.com/pages/api)
	-product handle naming conventions (more on that below).
*/

<script type="text/javascript">
  jQuery(document).ready(function () {
  
  //point the script at a DOM element where you want to have the related product link placed:
  relatedProductsLib.outputSelector = '#relatedProducts';
  
  //Define the product lookup function. In this case we're using the shopify jquery API (see link above)
  //this will likely not change for your purposes, but I didn't want to hardcode that dependency into the script.
  relatedProductsLib.productLookupFunction = Shopify.getProduct;
  
  //hash for the related product handle suffixes.
  relatedProductsLib.suffixLookup = {
    'sc' : 'si',
    'rc' : 'ri',
    'si' : 'sc',
    'ri' : 'rc'
  };

  relatedProductsLib.messageLookup = {
    'si' : 'Already have a pair of PiX frames? <br/><a href="{0}">You can buy these temple inserts without frames.</a>',
    'ri' : 'Already have a pair of PiX frames? <br/><a href="{0}">You can buy these temple inserts without frames.</a>',
    'sc' : 'Need a pair of PiX frames to go with these inserts? <br/><a href="{0}">You can buy these inserts with frames as a combo!</a>',
    'rc' : 'Need a pair of PiX frames to go with these inserts? <br/><a href="{0}">You can buy these inserts with frames as a combo!</a>'
  }

  //grab the product handle. In this example I've had the liquid template output the handle into a div with the id 'prodHandle'
  var fullHandle = jQuery('#prodHandle').val();
  //this kicks off the script:
  relatedProductsLib.showRelatedProduct(fullHandle);
});
</script>
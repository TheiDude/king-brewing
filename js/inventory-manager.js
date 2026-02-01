//  /js/inventory-manager.js
//  InventoryManager manages deals in the inventory.

var InventoryManager = {};

(function()
{
  //  Keep track of the inventory in memory.

  var inventory = {};


  //  Function to purchase a deal when the user clicks a Buy button.
  //  It is passed a DOM <form> element containing inputs with the names
  //  sku, price and value.

  InventoryManager.purchaseDeal =
    function(form)
    {
      //  First, send the purchase to the server.

      $.ajax( {
        type: 'POST',
        url: '/',
        data: $(form).serialize(),
        success: 
          function( data, textStatus, jqXHR )   // success handler
          {
            // Here, the server approved the purchase, so it must be added to
            // the browser's inventory in memory.  First, create an object to
            // represent the deal and its index in the inventory.  The hidden
            // input data from the form is stored in the inventory.

            var sku = null;
            var obj = {};

            // The hidden SKU from the form is used as the index. The other
            // form fields become additional properties of the object.

            $('input[type="hidden"]',form).each(
              function()
              {
                if ( this.name == 'sku' )
                  sku = $(this).val();
                else
                  obj[this.name] = $(this).val();
              });

            //  Add the new object to the memory inventory.

            inventory[sku] = obj;

            //  If a saveInventory() method has been created (Ex 5.3),
            //  use it to store the updated inventory on the client.
            //  Because we're in a handler, we can't use "this" here.

            if ( !! InventoryManager.saveInventory )
              InventoryManager.saveInventory(inventory);

            //  Show the purchase, if possible.
            //  (displayPurchase is defined in /buy-home.js for the home
            //  page, or /js/buy-detail.js for detail pages).
            //  Because we're in a handler, we can't use "this" here.

            if ( !! InventoryManager.displayPurchase )
              InventoryManager.displayPurchase(sku);
          },
        error:
          function( jqXHR, textStatus, errorThrown )
          {
            alert( 'We\'re sorry, but the deal could not be purchased '+
                    'at this time. Please try again later.' );
          }
        } ); // $.ajax()

    }; // InventoryManager.purchaseDeal()


  //  Function to initialize (or potentially replace) the current inventory
  //  with the object that was passed in.  This is invoked if the inventory
  //  is loaded from client storage (Ex 5.3).

  InventoryManager.loadInventory =
    function(inv)
    {
      //  Replace the current inventory object with the one that was loaded
      //  from client storage.

      inventory = inv;

      //  Show each purchase.

      if ( !! this.displayPurchase )
        for ( sku in inventory )
          this.displayPurchase(sku);


    }; // InventoryManager.loadInventory()

}());

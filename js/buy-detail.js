//  /js/buy-detail.js
//  Functionality to handle a purchase on the detail page.
//  Depends on /js/inventory-manager.js

//  Updates the page to reflect a purchase, by replacing the <form>
//  contents (which include the <input> with the SKU as the value)
//  with a message.

InventoryManager.displayPurchase =
  function(sku)
  {
    var deal = $('input[value="'+sku+'"]').closest('form').html(
                                          'Thank you for your purchase!');
  }


//  When the Buy button is pressed, pass the form to the InventoryManager
//  to handle the purchase of the deal.

$('form.buy-form').submit(
  function(e)
  {
    InventoryManager.purchaseDeal(this);
    e.preventDefault();
  } );


//  If the inventory was previously saved to localStorage (Ex 5.3), then
//  InventoryManager will call displayPurchase if this deal is in it.

if ( !! InventoryManager.loadInventory )
{
  var inv = localStorage.getItem('inventory');
  if ( !! inv )
    InventoryManager.loadInventory( JSON.parse(inv) );
}

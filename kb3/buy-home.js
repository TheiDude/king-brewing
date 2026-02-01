//  /buy-home.js
//  Functionality to purchase a deal from the home page.
//  Depends on /js/inventory-manager.js

//  Updates the page to reflect a purchase, by (1) finding the <section>
//  containing the <input> with the SKU as the value, then (2) moving only
//  the image to Your Deals and (3) removing the rest of the section.

InventoryManager.displayPurchase =
  function(sku)
  {
    var deal = $('input[value="'+sku+'"]').closest('section'); //1
    $('a',deal).has('img').appendTo('#inventory'); //2
    deal.remove(); //3
  }


//  When a Buy button is pressed, pass the form to the InventoryManager
//  to handle the purchase of the deal.

$(function(){
  $('form.buy-form').submit(
    function(e)
    {
      InventoryManager.purchaseDeal(this);
      e.preventDefault();
    } );
});

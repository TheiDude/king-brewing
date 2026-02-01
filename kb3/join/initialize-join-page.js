// join/initialize-join-page.js

//  Polyfill everything we need for legacy browsers

$.webshims.polyfill('forms forms-ext json-storage');


// Compare the value in the password confirmation field to the value in
// the password field whenever the confirmation field changes. If they
// are not the same, a validation message is set (if they match, any
// existing message is cleared).

function passwordMatchCheck()
{
    var confirm = document.getElementById('confirm');
    if (confirm.value==document.getElementById('pass').value)
        confirm.setCustomValidity('');
    else
      confirm.setCustomValidity('passwords do not match');
}

//  A non-sensitive input is save to localStorage every time its value
//  is changed. The key begins with "Saved-" followed by the ID of the
//  field.  When the page is loaded, each field is populated from the
//  previously-stored values, if any.

$(function()
{
  $('input[type!="submit"][type!="password"][autocomplete!="off"]').
    change(
      function(e)
      {
        localStorage.setItem('Saved-'+e.target.id,e.target.value);
      }).
    each(
      function()
      {
        var prev = localStorage.getItem('Saved-'+this.id);
        if ( !! prev )
          this.value = prev;
      });

});

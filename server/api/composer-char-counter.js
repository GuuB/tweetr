
var max = 140;
console.log("page opens");
$('main textarea').keypress(function() {
  var length = $(this).val().length;
  var length = max - length;
  $('main form #countdown').text(length);
  console.log("$ executes");
});













// jQuery(document).ready(function($) {
//     updateCountdownAll();
//     $('.message').live('input', updateCountdown);
//
// });
//
// function updateCountdownAll() {
//         $('.counter').each(function () {
//             updateCountdown(this);
//         });
//     }
//     jQuery(document).ready(function($) {
//     updateCountdownAll();
//     $('.counter').live('input', updateCountdown);
//
// });
//
// function updateCountdown(e) {
//
//     var currentElement;
//     if (e.target) {
//         currentElement = e.target;
//     } else {
//         currentElement = e;
//     }
//
//     var maxLength = $(currentElement).attr('maxlength');
//     var remaining = maxLength - $(currentElement).val().length;
//     $(currentElement).nextAll('.countdown:first').text(remaining + ' character(s) remaining.');
// }

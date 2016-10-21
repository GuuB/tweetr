$(document).ready( () => {

// Logic for letter counter & locked submit button
  $("#flash").hide();
  $('textarea#text').keyup(() => {
    const text = $('textarea#text').val().length
    $('#counter').text(`${140 - text}`);
    if (text > 140) {
      $('#counter').css("color", "red");
      $('#tweetbutton').prop('disabled', true);
      $("#flash").show();
    } else {
      $("#flash").hide();
      $('#counter').css("color", "black");
      $('#tweetbutton').prop('disabled', false);
    }
  });

  // Prevents submit form from refreshing page and fetching data dynamically with ajax
    $("form").submit( (ev) => {
      ev.preventDefault();
      var tweetText = $("form").serialize();
  		$.ajax({
  			method: 'POST',
  			url: "/tweets",
        data: tweetText,
  			success: (data) => {
          $("form")[0].reset();
          $(".tweets").empty();
          $("#counter").text("140");
          loadTweets(createTweets);
  			}
  		});
  	});


  // function gets http request and uses callback on response
    var loadTweets = (_cb) => {
      $.ajax({
        method: 'GET',
        url: "/tweets",
        success: (response) => {
          _cb(response);
          console.log("success mate!");
        },
        fail: () => {
          console.log("fatality");
        }
      });
    }

// Appends all tweets together and in order of most recent
  var createTweets = (tweets) => {
    tweets.forEach( (tweet) => {
      $('section.tweets').prepend(createTweetElement(tweet));
    });
  }

// Created each tweet and returns the html string
  var createTweetElement = (tweet) => {
    var $tweet = $('<article>').addClass('tweet');
    $($tweet).html(`
      <header>
        <img class="display-picture" src="${tweet['user']['avatars']['small']}">
        <span class="user">${tweet['user']['name']}</span>
        <span class="username">${tweet['user']['handle']}</span>
      </header>
      <div>
        <p class="content">${tweet['content']['text']}
        </p>
      </div>
      <footer>
        <span class="dot">Date of tweet: ${tweet['created_at']}
        </span>
      </footer>`);
    return $tweet;
  }

// Logic for toggle new tweet form
  $("#compose").on("click", () => {
    $(".new-tweet").slideToggle();
    $("#text").select()
  });

  loadTweets(createTweets);

});

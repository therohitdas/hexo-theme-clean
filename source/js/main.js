$(document).ready(function () {
  if (get_id() !== "") {
    $("#logout_link").show();
    $("#login_link").hide();
  } else {
    $("#logout_link").hide();
    $("#login_link").show();
  }

  $("article").lightGallery({
    selector: ".img-item",
    subHtmlSelectorRelative: true,
  });

  let tocInit = function () {
    $("#toc-content a").each(function () {
      var oldText = $(this).text();
      var newText = oldText.replace("#", "");
      $(this).text(newText);

      if ($(this).hasClass("toc-link")) {
        $(this).addClass("text-truncate d-block");
      }
    });
  };
  tocInit();

  let cardListInit = function () {
    $(".card ul").each(function () {
      if ($(this).parent().hasClass("card-body")) {
        $(this).unwrap();
      }
    });
    $(".card ul").addClass("list-group list-group-flush");
    $(".card ul li").addClass("list-group-item");
  };
  cardListInit();

  $(".dropdown-menu a").on("click", function () {
    event.preventDefault();
    event.stopPropagation();

    if ($(this).hasClass("toc-link")) {
      const elem = $(this).attr("href");
      window.location.href = elem;
    }
  });

  $(".expand-toggle").on("click", function () {
    $("#toc-content").toggleClass("expand");
    $(".expand-text").toggle();
    $(".close-text").toggle();
  });

  $(".back-to-top").on("click", function () {
    $("body, html").stop(true, true).animate(
      {
        scrollTop: 0,
      },
      100,
      "linear"
    );
  });

  $(".go-to-bottom").on("click", function () {
    $("body, html")
      .stop(true, true)
      .animate(
        {
          scrollTop: $(document.body)[0].scrollHeight,
        },
        100,
        "linear"
      );
  });
});

function logout() {
  event_logging("Logout Pressed", "Logout", "Logout Pressed");
  if (confirm("Do you really want to logout?")) {
    event_logging("Logout Confirmed", "Logout", "Logout Confirmed");
    set_cookie("token", " ", -5);
    set_cookie("id", " ", -5);
    set_cookie("name", " ", -5);
    refresh();
  } else {
    event_logging("Logout Unconfirmed", "Logout", "Logout unconfirmed");
  }
}

function refresh() {
  location.reload();
}

function event_logging(action, category, label) {
  try {
    gtag("event", action.toLowerCase(), {
      event_category: category.toLowerCase(),
      event_label: label.toLowerCase(),
    });
  } catch (error) {
    console.error(error);
  }
}

function set_cookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  return true;
}

function get_cookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function get_id() {
  return get_cookie("id");
}

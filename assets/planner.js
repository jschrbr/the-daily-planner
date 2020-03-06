async function clearStore() {
  let plan = {
    day: moment().format("dddd"),
    currentHour: moment().format("HH"),
    hours: [
      { 8: "" },
      { 9: "" },
      { 10: "" },
      { 11: "" },
      { 12: "" },
      { 13: "" },
      { 14: "" },
      { 15: "" },
      { 16: "" },
      { 17: "" },
      { 18: "" }
    ]
  };
  localStorage.setItem("response", JSON.stringify(plan));
}

if (localStorage.getItem("response") == null) {
  clearStore();
}

function createCardHeader(hour, titleString, currentHour) {
  let card = $("<div>").addClass("card");

  let cardHeader = $("<div>")
    .addClass("card-header")
    .attr({
      id: "header" + hour,
      role: "tab"
    });

  let buttonEx = $("<a>")
    .addClass(["collapsed", "text-dark"])
    .attr({
      "data-toggle": "collapse",
      "data-parent": "#accordionEx",
      href: "#body" + hour,
      "aria-expanded": "false",
      "aria-controls": "body" + hour,
      id: hour
    });
  let fillSpace = $("<span>").addClass("fill-space");
  let fillSpace2 = $("<span>").addClass("fill-space");
  let heading = $("<h5>")
    .addClass("mb-0")
    .css({ display: "flex", "justify-content": "center" });

  let time = $("<span>").append(hour + ":00 ");

  let title = $("<span>")
    .append(titleString.substring(0, 15))
    .attr({ id: "titleHeader" + hour });

  let icon = $("<i>").addClass([
    "float-right",
    "fas",
    "fa-angle-down",
    "rotate-icon"
  ]);
  heading.append(time, fillSpace, title, fillSpace2, icon);
  buttonEx.append(heading);

  if (hour == currentHour) {
    card.addClass(["bg-primary", "text-white"]);
    buttonEx.removeClass(["text-dark", "collapsed"]).addClass("text-white");
  } else if (hour < currentHour) {
    card.addClass("text-muted");
    buttonEx.removeClass("text-dark").addClass("text-muted");
  }
  cardHeader.append(buttonEx);

  return card.append(cardHeader);
}

function createCardBody(hour, titleString, currentHour) {
  let collapse = $("<div>")
    .addClass("collapse")
    .attr({
      id: "body" + hour,
      role: "tabpanel",
      "data-parent": "#accordionEx"
    });
  if (hour == currentHour) {
    collapse.addClass("show");
  }
  let cardBody = $("<div>")
    .addClass("card-body")
    .text("Click below to add content")
    .css({
      "font-size": "0.75em",
      "font-style": "italic"
    });
  let cardContent = $("<div>")
    .attr({
      id: "content" + hour,
      contenteditable: true
    })
    .text(titleString)
    .css({
      "font-size": "2em",
      "font-style": "normal"
    });
  cardBody.append(cardContent);
  collapse.append(cardBody);
  return collapse;
}

function createCard(hour, titleString, currentHour) {
  if (hour < 10) {
    hour = "0" + hour;
  }
  let card = createCardHeader(hour, titleString, currentHour);
  card.append(createCardBody(hour, titleString, currentHour));
  $("#accordionEx").append(card);
}

function timedUpdate() {
  $("#time").text(moment().format("HH:mm:ss"));
  var plans = JSON.parse(localStorage.getItem("response"));

  plans.hours.forEach((hour, index) => {
    hour = Object.keys(hour)[0];
    let hourID = hour;
    if (hour < 10) {
      hourID = "0" + hour;
    }
    let newDesc = $("#content" + hourID).text();

    plans.hours[index][hour] = newDesc;
    $("#titleHeader" + hourID).text(newDesc.substring(0, 15));
  });
  localStorage.setItem("response", JSON.stringify(plans));

  if ($("#day").text() != moment().format("dddd")) {
    clearStore();
    $("#accordionEx").text("");
    setup();
  }

  if (plans.currentHour != moment().format("HH")) {
    plans.currentHour = moment().format("HH");
    localStorage.setItem("response", JSON.stringify(plans));

    $("#accordionEx").text("");
    setup();
  }

  setTimeout(timedUpdate, 1000);
}

async function setup() {
  var plans = JSON.parse(localStorage.getItem("response"));
  plans.hours.forEach((hour, index) => {
    var hour = Object.keys(hour)[0];
    var title = plans.hours[index][hour];
    createCard(hour, title, plans.currentHour);
  });
  $("#day").text(plans.day);
}

setup().then(timedUpdate());

let plan = {
  8: "",
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
  16: "",
  17: "",
  18: ""
};

function createCard(hour) {
  if (hour < 10) {
    hour = "0" + hour;
  }
  let card = $("<div>").addClass("card");
  let cardHeader = $("<div>")
    .addClass("card-header")
    .attr({
      id: "header" + hour,
      role: "tab"
    });
  let buttonEx = $("<a>")
    .addClass("collapsed")
    .attr({
      "data-toggle": "collapse",
      "data-parent": "#accordionEx",
      href: "#" + "body" + hour,
      "aria-expanded": "false",
      "aria-controls": "body" + hour
    });
  let time = $("<span>").append(hour + ":00");
  let fillSpace = $("<span>").addClass("fill-space");
  let heading = $("<h5>").addClass("mb-0");
  let title = $("<span>").append("Something");
  let icon = $("<i>").addClass([
    "float-right",
    "fas",
    "fa-angle-down",
    "rotate-icon"
  ]);
  heading.append(fillSpace, title, fillSpace, icon);
  buttonEx.append(time, heading);
  cardHeader.append(buttonEx);

  let collapse = $("<div>")
    .addClass("collapse")
    .attr({
      id: "body" + hour,
      role: "tabpanel",
      "data-parent": "#accordionEx"
    });
  let cardBody = $("<div>")
    .addClass("card-body")
    .text("Hello");
  collapse.append(cardBody);
  card.append(cardHeader, collapse);
  $("#accordionEx").append(card);
}

for (key in plan) {
  createCard(key);
}

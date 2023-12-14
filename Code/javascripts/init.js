var aLittleBit = Math.PI / 100000;
var chart1;
var chart2;
var chart2;
var binnenData;
var refugeesData;
var migrationData;
var currentDg = "diagram1";
var dg1prefix = "migration";
var dg1year = "2015";
var dg2prefix = "refugees";
var dg2year = "2015";
var dg3prefix = "";
var dg3year = "2015";

var startAngle = (301 * Math.PI) / 180;

// load files
d3.json(datafile1, function (data1) {
  migrationData = data1;
  initDiagram1();
});

d3.json(datafile2, function (data2) {
  refugeesData = data2;
  //initDiagram2();
});

d3.json(datafile3, function (data3) {
  binnenData = data3;
  //initDiagram3();
});

// switch source
let sourceButtons = document.querySelectorAll("#global-flow .source");
let changeSourceEvent = (item) => {
  document.querySelectorAll("#global-flow .source").forEach((source) => {
    source.classList.remove("active");
  });

  item.target.classList.add("active");

  var prefix = item.target.dataset.prefix;
  var previous = document.querySelector("#global-flow aside.active");
  var next = document.querySelector("#global-flow aside." + prefix);

  previous.classList.remove("active");
  next.classList.add("active");

  document.querySelectorAll("#global-flow .timeline").forEach((timeline) => {
    timeline.classList.remove("active");
  });

  document
    .querySelector("#global-flow .timeline." + prefix)
    .classList.add("active");

  if (
    document.querySelector(
      "#global-flow .timeline." + prefix + " span.year input:checked"
    )
  ) {
    year = document.querySelector(
      "#global-flow .timeline." + prefix + " span.year input:checked"
    ).value;
  } else {
    year = "2015";
  }

  item.target.dataset.dataYear = year;
  var dg = item.target.dataset.diagram;

  // remove timelines
  document.querySelectorAll("#global-flow .timeline").forEach((timeline) => {
    timeline.textContent = "";
  });

  // remove figures
  document.querySelector("#global-flow #diagram1").remove();
  document.querySelector("#global-flow #diagram2").remove();
  document.querySelector("#global-flow #diagram3").remove();

  // create figures
  dg1 = document.createElement("figure");
  dg1.id = "diagram1";
  dg1.style.display = "none";
  dg1.style.opacity = 0;
  dg2 = document.createElement("figure");
  dg2.id = "diagram2";
  dg2.style.display = "none";
  dg2.style.opacity = 0;
  dg3 = document.createElement("figure");
  dg3.id = "diagram3";
  dg3.style.display = "none";
  dg3.style.opacity = 0;

  parent = document.querySelector("#global-flow #figure-container");
  parent.insertBefore(dg3, parent.firstChild);
  parent.insertBefore(dg2, parent.firstChild);
  parent.insertBefore(dg1, parent.firstChild);

  // show migration
  if (dg == "diagram1") {
    dg1.style.display = "block";
    initDiagram1();
    // chart1.draw(prefix + 2015);
    setTimeout(() => {
      dg1.style.opacity = 1;
    }, 200);
  }

  // show refugees
  if (dg == "diagram2") {
    dg2.style.display = "block";
    initDiagram2();
    // chart2.draw(prefix + 2015);
    setTimeout(() => {
      dg2.style.opacity = 1;
    }, 200);
  }

  // show binnen
  if (dg == "diagram3") {
    dg3.style.display = "block";
    initDiagram3();
    // chart3.draw(prefix + 2015);
    setTimeout(() => {
      dg3.style.opacity = 1;
    }, 200);
  }

  document
    .querySelectorAll("#global-flow .timeline-info div")
    .forEach((div) => {
      div.classList.remove("active");
    });

  document
    .querySelectorAll("#global-flow .timeline-info ._" + year)
    .forEach((div) => {
      div.classList.add("active");
    });

  currentDg = dg;
};
sourceButtons.forEach((item) => {
  item.addEventListener("click", changeSourceEvent);
});

// switch year
document.querySelectorAll(".timeline").forEach((timeline) => {
  timeline.addEventListener("click", (tl) => {
    year = timeline.querySelector("span.year input:checked").value;
    document
      .querySelectorAll("#global-flow .timeline-info div")
      .forEach((div) => {
        div.classList.remove("active");
      });
    document
      .querySelectorAll("#global-flow .timeline-info ._" + year)
      .forEach((div) => {
        div.classList.add("active");
      });
  });
});

var aLittleBit2 = Math.PI / 100000;
var startAngle = (360 * Math.PI) / 180;

// migration plot
function initDiagram1() {
  chart1 = Globalmigration.chart(migrationData, {
    element: "#diagram1",
    animationDuration: 500,
    margin: 150,
    arcPadding: 0.02,
    layout: {
      alpha: startAngle,
      threshold: 75000,
      labelThreshold: 75000,
      colors:
        "f3c97d 007851 255ac4 7FA0D1 bacfd9 96c4b4 0e7991 2A3259 4e1192 9d4283 999999"
          .split(" ")
          .map(function (c) {
            return "#" + c;
          }),
    },
  });

  Globalmigration.timeline(chart1, {
    now: 2015,
    element: "#migration-timeline",
    incr: 5,
    prefix: "",
  });

  chart1.draw("2015");
}

// refugees plot
function initDiagram2() {
  chart2 = Globalmigration.chart(refugeesData, {
    element: "#diagram2",
    animationDuration: 500,
    margin: 150,
    arcPadding: 0.02,
    layout: {
      alpha: startAngle,
      threshold: 30000,
      labelThreshold: 30000,
      colors:
        "f3c97d 007851 255ac4 7FA0D1 bacfd9 96c4b4 0e7991 2A3259 4e1192 9d4283 999999"
          .split(" ")
          .map(function (c) {
            return "#" + c;
          }),
    },
  });

  Globalmigration.timeline(chart2, {
    now: 2015,
    element: "#refugees-timeline",
    incr: 4.5,
    prefix: "",
  });
  chart2.draw("2015");
}

// internal plot
function initDiagram3() {
  chart3 = Globalmigration.chart(binnenData, {
    element: "#diagram3",
    animationDuration: 500,
    margin: 150,
    arcPadding: 0.02,
    layout: {
      alpha: startAngle,
      threshold: 5000,
      labelThreshold: 5000,
      colors:
        "bacfd9 96c4b4 428DA1 175B75 2A3259 4E1192 AA3886 C48798 E48C71 D1AC90 F3C97D A3A96C 627945 007851 255AC4 7FA0D1"
          .split(" ")
          .map(function (c) {
            return "#" + c;
          }),
    },
  });
  Globalmigration.timeline(chart3, {
    now: 2015,
    element: "#binnen-timeline",
    incr: 4.9,
    prefix: "",
  });
  chart3.draw("2015");
}

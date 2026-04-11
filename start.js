(function () {
  const path = window.location.pathname.split("/").pop().toLowerCase();

  const startUserMap = {
    "start.html": "indexs",
    "starta.html": "indexsa",
    "startb.html": "indexsb",
    "startc.html": "indexsc",
    "startd.html": "indexsd",
    "starte.html": "indexse",
    "startf.html": "indexsf",
    "startg.html": "indexsg",
    "starth.html": "indexsh",
    "starti.html": "indexsi",
    "startj.html": "indexsj",
    "startk.html": "indexsk",
    "startl.html": "indexsl",
    "startm.html": "indexsm"
  };

  const selectedUser = startUserMap[path] || "indexs";

  try {
    localStorage.setItem("selectedUser", selectedUser);
    sessionStorage.setItem("selectedUser", selectedUser);
  } catch (e) {}

  const delay = 700;

  window.setTimeout(() => {
    window.location.replace("./index.html");
  }, delay);
})();

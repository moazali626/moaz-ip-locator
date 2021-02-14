document.querySelector("#loading").textContent = "FETCHING DATA...";

async function IP(value) {
  if (value) {
    var string = value;
  } else {
    var string = "";
  }
  await fetch(`https://ipapi.co/${string}/json/`).then((response) => {
    response.json().then((result) => {
      document.querySelector("#loading").textContent = "";
      document.querySelector("#home-ip").textContent = result.query;
      document.querySelector("#query").textContent = result.query;
      document.querySelector("#country").textContent = result.country;
      document.querySelector("#countryCode").textContent = result.countryCode;
      document.querySelector("#currency").textContent = result.currency;
      document.querySelector("#regionName").textContent = result.regionName;
      document.querySelector("#city").textContent = result.city;
      document.querySelector("#zip").textContent = result.zip;
      document.querySelector("#timezone").textContent = result.timezone;
      document.querySelector("#isp").textContent = result.isp;

      var proxy = document.querySelector("#proxy");
      if (result.proxy) {
        proxy.textContent = "Yes";
      } else {
        proxy.textContent = "No";
      }

      document.querySelector("#lat").textContent = result.lat;
      document.querySelector("#lon").textContent = result.lon;

      var container = L.DomUtil.get("mapid");
      if (container != null) {
        container._leaflet_id = null;
      }

      var mymap = L.map("mapid").setView([result.lat, result.lon], 12);
      const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      const tiles = L.tileLayer(tileUrl, { attribution });
      tiles.addTo(mymap);
      L.marker([result.lat, result.lon]).addTo(mymap);
    });
  });
}

IP();

const form = document.querySelector("form");
const search = document.querySelector("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  IP(search.value);
});

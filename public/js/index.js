require("modules");
require("dotenv").config();

console.log(process.env);

document.querySelector("#loading").textContent = "FETCHING DATA...";

async function IP(value) {
  if (value) {
    var string = value;
  } else {
    var string = "";
  }
  await fetch(
    `https://api.ipdata.co/${string}?api-key=a2a7120b310e1e4273fe4d1d65e062f207577c7f50e46e2222522f6c`
  ).then((response) => {
    response.json().then((result) => {
      document.querySelector("#loading").textContent = "";
      document.querySelector("#home-ip").textContent = result.ip;
      document.querySelector("#query").textContent = result.ip;
      document.querySelector("#country").innerHTML =
        result.country_name +
        " " +
        `<span style="display:inline;"><img src="${result.flag}"></span>`;
      document.querySelector("#callingCode").textContent =
        "+" + result.calling_code;
      document.querySelector("#countryCode").textContent = result.country_code;
      document.querySelector("#currency").textContent = result.currency.code;
      document.querySelector("#regionName").textContent = result.region;
      document.querySelector("#city").textContent = result.city;
      document.querySelector("#zip").textContent = result.postal;
      document.querySelector("#timezone").textContent = result.time_zone.name;
      document.querySelector("#isp").textContent = result.asn.name;

      var proxy = document.querySelector("#proxy");
      if (result.threat.is_proxy) {
        proxy.textContent = "Yes";
      } else {
        proxy.textContent = "No";
      }

      document.querySelector("#lat").textContent = result.latitude;
      document.querySelector("#lon").textContent = result.longitude;

      var container = L.DomUtil.get("mapid");
      if (container != null) {
        container._leaflet_id = null;
      }

      var mymap = L.map("mapid").setView(
        [result.latitude, result.longitude],
        12
      );
      const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      const tiles = L.tileLayer(tileUrl, { attribution });
      tiles.addTo(mymap);
      L.marker([result.latitude, result.longitude]).addTo(mymap);
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

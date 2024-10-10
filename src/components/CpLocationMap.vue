<template>
  <div id="map" class="w-map-width h-map-height"></div>
</template>

<script>
import { onMounted } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default {
  setup() {
    onMounted(() => {
      const map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      const marker = L.marker([51.5, -0.09]).addTo(map);
      marker.bindPopup('Hotel Mari Pop Boutique').openPopup();
    });
  }
};
</script>

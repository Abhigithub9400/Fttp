<template>
  <div :class="{ 'blur-background': showLocation }">
    <div class="card">
      <Carousel
        v-bind="$attrs"
        ref="carouselRef"
        :value="products"
        :numVisible="2"
        :numScroll="2"
        :responsive-options="responsiveOptions"
        :circular="false"
        :showIndicators="false"
        :showNavigators="false"
        :page="currentPage"
        @update:page="currentPage = $event"
      >
        <template #item="slotProps">
          <div class="border rounded-card-radius p-2 flex card-container mr-4 bg-white">
            <div class="flex-none flex justify-center items-center w-carousel-image-width">
              <DeferredContent @load="onImageLoad">
                <img
                  :src="slotProps.data.image"
                  loading="lazy"
                  class="w-full rounded-img-radius object-cover h-auto"
                />
              </DeferredContent>
            </div>
            <div class="flex-grow ml-4 p-3 pt-3 flex flex-col justify-between">
              <h2
                class="flex items-center justify-start text-small font-semibold text-messageText leading-name-height h-name-height font-sans"
              >
                {{ slotProps.data.name }}
              </h2>
              <div class="justify-center">
                <span class="cursor-pointer !text-primaryRed" @click="showMap">
                  <i class="pi pi-map-marker text-xl text-red-600 mr-2"></i>View Location</span
                >
              </div>
              <div class="flex gap-2 items-center mt-2 mb-4">
                <i class="pi pi-star-fill text-customYellow w-star-width"></i>
                <span class="text-sm font-medium text-messageText leading-name-height">{{
                  slotProps.data.rating
                }}</span>
                <span class="text-xs font-medium"> </span>
                <span class="text-xs font-medium opacity-50"
                  >({{ slotProps.data.reviews }} reviews)</span
                >
              </div>
              <div class="flex gap-2 items-center">
                <i class="pi pi-dollar !font-extra-bold"></i>
                <div class="text-sm font-medium">From {{ slotProps.data.price }}</div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
      <div class="mt-4 flex gap-4 flex-wrap">
        <Button
          label="Previous"
          icon="pi pi-arrow-left"
          iconPos="left"
          outlined
          @click="prev"
          :disabled="isPreviousDisabled"
          :class="{
            'text-disabledGray border-disabledGray border rounded-button-radius p-btn-padding gap-btn-gap bg-white':
              isPreviousDisabled,
            'border-2 border-primaryRed rounded-button-radius text-primaryRed active:primaryRed p-btn-padding gap-btn-gap bg-white':
              !isPreviousDisabled
          }"
          class="bg-white flex justify-between items-center gap-btn-gap w-button-prev-width h-button-height"
          unstyled
        />
        <Button
          label="Next"
          icon="pi pi-arrow-right"
          iconPos="right"
          outlined
          @click="next"
          :disabled="isNextDisabled"
          :class="{
            'text-disabledGray border-disabledGray border rounded-button-radius md:w-25 w-button-next-width h-button-height p-btn-padding gap-btn-gap':
              isNextDisabled,
            'border-2 border-primaryRed rounded-button-radius text-primaryRed md:w-25 active:primaryRed w-button-next-width h-button-height p-btn-padding gap-btn-gap':
              !isNextDisabled
          }"
          class="bg-white flex justify-between items-center flex-row-reverse gap-btn-gap"
          unstyled
        />
      </div>
      <Dialog
        v-model:visible="showLocation"
        maximizable
        modal
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <CpLocationMap />
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ProductService } from '@/service/ProductService';
import Carousel from 'primevue/carousel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { useToast } from 'primevue/useToast';
import type { Product } from '@/service/ProductService';
import CpLocationMap from '@/components/CpLocationMap.vue';

const products = ref<Product[]>([]);
const carouselRef = ref(null);
const activeButton = ref('');
const currentPage = ref(0);
const showLocation = ref(false);

onMounted(() => {
  ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 9)));
});

const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1
  }
]);
const maxPages = computed(() => Math.ceil(products.value.length / 2) - 1);
const isPreviousDisabled = computed(() => currentPage.value === 0);
const isNextDisabled = computed(() => currentPage.value >= maxPages.value);
const prev = () => {
  if (!isPreviousDisabled.value) {
    currentPage.value -= 1;
    activeButton.value = 'prev';
  }
};
const next = () => {
  if (!isNextDisabled.value) {
    currentPage.value += 1;
    activeButton.value = 'next';
  }
};
const onImageLoad = () => {
  const toast = useToast();
  toast.add({
    summary: 'Image Initialized',
    life: 2000
  });
};
const showMap = () => {
  showLocation.value = true;
};
</script>

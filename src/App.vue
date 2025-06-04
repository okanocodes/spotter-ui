<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js'
import { Line } from 'vue-chartjs'

// @ts-ignore
import * as chartConfig from './chartConfig.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
import { Search } from 'lucide-vue-next'
import { Radio } from 'lucide-vue-next'
import { Percent } from 'lucide-vue-next'
import { ref } from 'vue'

const data = ref(chartConfig.data)
const options = ref(chartConfig.options)
</script>

<template>
  <header>
    <!-- 
    navbar..
    -->
  </header>

  <main>
    <div class="border-b border-t border-dashed border-border-gray mx-auto my-36">
      <section
        class="diagonal container mx-auto border-l border-r border-dashed border-border-gray p-2"
      >
        <div class="grid md:grid-cols-7 md:grid-rows-[auto_auto_auto] gap-2">
          <article
            class="box-sdw bg-white md:row-span-3 md:col-span-4 gap-y-5 flex flex-col border border-solid border-border-gray rounded-lg justify-between"
          >
            <header class="pt-8 pl-8 flex flex-col gap-y-4 items-start">
              <span
                class="w-auto px-4 py-2 border border-gray-200 rounded-sm inset-shadow-sm text-xs text-[#8c8c89]"
                >Why Fingerprint
                <span class="blink-cursor">_</span>
              </span>

              <h2 class="text-4xl font-medium">
                The internet's most
                <mark
                  class="text-primary-orange bg-transparent before:content-['\A'] before:whitespace-pre"
                  >accurate</mark
                >
                visitor identifier
              </h2>
              <p class="text-dark-gray">
                <strong>Industry-leading accuracy</strong> that lasts for months or years, even when
                cookies are cleared.
              </p>
              <a
                href="#"
                class="box-sdw inline-block px-4 py-2 bg-gray-100 border border-border-gray text-gray-900 text-xs font-semibold rounded hover:bg-gray-200 active:bg-gray-300 transition"
              >
                Learn More
              </a>
            </header>
            <div class="flex-grow flex flex-col">
              <Line :data="data" :options="options" />
              <div
                class="mt-2 mb-4 px-2 md:px-8 text-gray-300 text-xs uppercase flex flex-row justify-between"
              >
                <span>Accuracy dropoff</span>
                <span>days after initial identification</span>
              </div>
            </div>
          </article>
          <article
            class="box-sdw bg-white md:row-start-1 md:col-start-5 md:col-span-3 border border-solid border-border-gray rounded-lg"
          >
            <header class="flex py-8 px-6 gap-4">
              <div>
                <div class="border border-solid border-gray-200 p-2 bg-gray-50/20 rounded-lg">
                  <Search :size="16" color="#ff5e24" />
                </div>
              </div>
              <div class="flex flex-col gap-y-4">
                <h3 class="font-medium">Any browser, any device.</h3>
                <p class="text-sm text-dark-gray">
                  Identify returning web and mobile app visitors on all browsers, iOS, and Android,
                  with exceptional accuracy.
                </p>
              </div>
            </header>
          </article>
          <article
            class="box-sdw bg-white md:row-start-2 md:col-start-5 md:col-span-3 border border-solid border-border-gray rounded-lg overflow-hidden"
          >
            <div class="placeholder w-full min-h-52"></div>
            <header class="flex py-8 px-6 gap-4">
              <div>
                <div class="border border-solid border-gray-200 p-2 bg-gray-50/20 rounded-lg">
                  <Radio :size="16" color="#ff5e24" />
                </div>
              </div>
              <div class="flex flex-col gap-y-4">
                <h3 class="font-medium">Identify all anonymous visitors.</h3>
                <p class="text-sm text-dark-gray">
                  Get details on suspicious visitors even when VPN, incognito mode, or a tampered
                  browser or device is used.
                </p>
              </div>
            </header>
          </article>
          <article
            class="box-sdw bg-white md:row-start-3 md:col-start-5 md:col-span-3 border border-solid border-border-gray rounded-lg"
          >
            <header class="flex py-8 px-6 gap-4">
              <div>
                <div class="border border-solid border-gray-200 p-2 bg-gray-50/20 rounded-lg">
                  <Percent :size="16" color="#ff5e24" />
                </div>
              </div>
              <div class="flex flex-col gap-y-4">
                <h3 class="font-medium">Delight your trusted users.</h3>
                <p class="text-sm text-dark-gray">
                  Personalize user experience and reduce 2FA and OTP requirements by identifying
                  logged-out users.
                </p>
              </div>
            </header>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.diagonal {
  --skew-angle: 8deg;
  --bg-grey: #fafaf8;
  --bg-border-grey: #e4e5e1;
}

.diagonal::before {
  background: linear-gradient(var(--skew-angle), var(--bg-grey) 50%, transparent 50%);
  bottom: 0;
  content: '';
  height: 70rem;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -10;
}

.diagonal::after {
  background: linear-gradient(
    var(--skew-angle),
    transparent calc(50% - 0.5px),
    var(--bg-border-grey) calc(50% - 0.5px),
    var(--bg-border-grey) calc(50% + 0.5px),
    transparent calc(50% + 0.5px)
  );
  bottom: 0;
  content: '';
  height: 70rem;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -10;
}

@keyframes cursor-blink {
  0% {
    opacity: 0;
  }
}

.blink-cursor {
  animation: cursor-blink 1.5s steps(2) infinite;
}

.box-sdw {
  box-shadow:
    0 2px 1px 0 rgba(24, 25, 22, 0.02),
    inset 0 -1px 0 rgba(24, 25, 22, 0.1);
}
.placeholder {
  --d: 3px;
  background: radial-gradient(
      circle at var(--d) var(--d),
      #dcdcdc calc(var(--d) - 1px),
      #fff var(--d)
    )
    0 0 / 20px 20px;
}
</style>

<template>
  <div class="box  p-5 intro-y">
    <div class=" flex items-center ">
      <h2 class="text-lg font-medium truncate ">Visitors</h2>
    </div>
    <div class="flex items-center my-2">
      Realtime active users
      <div class="dropdown ml-auto">
        <a
            class="dropdown-toggle w-5 h-5 block -mr-2"
            href="javascript:;"
            aria-expanded="false"
            data-tw-toggle="dropdown"
        >
          <MoreVerticalIcon class="w-5 h-5 text-slate-500" />
        </a>
        <div class="dropdown-menu w-40">
          <ul class="dropdown-content">
            <li>
              <a href="" class="dropdown-item">
                <FileTextIcon class="w-4 h-4 mr-2" />
                Export
              </a>
            </li>
            <li>
              <a href="" class="dropdown-item">
                <SettingsIcon class="w-4 h-4 mr-2" />
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="text-xl font-medium mt-3">214</div>
    <div class="border-b border-slate-200 flex pb-2 ">
      <div class="text-slate-500 text-xs">Page views per second</div>
      <Tippy
          tag="div"
          class="text-success flex text-xs font-medium cursor-pointer ml-auto"
          content="49% Lower than last month"
      >
        49% <ChevronUpIcon class="w-4 h-4 ml-0.5" />
      </Tippy>
    </div>
    <div class="mt-2 border-b broder-slate-200">
      <div class="-mb-1.5 -ml-2.5">
        <simple-column :height="111" />
      </div>
    </div>
    <div
        class="text-slate-500 text-xs border-b border-slate-200 flex mb-2 pb-2 mt-4"
    >
      <div>Top Active Pages</div>
      <div class="ml-auto">Active Users</div>
    </div>
    <div class="flex">
      <div>/letz-lara…review/2653</div>
      <div class="ml-auto">472</div>
    </div>
    <div class="flex mt-1.5">
      <div>/icewall…review/1674</div>
      <div class="ml-auto">294</div>
    </div>
    <div class="flex mt-1.5">
      <div>/profile…review/46789</div>
      <div class="ml-auto">83</div>
    </div>
    <div class="flex mt-1.5">
      <div>/profile…review/24357</div>
      <div class="ml-auto">21</div>
    </div>
    <button
        class="btn btn-outline-secondary border-dashed w-full py-1 px-2 mt-4"
    >
      Real-Time Report
    </button>
  </div>
</template>
<script setup>
// import ReportBarChart from "@/components/report-bar-chart/Main.vue";
import SimpleColumn from "@/components/charts/column/SimpleColumn.vue";

</script>
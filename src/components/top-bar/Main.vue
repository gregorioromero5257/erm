<template>
  <!-- BEGIN: Top Bar -->
  <div
      class="top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] -mt-7 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12"
  >
    <div class="h-full flex items-center">
      <!-- BEGIN: Logo -->
      <a href="" class="-intro-x hidden md:flex">

<!--        cmatik-dev-alternate-site-->
        <img
            alt="ERM2"
            class="w-6"
            src="https://storage.googleapis.com/cmatik-dev-alternate-site/logo-mini.png"
        />
        <span class="text-white text-lg ml-3"> ERM ©  </span>
      </a>
      <!-- END: Logo -->
      <!-- BEGIN: Breadcrumb -->
      <nav aria-label="breadcrumb" class="-intro-x h-full mr-auto">
        <ol class="breadcrumb breadcrumb-light">
          <li class="breadcrumb-item"><a href="#">Application</a></li>
          <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
        </ol>
      </nav>
      <!-- END: Breadcrumb -->
      <!-- BEGIN: Search -->
      <div class="intro-x relative mr-3 sm:mr-6">
        <div class="search hidden sm:block">
          <input
              type="text"
              class="search__input form-control border-transparent"
              placeholder="Search..."
              @focus="showSearchDropdown"
              @blur="hideSearchDropdown"
          />
          <SearchIcon class="search__icon dark:text-slate-500"/>
        </div>
        <a class="notification notification--light sm:hidden" href="">
          <SearchIcon class="notification__icon dark:text-slate-500"/>
        </a>
        <div class="search-result" :class="{ show: searchDropdown }">
          <div class="search-result__content">
            <div class="search-result__content__title">Pages</div>
            <div class="mb-5">
              <a href="" class="flex items-center">
                <div
                    class="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full"
                >
                  <InboxIcon class="w-4 h-4"/>
                </div>
                <div class="ml-3">Mail Settings</div>
              </a>
              <a href="" class="flex items-center mt-2">
                <div
                    class="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full"
                >
                  <UsersIcon class="w-4 h-4"/>
                </div>
                <div class="ml-3">Users & Permissions</div>
              </a>
              <a href="" class="flex items-center mt-2">
                <div
                    class="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full"
                >
                  <CreditCardIcon class="w-4 h-4"/>
                </div>
                <div class="ml-3">Transactions Report</div>
              </a>
            </div>
            <div class="search-result__content__title">Users</div>
            <div class="mb-5">
              <a
                  v-for="(faker, fakerKey) in $_.take($f(), 4)"
                  :key="fakerKey"
                  href
                  class="flex items-center mt-2"
              >
                <div class="w-8 h-8 image-fit">
                  <img
                      alt="Icewall Tailwind HTML Admin Template"
                      class="rounded-full"
                      :src="faker.photos[0]"
                  />
                </div>
                <div class="ml-3">{{ faker.users[0].name }}</div>
                <div
                    class="ml-auto w-48 truncate text-slate-500 text-xs text-right"
                >
                  {{ faker.users[0].email }}
                </div>
              </a>
            </div>
            <div class="search-result__content__title">Products</div>
            <a
                v-for="(faker, fakerKey) in $_.take($f(), 4)"
                :key="fakerKey"
                href
                class="flex items-center mt-2"
            >
              <div class="w-8 h-8 image-fit">
                <img
                    alt="Icewall Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="faker.images[0]"
                />
              </div>
              <div class="ml-3">{{ faker.products[0].name }}</div>
              <div
                  class="ml-auto w-48 truncate text-slate-500 text-xs text-right"
              >
                {{ faker.products[0].category }}
              </div>
            </a>
          </div>
        </div>
      </div>
      <!-- END: Search -->
      <!-- BEGIN: Notifications -->
      <div class="intro-x dropdown mr-4 sm:mr-6">
        <div
            class="dropdown-toggle notification notification--bullet cursor-pointer"
            role="button"
            aria-expanded="false"
            data-tw-toggle="dropdown"
        >
          <BellIcon class="notification__icon dark:text-slate-500"/>
        </div>
        <div class="notification-content pt-2 dropdown-menu">
          <div class="notification-content__box dropdown-content">
            <div class="notification-content__title">Notifications</div>
            <div
                v-for="(faker, fakerKey) in $_.take($f(), 5)"
                :key="fakerKey"
                class="cursor-pointer relative flex items-center"
                :class="{ 'mt-5': fakerKey }"
            >
              <div class="w-12 h-12 flex-none image-fit mr-1">
                <img
                    alt="Icewall Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="faker.photos[0]"
                />
                <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"
                ></div>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="javascript:;" class="font-medium truncate mr-5">{{
                      faker.users[0].name
                    }}</a>
                  <div class="text-xs text-slate-400 ml-auto whitespace-nowrap">
                    {{ faker.times[0] }}
                  </div>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  {{ faker.news[0].shortContent }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Notifications -->
      <!-- BEGIN: Account Menu -->
      <div class="intro-x dropdown w-8 h-8">
        <div
            class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
            role="button"
            aria-expanded="false"
            data-tw-toggle="dropdown"
        >
          <img
              alt="Icewall Tailwind HTML Admin Template"
              :src="user.photo"
          />
        </div>
        <div class="dropdown-menu w-56">
          <ul
              class="dropdown-content bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
          >
            <li class="p-2">
              <div class="font-medium">
                {{ user.first_name }} {{ user.last_name }}
              </div>
              <div class="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                {{ user.email }}
              </div>
            </li>
            <li>
              <hr class="dropdown-divider border-white/[0.08]"/>
            </li>
            <li>
              <router-link class="dropdown-item hover:bg-white/5" to="/profile">
                <UserIcon class="w-4 h-4 mr-2"/>
                Profile
              </router-link>

            </li>
            <li>
              <a href="" class="dropdown-item hover:bg-white/5">
                <EditIcon class="w-4 h-4 mr-2"/>
                Add Account
              </a>
            </li>
            <li>
              <a href="" class="dropdown-item hover:bg-white/5">
                <LockIcon class="w-4 h-4 mr-2"/>
                Reset Password
              </a>
            </li>
            <li>
              <a href="" class="dropdown-item hover:bg-white/5">
                <HelpCircleIcon class="w-4 h-4 mr-2"/>
                Help
              </a>
            </li>
            <li>
              <hr class="dropdown-divider border-white/[0.08]"/>
            </li>
            <li>
              <a href="" class="dropdown-item hover:bg-white/5" v-on:click="logout">
                <ToggleRightIcon class="w-4 h-4 mr-2"/>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- END: Account Menu -->
    </div>
  </div>
  <!-- END: Top Bar -->
</template>

<script setup>
import {ref, onMounted, reactive, toRefs} from "vue";
import {useAuthStore} from "@/stores/auth";
import {useUserStore} from "@/stores/user";

const auth = useAuthStore()
const searchDropdown = ref(false);


const user = ref({
  first_name: '',
  last_name: '',
  email: '',
  photo: ''
})

onMounted(()=> {
  const userStore = useUserStore()
  userStore.resolveUser()
  user.value =  {
      first_name: userStore.userData.first_name,
      last_name: userStore.userData.last_name,
      email: userStore.userData.email,
      photo: userStore.userData.photo
  }
})

const showSearchDropdown = () => {
  searchDropdown.value = true;
};
const hideSearchDropdown = () => {
  searchDropdown.value = false;
};

const logout = () => {
  auth.logout()
}
</script>

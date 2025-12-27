<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Mobile menu state
const isMenuOpen = ref(false);

// Resources dropdown state
const isResourcesOpen = ref(false);
const resourcesDropdownRef = ref(null);

// Menu controls
const openMenu = () => {
  isMenuOpen.value = true;
  document.body.classList.add("overflow-hidden");
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.classList.remove("overflow-hidden");
};

// Resources dropdown controls
const toggleResources = () => {
  isResourcesOpen.value = !isResourcesOpen.value;
};

const closeResources = () => {
  isResourcesOpen.value = false;
};

// Click outside handler for resources dropdown
const handleClickOutside = (event) => {
  if (
    resourcesDropdownRef.value &&
    !resourcesDropdownRef.value.contains(event.target)
  ) {
    closeResources();
  }
};

// Keyboard handler for escape key
const handleKeydown = (e) => {
  if (e.key === "Escape") {
    closeMenu();
    closeResources();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("click", handleClickOutside);
  document.body.classList.remove("overflow-hidden");
});

// Navigation data
const navLinks = [
  { label: "Pricing", href: "#" },
  { label: "Case Studies", href: "#" },
];

const resourceLinks = [
  { label: "Help center", href: "#" },
  { label: "Guides", href: "#" },
  { label: "Blog", href: "#" },
];
</script>

<template>
  <!-- Navbar -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl">
    <div class="mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
      <!-- Logo -->
      <a
        href="/"
        class="flex items-center gap-2 transition-opacity duration-100 ease-out hover:opacity-65 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black focus-visible:outline-offset-2"
      >
        <div class="text-[22px] tracking-tight text-black">Paraloom.ai</div>
      </a>

      <!-- Desktop Nav (hidden on mobile) -->
      <nav class="hidden lg:flex items-center gap-6">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="text-sm text-black transition-opacity duration-100 ease-out hover:opacity-65 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black focus-visible:outline-offset-2"
        >
          {{ link.label }}
        </a>

        <!-- Resources Dropdown -->
        <div ref="resourcesDropdownRef" class="relative">
          <button
            @click.stop="toggleResources"
            class="text-sm text-black flex items-center gap-1 transition-opacity duration-100 ease-out hover:opacity-65 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            Resources
            <svg
              class="w-3 h-3 transition-transform duration-150 ease-out"
              :class="{ 'rotate-180': isResourcesOpen }"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="#8A8A8A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div
            class="absolute top-full left-0 mt-2 w-52 bg-slate-50 rounded-xl p-2 shadow-xl transition-all duration-150 ease-out"
            :class="
              isResourcesOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-1 pointer-events-none'
            "
          >
            <a
              v-for="resource in resourceLinks"
              :key="resource.label"
              :href="resource.href"
              class="block px-3 py-2.5 text-sm text-black rounded-lg transition-colors duration-100 ease-out hover:bg-slate-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              {{ resource.label }}
            </a>
          </div>
        </div>
      </nav>

      <!-- Desktop Buttons (hidden on mobile) -->
      <div class="hidden lg:flex items-center gap-4">
        <a
          href="#"
          class="text-sm text-black transition-opacity duration-100 ease-out hover:opacity-65 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black focus-visible:outline-offset-2"
          >Log in</a
        >
        <a
          href="#"
          class="bg-[#884dff] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors duration-150 ease-out hover:bg-[#6d3dcc] focus-visible:outline focus-visible:outline-1 focus-visible:outline-black focus-visible:outline-offset-2"
          >Start for free</a
        >
      </div>

      <!-- Mobile Buttons -->
      <div class="flex lg:hidden items-center gap-3">
        <a
          href="#"
          class="bg-[#884dff] text-white text-sm font-medium px-3.5 py-2 rounded-full transition-colors duration-150 ease-out hover:bg-[#6d3dcc] focus-visible:outline focus-visible:outline-1 focus-visible:outline-black focus-visible:outline-offset-2"
          >Start</a
        >
        <button
          class="p-1 transition-opacity duration-100 ease-out hover:opacity-65 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black focus-visible:outline-offset-2"
          aria-label="Open menu"
          @click="openMenu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M3 6H21"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M3 18H21"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Menu Overlay -->
  <div
    class="fixed inset-0 bg-black/25 z-40 lg:hidden transition-opacity duration-200 ease-out"
    :class="
      isMenuOpen
        ? 'opacity-100 pointer-events-auto'
        : 'opacity-0 pointer-events-none'
    "
    @click="closeMenu"
  ></div>

  <!-- Mobile Menu Panel -->
  <div
    class="fixed top-0 right-0 w-4/5 max-w-md h-full bg-white z-50 lg:hidden overflow-y-auto transition-transform duration-300 ease-out"
    :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- Mobile Header -->
    <div
      class="flex items-center justify-between px-6 h-16 border-b border-gray-100"
    >
      <span class="text-lg tracking-tight text-black">Paraloom.ai</span>
      <button
        class="p-1 transition-opacity duration-100 ease-out hover:opacity-65 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black focus-visible:outline-offset-2"
        aria-label="Close menu"
        @click="closeMenu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M6 6L18 18"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Nav Links -->
    <nav class="px-6 py-6">
      <div class="flex flex-col gap-5">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="text-2xl text-black transition-opacity duration-100 ease-out active:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black focus-visible:outline-offset-2"
        >
          {{ link.label }}
        </a>
        <a
          href="#"
          class="text-2xl text-black transition-opacity duration-100 ease-out active:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black focus-visible:outline-offset-2"
          >Log in</a
        >
      </div>

      <!-- Resources Section -->
      <div class="mt-8">
        <span class="text-xs text-slate-500 uppercase tracking-wide"
          >Resources</span
        >
        <div class="flex flex-col gap-4 mt-4">
          <a
            v-for="resource in resourceLinks"
            :key="resource.label"
            :href="resource.href"
            class="text-base text-black transition-opacity duration-100 ease-out active:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            {{ resource.label }}
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

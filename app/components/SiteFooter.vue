<script setup>
import { ref } from "vue";
import { useParticleAnimation } from "@/composables/useParticleAnimation";

const canvasRef = ref(null);

useParticleAnimation(canvasRef, {
  humanCount: 600,
  agentCount: 900,
  groupWaveAmp: 80,
});
</script>

<template>
  <footer class="bg-neutral-950 text-white relative">
    <div class="max-w-screen-2xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-8">
      <!-- Desktop Layout -->
      <div class="hidden md:grid grid-cols-12 gap-8">
        <!-- Case Studies Column -->
        <div class="col-span-4">
          <p class="text-white/40 text-sm font-normal mb-2">Case studies</p>
          <nav class="flex flex-col">
            <a
              href="#"
              class="text-white text-3xl font-normal leading-tight block transition-opacity duration-200 hover:opacity-70"
              >Northwest Preferred FCU</a
            >
            <a
              href="#"
              class="text-white text-3xl font-normal leading-tight block transition-opacity duration-200 hover:opacity-70"
              >Lone Star Credit Union</a
            >
            <a
              href="#"
              class="text-white text-3xl font-normal leading-tight block transition-opacity duration-200 hover:opacity-70"
              >HFS Federal Credit Union</a
            >
            <a
              href="#"
              class="text-white text-3xl font-normal leading-tight block transition-opacity duration-200 hover:opacity-70"
              >On Tap Credit Union</a
            >
            <a
              href="#"
              class="text-white text-3xl font-normal leading-tight block transition-opacity duration-200 hover:opacity-70"
              >Zing Credit Union</a
            >
          </nav>
        </div>

        <!-- Navigation Column -->
        <div class="col-span-3">
          <p class="text-white/40 text-sm font-normal mb-2">Navigation</p>
          <nav class="flex flex-col">
            <a
              href="#"
              class="text-white text-3xl font-normal leading-tight block transition-opacity duration-200 hover:opacity-70"
              >Pricing</a
            >
            <a
              href="#"
              class="text-white text-3xl font-normal leading-tight block transition-opacity duration-200 hover:opacity-70"
              >Log in</a
            >
            <a
              href="#"
              class="text-white text-3xl font-normal leading-tight block transition-opacity duration-200 hover:opacity-70"
              >Register</a
            >
          </nav>
        </div>

        <!-- Policies Column -->
        <div class="col-span-3">
          <p class="text-white/40 text-sm font-normal mb-2">Policies</p>
          <nav class="flex flex-col gap-1">
            <a
              href="#"
              class="text-white/60 text-xs font-normal leading-relaxed block transition-opacity duration-200 hover:opacity-70"
              >Terms of Service</a
            >
            <a
              href="#"
              class="text-white/60 text-xs font-normal leading-relaxed block transition-opacity duration-200 hover:opacity-70"
              >Privacy Policy</a
            >
            <a
              href="#"
              class="text-white/60 text-xs font-normal leading-relaxed block transition-opacity duration-200 hover:opacity-70"
              >Cookie Policy</a
            >
          </nav>
        </div>

        <!-- Empty column for spacing -->
        <div class="col-span-2"></div>
      </div>

      <!-- Mobile Layout -->
      <div class="md:hidden">
        <!-- Case Studies -->
        <div class="mb-12">
          <p class="text-white/40 text-xs font-normal mb-3">Case studies</p>
          <nav class="flex flex-col">
            <a
              href="#"
              class="text-white text-base font-normal leading-normal block transition-opacity duration-200 hover:opacity-70"
              >Northwest Preferred FCU</a
            >
            <a
              href="#"
              class="text-white text-base font-normal leading-normal block transition-opacity duration-200 hover:opacity-70"
              >Lone Star Credit Union</a
            >
            <a
              href="#"
              class="text-white text-base font-normal leading-normal block transition-opacity duration-200 hover:opacity-70"
              >HFS Federal Credit Union</a
            >
            <a
              href="#"
              class="text-white text-base font-normal leading-normal block transition-opacity duration-200 hover:opacity-70"
              >On Tap Credit Union</a
            >
            <a
              href="#"
              class="text-white text-base font-normal leading-normal block transition-opacity duration-200 hover:opacity-70"
              >Zing Credit Union</a
            >
          </nav>
        </div>

        <!-- Navigation -->
        <div class="mb-12">
          <p class="text-white/40 text-xs font-normal mb-3">Navigation</p>
          <nav class="flex flex-col">
            <a
              href="#"
              class="text-white text-base font-normal leading-normal block transition-opacity duration-200 hover:opacity-70"
              >Pricing</a
            >
            <a
              href="#"
              class="text-white text-base font-normal leading-normal block transition-opacity duration-200 hover:opacity-70"
              >Log in</a
            >
            <a
              href="#"
              class="text-white text-base font-normal leading-normal block transition-opacity duration-200 hover:opacity-70"
              >Register</a
            >
          </nav>
        </div>

        <!-- Policies -->
        <div class="mb-12">
          <p class="text-white/40 text-xs font-normal mb-3">Policies</p>
          <nav class="flex flex-col">
            <a
              href="#"
              class="text-white text-base font-normal leading-normal block transition-opacity duration-200 hover:opacity-70"
              >Terms of Service</a
            >
            <a
              href="#"
              class="text-white text-base font-normal leading-normal block transition-opacity duration-200 hover:opacity-70"
              >Privacy Policy</a
            >
            <a
              href="#"
              class="text-white text-base font-normal leading-normal block transition-opacity duration-200 hover:opacity-70"
              >Cookie Policy</a
            >
          </nav>
        </div>
      </div>

      <!-- Particle Animation and Bottom Section -->
      <div class="relative w-screen -ml-[50vw] left-1/2 mt-20 overflow-hidden">
        <div class="relative h-[30vw] min-h-[250px] max-h-[450px] w-full">
          <canvas
            ref="canvasRef"
            class="absolute inset-0 w-full h-full"
            style="image-rendering: pixelated; image-rendering: crisp-edges"
          />
        </div>

        <!-- Bottom Bar - below animation -->
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 px-4 md:px-6 pt-4 pb-2"
        >
          <p class="text-white/40 text-xs">
            © Paraloom 2025. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

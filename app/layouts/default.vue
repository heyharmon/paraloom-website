<template>
  <div class="min-h-screen flex flex-col relative bg-page">
    <!-- Header (positioned absolute over content) -->
    <SiteHeader />

    <!-- Main Content -->
    <main class="flex-1 flex flex-col">
      <slot />
    </main>

    <!-- Footer -->
    <SiteFooter />
  </div>
</template>

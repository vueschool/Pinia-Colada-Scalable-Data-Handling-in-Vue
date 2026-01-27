<script setup lang="ts"></script>

<template>
  <header class="mb-6 border-b border-gray-200 pb-4">
    <nav>
      <NuxtLink
        to="/"
        class="text-xl font-bold text-gray-800 hover:text-gray-600"
      >
        Pinia Colada Course
      </NuxtLink>
      (
      {{ $route.name }}
      )
    </nav>
  </header>
</template>

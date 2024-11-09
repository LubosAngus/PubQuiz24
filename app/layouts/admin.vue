<template>
  <div class="flex flex-row p-6 min-h-[100dvh]">
    <div class="flex-1 max-w-56">
      <QuizSelector />
      <Divider />
      <RoundSelector />
    </div>

    <Divider layout="vertical" />

    <div class="flex-auto">
      <slot />
    </div>
  </div>
</template>

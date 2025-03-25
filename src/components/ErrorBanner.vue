<template>
  <Transition name="fade">
    <div v-if="error" :class="['error-banner', `error-${errorType}`]">
      <div class="error-content">
        <div class="error-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div class="error-message">
          <span class="error-code">Error {{ error.status }}:</span>
          <span>{{ error.message }}</span>
        </div>
      </div>
      <button class="error-close" @click="dismissError">×</button>
    </div>
  </Transition>
</template>

<script lang="ts">
import { ApiError } from "../services/api";

export default {
  data() {
    return {
      errorType: "generic",
    };
  },
  props: { error: ApiError | null, dismissError: Function },
  computed: {
    errorType() {
      if (!this.error) return "generic";
      if (this.error.status >= 500) return "server";
      if (this.error.status >= 400) return "client";
      if (this.error.status === 0) return "network";
      return "generic";
    },
  },
};
</script>

<style scoped>
.error-banner {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 350px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

.error-content {
  display: flex;
  align-items: center;
}

.error-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.error-message {
  font-size: 14px;
  line-height: 1.4;
}

.error-code {
  font-weight: bold;
  margin-right: 4px;
}

.error-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.error-close:hover {
  opacity: 1;
}

/* Error type styles */
.error-client {
  background-color: #fff3e0;
  color: #e65100;
  border-left: 4px solid #ff9800;
}

.error-server {
  background-color: #ffeaea;
  color: #d32f2f;
  border-left: 4px solid #f44336;
}

.error-network {
  background-color: #e8eaf6;
  color: #303f9f;
  border-left: 4px solid #3f51b5;
}

.error-generic {
  background-color: #f5f5f5;
  color: #424242;
  border-left: 4px solid #9e9e9e;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

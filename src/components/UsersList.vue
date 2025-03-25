<template>
  <div class="users-container">
    <h1>Users List</h1>

    <!-- Loading state -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading users...</p>
    </div>

    <!-- Users list -->
    <div v-else class="users-grid">
      <div v-for="user in users" :key="user.id" class="user-card">
        <div class="user-card-header">
          <h2 class="user-name">{{ user.name }}</h2>
        </div>
        <div class="user-card-content">
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Phone:</strong> {{ user.phone }}</p>
          <p><strong>Website:</strong> {{ user.website }}</p>
          <p><strong>Company:</strong> {{ user.company.name }}</p>
        </div>
      </div>
    </div>

    <!-- Test error button -->
    <div class="test-error-container">
      <button @click="testError" class="test-error-button">
        Test Error Handling (404)
      </button>
    </div>
  </div>

  <ErrorBanner :errorMessage="error" />
</template>

<script lang="ts">
import { getUsers, getUserById, User, ApiError } from "../services/api";
import ErrorBanner from "./ErrorBanner.vue";
export default {
  data() {
    return {
      users: <User[]>[],
      loading: false,
      error: null | ApiError,
    };
  },
  methods: {
    async loadUsers() {
      this.loading = true;
      const result = await getUsers();
      if (result) {
        this.users = result;
        console.log(this.users);
      }
      this.loading = false;
    },
    async testError() {
      try {
        await getUserById(9999);
      } catch (err) {
        this.error = err;
      }
    },
  },
  mounted() {
    this.loadUsers();
  },
  components: {
    ErrorBanner,
  },
};
</script>

<style scoped>
.users-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 24px;
  color: #333;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  text-align: center;
  padding: 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.reload-button {
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.reload-button:hover {
  background-color: #369e6b;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.user-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.user-card-header {
  padding: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.user-name {
  font-size: 18px;
  margin: 0;
}

.user-card-content {
  padding: 16px;
}

.user-card-content p {
  margin: 8px 0;
  font-size: 14px;
}

.test-error-container {
  margin-top: 40px;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #eee;
}

.test-error-button {
  padding: 8px 16px;
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.test-error-button:hover {
  background-color: #c62828;
}
</style>

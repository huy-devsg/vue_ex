<script setup>
import {
  getListUserApi,
  getListUserById,
  updateUserApi,
  deleteUserApi,
} from '../apis/userApi.js'
import EditUser from './EditUser.vue'

// import ModalEdit from './ModalEdit.vue'
</script>
<template>
  <!-- modal -->
  <div
    v-if="isModalOpen !== false"
    id="authentication-modal"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-10 left-10 z-50 justify-center items-center w-full md:inset-0 max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Edit User
          </h3>
          <button
            type="button"
            class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            @click="isModalOpen = false"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only" @click="isModalOpen = false"
              >Close modal</span
            >
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5">
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Email</label
            >
            <input
              v-model="userEdit.email"
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Full name</label
            >
            <input
              v-model="userEdit.full_name"
              type="text"
              name="fullName"
              id="fullName"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-5 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="updateUser(userEdit)"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
  <table
    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
  >
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
        <th scope="col" class="px-6 py-3">ID</th>
        <th scope="col" class="px-6 py-3">Avatar</th>
        <th scope="col" class="px-6 py-3">Email</th>
        <th scope="col" class="px-6 py-3">Full name</th>
        <th scope="col" class="px-6 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(user, index) in listUser"
        :key="index"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {{ user.id }}
        </th>
        <td class="px-6 py-4">
          <img :src="user.avatar" alt="" height="50" width="50" />
        </td>
        <td class="px-6 py-4">{{ user.email }}</td>
        <td class="px-6 py-4">{{ user.full_name }}</td>

        <td class="px-6 py-4 text-left">
          <button
            class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            @click="editUser(user)"
          >
            Edit
          </button>
          <button
            type="button"
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            @click="delUser(user.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  components: {
    EditUser,
  },
  data() {
    return {
      listUser: [],
      userEdit: {},
      isModalOpen: false,
      extraData: 'kkkk',
    }
  },
  methods: {
    async fetchListUser() {
      try {
        this.listUser = await getListUserApi()
      } catch (err) {
        console.log('err: ', err)
      }
    },
    async editUser(user) {
      try {
        this.userEdit = await getListUserById(user)
        this.isModalOpen = !this.isModalOpen
      } catch {}
    },
    async updateUser(user) {
      if (confirm('Bạn chắc chắn cập nhật tài khoản ?')) {
        const update = await updateUserApi(user)
        if (update) {
          this.isModalOpen = !this.isModalOpen
          this.fetchListUser()
        }
      }
    },
    async delUser(userId) {
      if (confirm('Bạn chắc chắn muốn xóa tài khoản ?')) {
        const del = await deleteUserApi(userId)
        if (del) {
          this.fetchListUser()
        }
      }
    },
  },
  // watch: {
  //   listUser() {
  //     this.fetchListUser()
  //   },
  // },
  mounted() {
    this.fetchListUser()
  },
}
</script>

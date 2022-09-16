<script setup>
import { useUsers } from '@/stores/user'
import ApplicationLogo from '@/components/ApplicationLogo.vue'

const store = useUsers()

const auth = store.authUser
</script>

<template>
    <div
        class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <div
                    class="mx-auto flex items-center justify-center h-12 w-auto">
                    <router-link to="/">
                        <ApplicationLogo
                            class="w-20 h-20 fill-current text-gray-500" />
                    </router-link>
                </div>
                <p
                    class="mt-14 font-semibold text-sm text-center text-indigo-600">
                    404 ERROR
                </p>
                <h2
                    class="mt-2 text-center text-5xl font-extrabold text-gray-900">
                    Page not found.
                </h2>
                <p class="mt-4 text-center text-lg font-medium text-gray-500">
                    Sorry, we couldn't find the page you're looking for.
                </p>
                <router-link
                    v-if="auth"
                    to="/dashboard"
                    class="mt-8 flex justify-center font-semibold text-sm text-indigo-600 hover:text-indigo-500">
                    Go back dashboard
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </router-link>
                <router-link
                    v-else
                    to="/"
                    class="mt-8 flex justify-center font-semibold text-sm text-indigo-600 hover:text-indigo-500">
                    Go back home
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

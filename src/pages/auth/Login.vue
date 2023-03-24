<script setup>
import { useRoute } from 'vue-router'
import { useUsers } from '@/stores/user'
import { computed, ref } from 'vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import Checkbox from '@/components/Checkbox.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import TextInput from '@/components/TextInput.vue'
import InputLabel from '@/components/InputLabel.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const route = useRoute()

const store = useUsers()

const form = ref({
    email: '',
    password: '',
    remember: false,
})

const processing = ref(false)

const setErrors = ref()

const errors = computed(() => setErrors.value)

const status = route.query.reset?.length > 0 ? atob(route.query.reset) : null

const submitLogin = () => {
    store.login(form, setErrors, processing)
}
</script>

<template>
    <GuestLayout>
        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <ValidationErrors class="mb-4" :errors="errors" />

        <form @submit.prevent="submitLogin">
            <div>
                <InputLabel for="email" value="Email" />
                <TextInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    autocomplete="username" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />
                <TextInput
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="current-password" />
            </div>

            <div class="block mt-4">
                <label class="flex items-center">
                    <Checkbox
                        v-model="form.remember"
                        name="remember"
                        :checked="form.remember" />
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">
                <router-link
                    to="/forgot-password"
                    class="underline text-sm text-gray-600 hover:text-gray-900">
                    Forgot your password?
                </router-link>
                <PrimaryButton class="ml-4" :processing="processing">
                    Login
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>

<script setup>
import { useUsers } from '@/stores/user'
import { computed, ref } from 'vue'
import BreezeButton from '@/components/Button.vue'
import BreezeGuestLayout from '@/layouts/Guest.vue'
import BreezeInput from '@/components/Input.vue'
import BreezeLabel from '@/components/Label.vue'
import BreezeValidationErrors from '@/components/ValidationErrors.vue'

const store = useUsers()

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
})

const processing = ref(false)

const setErrors = ref()

const errors = computed(() => setErrors.value)

const submitRegister = () => {
    store.register(form, setErrors, processing)
}
</script>

<template>
    <BreezeGuestLayout>
        <BreezeValidationErrors class="mb-4" :errors="errors" />

        <form @submit.prevent="submitRegister">
            <div>
                <BreezeLabel for="name" value="Name" />
                <BreezeInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name" />
            </div>

            <div class="mt-4">
                <BreezeLabel for="email" value="Email" />
                <BreezeInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="username" />
            </div>

            <div class="mt-4">
                <BreezeLabel for="password" value="Password" />
                <BreezeInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password" />
            </div>

            <div class="mt-4">
                <BreezeLabel
                    for="password_confirmation"
                    value="Confirm Password" />
                <BreezeInput
                    id="password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <router-link
                    to="/login"
                    class="underline text-sm text-gray-600 hover:text-gray-900">
                    Already registered?
                </router-link>

                <BreezeButton class="ml-4" :processing="processing">
                    Register
                </BreezeButton>
            </div>
        </form>
    </BreezeGuestLayout>
</template>

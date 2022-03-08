<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUsers } from '@/stores/user'
import BreezeButton from '@/components/Button.vue'
import BreezeGuestLayout from '@/layouts/Guest.vue'
import BreezeInput from '@/components/Input.vue'
import BreezeLabel from '@/components/Label.vue'
import BreezeValidationErrors from '@/components/ValidationErrors.vue'

const route = useRoute()

const store = useUsers()

const token = route.params.token

const email = route.query.email

const form = ref({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
})

const processing = ref(false)

const setErrors = ref()

const errors = computed(() => setErrors.value)

const submit = () => {
    store.resetPassword(form, setErrors, processing)
}
</script>

<template>
    <BreezeGuestLayout>
        <BreezeValidationErrors class="mb-4" :errors="errors" />

        <form @submit.prevent="submit">
            <div>
                <BreezeLabel for="email" value="Email" />
                <BreezeInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autofocus
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
                <BreezeButton class="ml-4" :processing="processing">
                    Reset Password
                </BreezeButton>
            </div>
        </form>
    </BreezeGuestLayout>
</template>

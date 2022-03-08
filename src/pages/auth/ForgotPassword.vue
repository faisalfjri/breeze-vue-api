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
    email: '',
})

const processing = ref(false)

const setStatus = ref()

const setErrors = ref()

const status = computed(() => setStatus.value)

const errors = computed(() => setErrors.value)

const submit = () => {
    store.forgotPassword(form, setStatus, setErrors, processing)
}
</script>

<template>
    <BreezeGuestLayout>
        <div class="mb-4 text-sm text-gray-600">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

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

            <div class="flex items-center justify-end mt-4">
                <BreezeButton class="ml-4" :processing="processing">
                    Email Password Reset Link
                </BreezeButton>
            </div>
        </form>
    </BreezeGuestLayout>
</template>

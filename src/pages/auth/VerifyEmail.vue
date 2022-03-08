<script setup>
import { onBeforeMount, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsers } from '@/stores/user'
import BreezeButton from '@/components/Button.vue'
import BreezeGuestLayout from '@/layouts/Guest.vue'

const router = useRouter()

const store = useUsers()

const processing = ref(false)

const setStatus = ref()

const status = computed(() => setStatus.value === 'verification-link-sent')

onBeforeMount(() => {
    if (store.hasVerified) {
        router.push({ name: 'dashboard' })
    }
})

const submit = () => {
    store.resendEmailVerification(setStatus, processing)
}

const submitLogout = () => {
    store.logout()
}
</script>

<template>
    <BreezeGuestLayout>
        <div class="mb-4 text-sm text-gray-600">
            Thanks for signing up! Before getting started, could you verify your
            email address by clicking on the link we just emailed to you? If you
            didn't receive the email, we will gladly send you another.
        </div>

        <div class="mb-4 font-medium text-sm text-green-600" v-if="status">
            A new verification link has been sent to the email address you
            provided during registration.
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <BreezeButton :processing="processing">
                    Resend Verification Email
                </BreezeButton>

                <a
                    @click="submitLogout"
                    href="#"
                    as="button"
                    class="underline text-sm text-gray-600 hover:text-gray-900"
                    >Log Out</a
                >
            </div>
        </form>
    </BreezeGuestLayout>
</template>

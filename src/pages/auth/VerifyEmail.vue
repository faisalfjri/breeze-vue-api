<script setup>
import { onBeforeMount, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsers } from '@/stores/user'
import PrimaryButton from '@/components/PrimaryButton.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

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
    <GuestLayout>
        <div class="mb-4 text-sm text-gray-600">
            Thanks for signing up! Before getting started, could you verify your
            email address by clicking on the link we just emailed to you? If you
            didn't receive the email, we will gladly send you another.
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            A new verification link has been sent to the email address you
            provided during registration.
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <PrimaryButton :processing="processing">
                    Resend Verification Email
                </PrimaryButton>

                <a
                    href="#"
                    as="button"
                    class="underline text-sm text-gray-600 hover:text-gray-900"
                    @click="submitLogout"
                    >Log Out</a
                >
            </div>
        </form>
    </GuestLayout>
</template>

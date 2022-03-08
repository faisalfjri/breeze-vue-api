import axios from '@/lib/axios'
import { useStorage } from '@vueuse/core'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useUsers = defineStore('users', {
    state: () => ({
        userLogin: useStorage('userLogin', {}),
        userData: useStorage('userData', []),
        authStatus: useStorage('authStatus', []),
    }),

    getters: {
        authUser: state => state.authStatus === 204,
        hasUserData: state => Object.keys(state.userData).length > 0,
        hasVerified: state =>
            Object.keys(state.userData).length > 0
                ? state.userData.email_verified_at !== null
                : false,
    },

    actions: {
        getData() {
            axios
                .get('/api/user')
                .then(response => {
                    this.userData = response.data
                })
                .catch(error => {
                    if (error.response.status !== 409) throw error

                    this.router.push('/verify-email')
                })
        },

        async register(form, setErrors, processing) {
            await csrf()

            processing.value = true

            axios
                .post('/register', form.value)
                .then(response => {
                    this.authStatus = response.status
                    processing.value = false

                    this.router.push({ name: 'dashboard' })
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },

        async login(setErrors, processing) {
            await csrf()

            processing.value = true

            axios
                .post('/login', this.userLogin)
                .then(response => {
                    this.authStatus = response.status
                    processing.value = false

                    this.router.push({ name: 'dashboard' })
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },

        async forgotPassword(form, setStatus, setErrors, processing) {
            await csrf()

            processing.value = true

            axios
                .post('/forgot-password', form.value)
                .then(response => {
                    setStatus.value = response.data.status
                    processing.value = false
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },

        async resetPassword(form, setErrors, processing) {
            await csrf()

            processing.value = true

            axios
                .post('/reset-password', form.value)
                .then(response => {
                    this.router.push(
                        '/login?reset=' + btoa(response.data.status),
                    )
                    processing.value = false
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },

        resendEmailVerification(setStatus, processing) {
            processing.value = true

            axios.post('/email/verification-notification').then(response => {
                setStatus.value = response.data.status
                processing.value = false
            })
        },

        async logout() {
            await axios
                .post('/logout')
                .then(() => {
                    this.$reset()
                    if (!this.userLogin.remember) {
                        this.userLogin = {}
                    }
                    this.userData = {}
                    this.authStatus = []

                    this.router.push({ name: 'welcome' })
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error
                })
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot))
}

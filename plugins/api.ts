import consola from "consola";
import {ErrorCode} from "../composables/useCustomFetch";

export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig()
    const authStore = useAuthStore()
    let {token} = storeToRefs(authStore)
    const cookieToken = useCookie('token')
    const api = $fetch.create({
        baseURL: `${config.public.apiAddress}/api/`,
        onRequest({request, options, error}) {
            if (cookieToken.value) {
                options.headers.set('Authorization', cookieToken.value)
            } else if (!cookieToken.value && token.value) {
                options.headers.set('Authorization', token.value)
            }
        },
        onResponseError({response}) {
            throw createError({
                statusCode: response.status,
                message: ErrorCode[response.status]
            })
        },

        // async onResponseError({response}) {
        //     if (response.status === 401) {
        //         await nuxtApp.runWithContext(() => navigateTo('/login'))
        //     }
        // }
    })
    return {
        provide: {
            api
        }
    }
})

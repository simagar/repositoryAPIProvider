import type {AxiosError} from 'axios'
import axios from 'axios'
import {useAuthStore} from "~/stores/auth.ts";
import {useToast} from "~/composables/useToast";

export const useAxios = (form?: boolean) => {
    const config = useRuntimeConfig()
    const authStore = useAuthStore()
    const route = useRoute();
    const router = useRouter();
    // you need to set token in cookie. this will fix every thing. remember to do it
    let {token} = storeToRefs(authStore)
    const authHeader = ref({})
    const cookieToken = useCookie('token')
    if (token.value) {
        Object.assign(authHeader.value, {'Authorization': token.value})
    } else if (cookieToken.value) {
        Object.assign(authHeader.value, {'Authorization': cookieToken.value})

    }
    const axiosInstance = axios.create({
        //@ts-ignore

        baseURL: `${config.public.apiAddress}/api`,
        headers: {
            "Content-type": form ? 'multipart/form-data' : "application/json",
            ...authHeader.value
        },

    })
    axiosInstance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const axiosError = error as AxiosError;
        if (axiosError) {
            if (axiosError.response?.status === 401) {
                //@ts-ignore
                if (!process.server) {
                    useToast().toastError("به صفحه ی ورود هدایت می شوید")
                    router.push('/customer-panel/auth/login')
                    authStore.logout()

                }
            }
            if (axiosError.response?.status === 403) {
                useToast().toastError("شما دسترسی های لازم برای مشاهده ی این صفحه یا عملیات را ندارید");
                router.push('/')
            }
            if (axiosError.code == 'ERR_NETWORK') {
                useToast().toastError("خطا در برقرار ارتباط با سرور")
            }
            if (axiosError.response?.status === 500) {
                useToast().toastError("خطا در ارتباط با سرور");
            }
        }
        return Promise.reject(error);
    });


    return axiosInstance


}

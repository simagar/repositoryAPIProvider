import type {UseFetchOptions} from 'nuxt/app'
export enum ErrorCode {
    'ابتدا وارد حساب کاربری خود شوید' = 401,
    'دسترسی شما به این منابع امکان پذیر نیست' = 403,
    'خطا در برقراری ارتباط با سرور. با پشتیبان سایت تماس حاصل فرمایید' = 405,
    'صفحه مورد نظر یافت نشد' = 404,
    'صفحه مورد نظر از سامانه حذف شده است' = 410,
    'خطا در برقراری ارتباط با سرور. دوباره تلاش کنید' = 500,
}
export function useCustomFetch<T>(
    url: string | (() => string),
    options?: UseFetchOptions<T>,
) {
    return useFetch(url, {
        ...options,

        onResponseError({response}) {
            throw createError({
                statusCode: response.status,
                message: ErrorCode[response.status] ? ErrorCode[response.status] : response._data ? response._data : 'unknown error'
            })
        },
        $fetch: useNuxtApp().$api as typeof $fetch
    })
}
import {useAxios} from "~/composables/axios/useAxios";

type HTTPMethods = 'POST' | 'GET' | 'PUT' | 'DELETE'
export default (url: string, method: HTTPMethods = 'POST') => ({
    async setTag() {
        try {
            const res = await useAxios()(url, {
                method: method
            })
            return res.data
        } catch (error: any) {
            errorHand(error.response)
        }
    },
    async setTagWithoutAPIResult() {
        try {
            const res = await useAxios()(url, {
                method: method
            })
            return res
        } catch (error: any) {
            errorHandler(error.response)
        }
    },
    async setParams(params: object | null) {
        try {
            const res = await useAxios()(url, {
                method: method,
                params: params ? JSON.parse(JSON.stringify(params)) : ''
            })
            return res.data
        } catch (error: any) {
            errorHandler(error.response)
        }
    },
    async setBody(body: object) {
        try {
            const res = await useAxios()(url, {
                method: method,
                data: JSON.parse(JSON.stringify(body))
            })
            return res.data
        } catch (error: any) {
            errorHandler(error.response)
        }
    },
    async setPartial(params: object) {
        let partialString = '';
        Object.values(params).forEach((value) => {
            partialString += `/${value}`
        })
        try {
            const res = await useAxios()(url + partialString, {
                method: method,
            })
            if (res.data.isSuccess) {
                return res.data
            } else {
                if (res.data.errorMessage) {
                    useToast().toastError(res.data.errorMessage)
                }
            }
        } catch (error: any) {
            errorHandler(error.response)
        }
    },
    async setFormData(body: any, progressCallback: (ProgressEvent: any) => void) {
        try {
            const res = await useAxios(true)(url, {
                method: method,
                data: body,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                //@ts-ignore
                onUploadProgress: progressEvent => {
                    return progressCallback(progressEvent)
                }
            })
            if (typeof res.data === 'number') {
                return res.data
            } else {

                if (res.data.isSuccess) {
                    return res.data
                } else {
                    if (res.data.errorMessage) {
                        useToast().toastError(res.data.errorMessage)
                    }
                }
            }
        } catch (error: any) {
            errorHandler(error.response)
        }
    },
    async setConfig(config: any) {
        try {
            const res = await useAxios()(url, config)
            if (res.data.isSuccess) {
                return res.data
            } else {
                if (res.data.errorMessage) {
                    useToast().toastError(res.data.errorMessage)
                }
            }
        } catch (error: any) {
            errorHandler(error.response)
        }
    },
    async setConfigNoServiceResult(config: any) {
        try {
            const res = await useAxios()(url, {method: method, ...config})
            return res.data
        } catch (error: any) {
            errorHandler(error.response)
        }
    },
})

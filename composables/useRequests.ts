import {useCustomFetch} from "~/composables/useCustomFetch";
import type {AsyncData} from "#app";

export default (url: string, method: string | "POST") => ({
    async setParams(param: object | null, ssr: boolean | true): AsyncData<DataT, ErrorT> {
        return useCustomFetch(url, {
            params: param ? JSON.parse(JSON.stringify(param)) : null,
            method,
            server: ssr ? ssr : true,

        })
    },
    async setConfig(param: object | null, body: object | null, ssr: boolean | true): AsyncData<DataT, ErrorT> {
        return useCustomFetch(url, {
            params: param ? JSON.parse(JSON.stringify(param)) : null,
            body: body ? JSON.parse(JSON.stringify(body)) : null,
            method,
            server: ssr ? ssr : true,

        })
    },
    async setTag(ssr: boolean | true): AsyncData<DataT, ErrorT> {
        return useCustomFetch(url, {
            method,
            server: ssr ? ssr : true,

        });

    },
    async setBody(body: object, ssr: boolean | true): AsyncData<DataT, ErrorT> {
        return useCustomFetch(url, {
            method,
            body: body ? JSON.parse(JSON.stringify(body)) : null,
            server: ssr ? ssr : true,


        })
    },
    async setPartial(params: object, ssr: boolean | ture): AsyncData<DataT, ErrorT> {
        let partialString = '';
        Object.values(params).forEach((value) => {
            partialString += `/${value}`
        })
        return useCustomFetch(url + partialString, {
            method,
            body: null,
            server: ssr ? ssr : true,


        })
    },
    async setFormData(body: any, progressCallback: (ProgressEvent: ProgressEvent) => void, ssr: boolean | true): AsyncData<DataT, ErrorT> {
        return useCustomFetch(url, {
            method,
            body: body,
            server: ssr ? ssr : true,

            onUploadProgress: function (progressEvent: ProgressEvent): void {
                return progressCallback(progressEvent)
            },
        })
    },

})

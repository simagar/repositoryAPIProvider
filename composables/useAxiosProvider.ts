import useRequestCenter from "../axios/useAxiosRequests";

export const useAxiosProvider = {
    getExample: useRequestCenter('/Example', 'POST'),
}

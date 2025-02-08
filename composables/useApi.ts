import useRequestCenter from "../composables/useRequests";

export const useApi = {
    getLogo: useRequestCenter('Dashboard/GetLogo', 'PUT'),
}

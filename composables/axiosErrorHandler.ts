const fatalErrors: object = {
    404: 'not found',
    500: 'server error',
    401: 'you are unauthorized to access this resource',
    403: 'forbidden, token invalid',
    405: 'Method Not Allowed'
}

export default (errorData: any) => {
    // @ts-ignore
    if (fatalErrors[errorData.status]) {
        // @ts-ignore
        useToast.toastError(fatalErrors[errorData.status])
    } else {
        // @ts-ignore
        throw errorData
    }

}

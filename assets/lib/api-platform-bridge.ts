import routerProvider from '@pankod/refine-react-router-v6'
import JsonServer from '@pankod/refine-simple-rest'
import axios, {AxiosInstance} from 'axios'
import * as React from 'react'

///////////////////////////////////////////////
const axiosInstance = axios.create({
    headers: {
        'Accept': 'application/json',
    }
})
const patchedAxiosInstance = {
    ...axiosInstance,
    patch(url, data?, config?) {
        return axiosInstance.patch(url, data, {
            ...(config ?? {}),
            headers: {
                'Content-Type': 'application/merge-patch+json',
            }
        })
    }
} as AxiosInstance

export const apiPlatformDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = patchedAxiosInstance
) => {
    return JsonServer(apiUrl, httpClient)
}

///////////////////////////////////////////////
export const subPathRouterProvider = (basename: string) => {
    return {
        ...routerProvider,
        RouterComponent: (props) => {
            return React.createElement(routerProvider.RouterComponent,{
                basename,
                ...props
            })
        }
    }
}

import {ErrorComponent, Layout, notificationProvider, ReadyPage} from "@pankod/refine-antd"
import '@pankod/refine-antd/dist/styles.min.css'
import {Refine} from "@pankod/refine-core"
import {createRoot} from 'react-dom/client'
import {apiPlatformDataProvider, subPathRouterProvider} from './lib/api-platform-bridge'
import articles from './resources/articles'

const MOUNT_PATH = '/refine';
const API_URL = '/api'

const resources = [
    articles,
    // ここにリソースごとの UI を足していく
]

function AdminApp() {
    return <Refine
        routerProvider={subPathRouterProvider(MOUNT_PATH)}
        dataProvider={apiPlatformDataProvider(API_URL)}
        Layout={Layout}
        ReadyPage={ReadyPage}
        notificationProvider={notificationProvider}
        catchAll={<ErrorComponent/>}
        resources={resources}
    />
}

const root = createRoot(document.getElementById("root"))
root.render(<AdminApp/>)

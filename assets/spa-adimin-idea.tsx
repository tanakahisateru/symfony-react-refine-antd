import {createRoot} from 'react-dom/client'
import {
    useQuery,
    // useMutation,
    // useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

interface Article {
    id: number
    title: string
    body: string
}

function ArticleList() {
    const {isLoading, data} = useQuery<Article[]>('articles', async () => {
        const res = await fetch("/api/articles", {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                Accept: 'application/json',
            },
        })
        return await res.json()
    })
    if (isLoading) {
        return <div>Loading</div>
    }
    return (
        <ul>
            {data?.map((article) => (
                <li>
                    <h2>{article.title}</h2>
                    <p>{article.body}</p>
                </li>
            ))}
        </ul>
    )
}

function AdminApp() {
    return (
        <QueryClientProvider client={queryClient}>
            <h1>Articles</h1>
            <ArticleList/>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    )
}

const root = createRoot(document.getElementById("root"))
root.render(<AdminApp />)

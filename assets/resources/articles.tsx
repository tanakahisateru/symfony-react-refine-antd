import {
    Create, DeleteButton,
    Edit, EditButton,
    Form,
    Input,
    List,
    Show,
    ShowButton, Space,
    Table,
    Typography,
    useForm,
    useTable,
} from '@pankod/refine-antd'
import {IResourceItem, useShow} from '@pankod/refine-core'

export default {
    name: 'articles',
    list: ArticleList,
    show: ArticleShow,
    create: ArticleCreate,
    edit: ArticleEdit,
} as IResourceItem

export interface Article {
    id: number
    title: string
    body: string
}

function ArticleList() {
    const {tableProps} = useTable<Article>()
    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id"/>
                <Table.Column dataIndex="title" title="Title"/>
                <Table.Column dataIndex="body" title="Body"/>
                <Table.Column<Article> title="Actions" render={(text, record) => {
                    return (
                        <Space>
                            <ShowButton recordItemId={record.id}/>
                            <EditButton recordItemId={record.id}/>
                            <DeleteButton recordItemId={record.id}/>
                        </Space>
                    )
                }}/>
            </Table>
        </List>
    )
}

function ArticleShow() {
    const {queryResult: {data, isLoading}} = useShow<Article>()
    const article = data?.data
    return (
        <Show isLoading={isLoading}>
            <Typography.Title level={5}>Title</Typography.Title>
            <Typography.Text>{article?.title}</Typography.Text>
            <Typography.Title level={5}>Body</Typography.Title>
            <Typography.Paragraph>{article?.body}</Typography.Paragraph>
        </Show>
    )
}

function ArticleCreate() {
    const {saveButtonProps, formProps} = useForm<Article>()
    return (
        <Create saveButtonProps={saveButtonProps}>
            <ArticleForm formProps={formProps}/>
        </Create>
    )
}

function ArticleEdit() {
    const {saveButtonProps, formProps} = useForm<Article>()
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <ArticleForm formProps={formProps}/>
        </Edit>
    )
}

function ArticleForm({formProps}) {
    return <Form {...formProps}>
        <Form.Item label="Title" name="title">
            <Input/>
        </Form.Item>
        <Form.Item label="Body" name="body">
            <Input.TextArea rows={10}/>
        </Form.Item>
    </Form>
}


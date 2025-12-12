// users.component.tsx
import React, { useMemo, useState } from 'react';
import { Table, Avatar, Button, Space, Modal, Input, Popconfirm, Descriptions, Form, message } from 'antd';
import { UserOutlined, EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import useStyles from './users.style';
import { IUser } from './users.d';
import dayjs from 'dayjs';
import {useCreateOrUpdateUser, useDeleteUser, useUsersQuery} from './actions/users.query';

const { Search } = Input;

const UsersComponent: React.FC = () => {
    const classes = useStyles();
    const { data: users = [], isLoading } = useUsersQuery();
    const deleteMutation = useDeleteUser();
    const saveMutation = useCreateOrUpdateUser();

    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [editingUser, setEditingUser] = useState<IUser | null>(null);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [filter, setFilter] = useState('');

    const [form] = Form.useForm();

    const filtered = useMemo(() => {
        if (!filter) return users;
        const q = filter.toLowerCase();
        return users.filter(u =>
            `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
            (u.email || '').toLowerCase().includes(q) ||
            String(u.id).includes(q)
        );
    }, [users, filter]);

    function openEdit(user?: IUser) {
        setEditingUser(user ? { ...user } : { id: 0, firstName: '', lastName: '', email: '', dob: '' });
        form.setFieldsValue(user ? { ...user } : { firstName: '', lastName: '', email: '', dob: '' });
        setVisibleEdit(true);
    }

    function handleView(user: IUser) {
        setSelectedUser(user);
    }

    async function handleDelete(id: number) {
        try {
            await deleteMutation.mutateAsync(id);
            message.success('User deleted');
            if (selectedUser?.id === id) setSelectedUser(null);
        } catch (e) {
            message.error('Failed to delete');
        }
    }

    async function handleSave() {
        try {
            const vals = await form.validateFields();
            const payload: IUser = {
                ...(editingUser || { id: 0 }),
                ...vals
            };
            await saveMutation.mutateAsync(payload);
            message.success('Saved');
            setVisibleEdit(false);
        } catch (e) {
            // validation handles messages
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 70,
            sorter: (a: IUser, b: IUser) => a.id - b.id
        },
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'name',
            render: (_: any, row: IUser) => (
                <div className={classes.nameCell}>
                    <Avatar size={44} className={classes.avatar} src={row.avatar}>
                        {!row.avatar && <UserOutlined />}
                    </Avatar>
                    <div>
                        <div style={{ fontWeight: 700, color: '#0f3c74' }}>{row.firstName} {row.lastName}</div>
                        <div style={{ fontSize: 12, color: '#6b7a90' }}>{row.email}</div>
                    </div>
                </div>
            )
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            key: 'dob',
            width: 120,
            render: (val: string) => val ? dayjs(val).format('DD.MM.YYYY') : '-'
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 160,
            render: (_: any, row: IUser) => (
                <Space size='small'>
                    <Button icon={<EyeOutlined />} onClick={() => handleView(row)} />
                    <Button icon={<EditOutlined />} onClick={() => openEdit(row)} />
                    <Popconfirm title='Silmək istədiyinizə əminsiniz?' onConfirm={() => handleDelete(row.id)}>
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div className={classes.container}>
            <div className={classes.tableWrap}>
                <div className={classes.headerRow}>
                    <div>
                        <div className={classes.title}>İstifadəçilər</div>
                        <div className={classes.smallMuted}>Sistemdə mövcud bütün istifadəçilər</div>
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                        <Search placeholder='Axtar: ad, email, id...' onSearch={val => setFilter(val)} onChange={e => setFilter(e.target.value)} style={{ width: 260 }} allowClear />
                        <Button type='primary' icon={<PlusOutlined />} onClick={() => openEdit()}>
                            Yeni
                        </Button>
                    </div>
                </div>

                <Table
                    rowKey='id'
                    columns={columns}
                    dataSource={filtered}
                    loading={isLoading}
                    pagination={{ pageSize: 6 }}
                />
            </div>

            <div className={classes.rightPanel}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontWeight: 800, color: '#08306b' }}>Detallar</div>
                        <div className={classes.smallMuted}>Seçilmiş istifadəçi haqqında ətraflı</div>
                    </div>
                    <div className={classes.pill}>{selectedUser ? `#${selectedUser.id}` : '—'}</div>
                </div>

                {selectedUser ? (
                    <Descriptions column={1} bordered size='small'>
                        <Descriptions.Item label='Ad'>
                            {selectedUser.firstName} {selectedUser.lastName}
                        </Descriptions.Item>
                        <Descriptions.Item label='Email'>{selectedUser.email}</Descriptions.Item>
                        <Descriptions.Item label='DOB'>{selectedUser.dob ? dayjs(selectedUser.dob).format('DD.MM.YYYY') : '-'}</Descriptions.Item>
                        <Descriptions.Item label='Avatar'>
                            <Avatar size={64} src={selectedUser.avatar}>
                                {!selectedUser.avatar && <UserOutlined />}
                            </Avatar>
                        </Descriptions.Item>
                    </Descriptions>
                ) : (
                    <div style={{ color: '#6b7a90' }}>İstifadəçi seçilməyib. Cədvəldən baxmaq üçün göz ikonuna basın.</div>
                )}

                <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
                    <Button disabled={!selectedUser} onClick={() => selectedUser && openEdit(selectedUser)}>Edit</Button>
                    <Popconfirm title='Silmək istədiyinizə əminsiniz?' onConfirm={() => selectedUser && handleDelete(selectedUser.id)}>
                        <Button danger disabled={!selectedUser}>Delete</Button>
                    </Popconfirm>
                </div>
            </div>

            <Modal
                title={editingUser?.id ? 'İstifadəçini redaktə et' : 'Yeni istifadəçi'}
                visible={visibleEdit}
                onCancel={() => setVisibleEdit(false)}
                onOk={handleSave}
                okText='Yadda saxla'
            >
                <Form layout='vertical' form={form} initialValues={editingUser || {}}>
                    <Form.Item label='Ad' name='firstName' rules={[{ required: true, message: 'Ad daxil edin' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label='Soyad' name='lastName' rules={[{ required: true, message: 'Soyad daxil edin' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label='Email' name='email' rules={[{ type: 'email', required: true, message: 'Email düzgün deyil' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label='Doğum tarixi' name='dob'>
                        <Input placeholder='YYYY-MM-DD' />
                    </Form.Item>

                    <Form.Item label='Avatar URL' name='avatar'>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UsersComponent;

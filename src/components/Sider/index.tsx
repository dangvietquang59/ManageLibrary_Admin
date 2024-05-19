'use client'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <PieChartOutlined />, label: <Link href={'/chart'}>Thống kê</Link> },
  { key: '2', icon: <DesktopOutlined />, label: <Link href={'/user'}>Quản lý người dùng</Link> },
  { key: '3', icon: <ContainerOutlined />, label: <Link href={'/manage-loan'}>Quản lý mượn trả</Link> },
  {
    key: 'sub2',
    label: 'Quản lý sách',
    icon: <AppstoreOutlined />,
    children: [
        { key: '11', label: <Link href={'/manage-book/book'}>Sách</Link>  },
      { key: '9', label: <Link href={'/manage-book/author'}>Tác giả</Link> },
      { key: '10', label: <Link href={'/manage-book/genre'}>Thể loại</Link>  },
    ],
  },
];

const Sider: React.FC = () => {

  return (
    <div className='w-[20%]'>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
        className='h-full'
      />
    </div>
  );
};

export default Sider;
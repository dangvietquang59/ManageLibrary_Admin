'use client'
import { Book } from "@/utils/type/book";
import { ITableLoanProps } from "@/utils/type/table";
import { User } from "@/utils/type/user";
import { Table, TableColumnsType } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function MangeLoan() {
    const column: TableColumnsType<ITableLoanProps> = [
        {
            title: 'Tên sách',
            dataIndex: 'book',
            render: (book: Book) => book?.title
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'book',
            render: (book: Book) => <img src={book?.image} alt="Book" style={{ width: '50px' }} />
        },
        {
            title: 'Thể loại',
            dataIndex: 'book',
            render: (book: Book) => book?.genre
        },
        {
            title: 'Tác giả',
            dataIndex: 'book',
            render: (book: Book) => book?.author
        },
        {
            title: 'Người mượn',
            dataIndex: 'user',
            render: (user: User) => user?.fullName
        },
        {
            title: 'Email',
            dataIndex: 'user',
            render: (user: User) => user?.email
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'user',
            render: (user: User) => user?.phoneNumber
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'user',
            render: (user: User) => user?.address
        },
        {
            title: 'Ngày trả',
            dataIndex: 'returnDate'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'statusBorrow',
            render: status => (
                <span className={`${status ? 'bg-green-600' : 'bg-orange-600'} p-[10px] text-white rounded`}>
                    {status ? 'Đã duyệt' : 'Chờ duyệt'}
                </span>
            )
        },
        {
            title:'Chức năng',
            render: btn => <button  className="bg-green-600 text-white rounded p-[10px]">Chấp nhận</button>
        }
    ];
    
    const [data, setData] = useState<ITableLoanProps[]>([])
    useEffect(() => {
        const fetchDataLoan = async () => {
            try {
                const res = await axios.get('http://localhost:5000/v2/books/get-loan');
                console.log(res.data); // Kiểm tra cấu trúc dữ liệu trả về từ API
                const formattedData = res.data.map((item: any) => ({
                    book: {
                        title: item.bookId.Title,
                        image: item.bookId.Image,
                        genre: item.bookId.Genre,
                        author: item.bookId.Author,
                        bookId: item.bookId._id,
                        quantity: item.bookId.Quantity,
                        status: item.bookId.Status,
                        summary: item.bookId.Summary,
                        createdAt: item.bookId.createdAt
                    },
                    user: {
                        fullName: item.userId.fullName,
                        email: item.userId.email,
                        phoneNumber: item.userId.phoneNumber,
                        address: item.userId.address,
                    },
                    returnDate: item.returnDate,
                    statusBorrow: item.statusBorrow
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchDataLoan();
    }, []);
   
    return ( 
        <div className="max-w-[1400px]">
            <span className="font-bold text-[20px]">Danh sách mượn - trả sách</span>
            <Table columns={column} dataSource={data} scroll={{ x: 'max-content' }} pagination={{pageSize:5}}/>
        </div>
     );
}

export default MangeLoan;
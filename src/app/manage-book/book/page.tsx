'use client'
import { Button, Input, InputNumber, Modal, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "antd/es/input/Search";
import cloudinary from "../../../config/cloudinaryConfig"; // Add the path to your cloudinaryConfig file

interface ITableProps {
  Author: string,
  Genre: string,
  Image: string,
  Quantity: number,
  Status: string,
  Summary: string,
  Title: string,
  _id: string
}

export default function Book() {
  const [dataBook, setDataBook] = useState<ITableProps[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<ITableProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [newBook, setNewBook] = useState({
    Title: '',
    Genre: '',
    Author: '',
    Summary: '',
    Quantity: 0 as number | null,
    Image: ''
  });

  const handleShowModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!); 
      console.log('abc',process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
      try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
        setNewBook({ ...newBook, Image: res.data.secure_url });
        message.success('Image uploaded successfully');
      } catch (error) {
        message.error('Image upload failed');
        console.log(error);
      }
    }
  };
  

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/v2/books/get-books');
        setDataBook(res.data);
        setFilteredBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookData();
  }, []);

  useEffect(() => {
    setFilteredBooks(
      dataBook.filter(book => 
        book.Title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, dataBook]);

  const columns: ColumnsType<ITableProps> = [
    {
      title: 'Tên sách',
      dataIndex: 'Title'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'Image',
      render: image => <img src={image} className="w-[150px] " />
    },
    {
      title: 'Thể loại',
      dataIndex: 'Genre'
    },
    {
      title: 'Tác giả',
      dataIndex: 'Author'
    },
    {
      title: 'Tóm tắt',
      dataIndex: 'Summary'
    },
    {
      title: 'Số lượng',
      dataIndex: 'Quantity',
      sorter: (a, b) => a.Quantity - b.Quantity
    },
    {
      title: 'Tình trạng',
      dataIndex: 'Status',
      render: status => <p className="p-[10px] bg-lime-600 rounded text-[#fff]">{status}</p>
    }
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-[12px]">
        <Button onClick={handleShowModal}>Thêm sách mới</Button>
        <Search 
          style={{ width: 200 }} 
          placeholder="Enter name book"
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <Table columns={columns} dataSource={filteredBooks} pagination={{ pageSize: 6 }} />
      {isOpen && (
        <Modal title={'Thêm sách mới'} open={isOpen} onCancel={handleShowModal}>
          <div className="my-[12px]">
            <p>Tên sách</p>
            <Input 
              name="Title"
              placeholder="Enter book name"
              type="text" 
              value={newBook.Title}
              onChange={handleChange}
            />
          </div>
  
          <div>
            <p>Thể loại</p>
            <Input 
              name="Genre"
              placeholder="Enter book genre" 
              type="text" 
              value={newBook.Genre}
              onChange={handleChange}
            />
          </div>
  
          <div className="my-[12px]">
            <p>Tác giả</p>
            <Input 
              name="Author"
              placeholder="Enter book author"
              value={newBook.Author}
              onChange={handleChange}
            />
          </div>
  
          <div>
            <p>Tóm tắt</p>
            <Input 
              name="Summary"
              placeholder="Enter summary book" 
              type="text"
              value={newBook.Summary}
              onChange={handleChange}
            />
          </div>
  
          <div className="my-[12px]">
            <p>Số lượng</p>
            <InputNumber 
              name="Quantity"
              placeholder="Enter quantity book" 
              type="numeric" 
              className="w-full"
              value={newBook.Quantity}
              onChange={value => setNewBook({ ...newBook, Quantity: value || 0 })}
            />
          </div>
  
          <div className="my-[12px]">
            <p>Hình ảnh</p>
            <Input 
              type="file" 
              onChange={handleImageUpload}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

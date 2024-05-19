'use client'
import { Button, Input, InputNumber, Modal, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "antd/es/input/Search";


interface ITableProps {
  Author: string,
  Genre:string,
  Image:string,
  Quantity:10,
  Status: string,
  Summary: string,
  Title:string,
  _id:string
}

export default function Book() {
  const [dataBook,setDataBook] = useState<ITableProps[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleShowModal = () => {
    setIsOpen(!isOpen)
  }
  useEffect(()=>{
    const fetchBookData = async () =>{
      try {
        const res = await axios.get('http://localhost:5000/v2/books/get-books')
        setDataBook(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBookData()
  },[])
 


  const columns: ColumnsType<ITableProps> = [
    {
      title:'Tên sách',
      dataIndex:'Title'
    },
    {
      title:'Hình ảnh',
      dataIndex:'Image',
      render: image => <img src={image} className="w-[150px] "/>
    },
    {
      title:'Thể loại',
      dataIndex:'Genre'
    },
    {
      title:'Tác giả',
      dataIndex:'Author'
    },
    {
      title:'Tóm tắt',
      dataIndex:'Summary'
    },
    {
      title:'Số lượng',
      dataIndex:'Quantity',
      sorter: (a,b) => a.Quantity - b.Quantity
    },
    {
      title:'Tình trạng',
      dataIndex:'Status',
      render: status => <p className="p-[10px] bg-lime-600 rounded text-[#fff]">{status}</p>
    }
  ]
  return (
    <>
      <div className="flex justify-between items-center mb-[12px]">
        <Button onClick={handleShowModal}>Thêm sách mới</Button>
        <Search style={{width:200}} placeholder="Enter name book"/>
      </div>
      <Table columns={columns} dataSource={dataBook} pagination={{pageSize:6}}/>
      {isOpen  && <Modal title={'Thêm sách mới'} open={isOpen} onCancel={handleShowModal}>
          <div className="my-[12px]">
            <p>Tên sách</p>
            <Input placeholder="Enter book name" type="text"/>
          </div>
  
         <div>
            <p>Thể loại</p>
            <Input placeholder="Enter book name" type="text"/>
         </div>
  
         <div className="my-[12px]">
            <p>Tác giả</p>
            <Select defaultValue={'Robber'}  options={[
              {value:'Jack',label:'Jack'},
              {value:'Benzema',label:'Benzema'},
              {value:'Vini JR',label:'Vini JR'},
            ]}
            style={{width:120}}
            />
         </div>
  
      <div>
            <p>Tóm tắt</p>
            <Input placeholder="Enter summary book" type="text"/>
      </div>
  
        <div className="my-[12px]">
            <p>Số lượng</p>
            <InputNumber placeholder="Enter quantity book" type="numeric"/>
    
        </div>
  
          <div>
            <p>Tình trạng</p>
            <Select defaultValue={'Robber'}  options={[
              {value:'Jack',label:'Jack'},
              {value:'Benzema',label:'Benzema'},
              {value:'Vini JR',label:'Vini JR'},
            ]}
            style={{width:120}}
            />
          </div>
          <div className="my-[12px]">
            <p>Hình ảnh</p>
            <Input type="file"/>
          </div>
        </Modal>}
    </>
  );
}

'use client'
import { Button,  Input } from "antd";
import { useRouter } from "next/navigation";
function Login() {
    const router = useRouter()
    const handleLogin = () =>{
        router.push('/manage-book/book')
    }
    return ( 
        <div className="w-[500px] h-[350px] border-[1px] border-[#ccc] m-auto mt-[150px] rounded-[8px]">
            <div className="text-center p-[20px]">
                <span className="font-bold text-[30px] mb-[100px]">Sign in</span>
                <Input placeholder="Enter your email" type="text" className="mt-[20px] p-[20px]"/>
                <Input placeholder="Enter your password" type="password" className="mt-[20px] p-[20px]"/>
                <Button className="w-full mt-[20px] h-[50px]" type="primary" onClick={handleLogin}>Sign in</Button>
            </div>
        </div> 
    );
}

export default Login;
import Link from "next/link"
import { Card } from "./ui/card"

const AdvocateCard = ({name, type, lawyerImg, email, number, id, cases, rating}) => {
    return(
        <Link href={`find/${id}`}>
            <Card className="border-input w-full p-[15px] bg-transparent overflow-hidden border-[2px] hover:border-[#4A92FE] cursor-pointer relative transition-all">
            <div className="py-2 px-3 rounded-md">
                <div className="flex gap-3">
                    <img src={lawyerImg} className="h-12 w-12 rounded-full" alt="" />
                    <div className="">
                        <div className="flex items-center">
                            <h1 className="text-medium mr-2 font-medium">{name}</h1>
                            <p className="text-sm">({rating ? rating : 0}⭐)</p>
                        </div>
                        <p className="text-gray-400 text-sm font-semibold">{type}</p>
                    </div>
                </div>
                <div className="flex mt-3 font-medium align-center text-sm">
                    <p className="text-gray-400 mr-2">Cases fought: </p>
                    <p className="">{cases}</p>
                </div>
                <div className="flex mt-1 font-medium align-center text-sm">
                    <p className="text-gray-400 mr-2">Contact number: </p>
                    <p className="">+91 {number}</p>
                </div>
                <div className="flex mt-1 font-medium align-center text-sm">
                    <p className="text-gray-400 mr-2">Email: </p>
                    <p className="">{email}</p>
                </div>
            </div>
            </Card>
        </Link>
    )
}

export default AdvocateCard
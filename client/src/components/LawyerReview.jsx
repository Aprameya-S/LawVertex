import { Card } from "./ui/card";

export default function LawyerReview({name, title, rating, review, profileImage}) {
    return(
        <Card className="border-input w-full p-[15px] bg-transparent overflow-hidden border-[2px] hover:border-[#4A92FE] cursor-pointer relative transition-all">
            <div className="">
                <div className="flex items-center gap-3">
                    <img src={profileImage} className="h-12 w-12 rounded-full" alt="" />
                    <div className="text-sm">
                        <h1>{name}</h1>
                        <h2>({rating}⭐)</h2>
                    </div>

                </div>
                <h1 className="font-medium mt-2">{title}</h1>
                <p className="text-sm font-medium text-gray-400 ">{review}</p>
            </div>
        </Card>
    )
}
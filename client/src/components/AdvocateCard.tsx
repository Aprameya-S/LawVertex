const AdvocateCard = () => {
    return(
        <div className="border-2 border-gray-500 py-2 px-3 rounded-md">
            <div className="flex gap-3">
                <img src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="h-12 w-12 rounded-full" alt="" />
                <div className="">
                    <h1 className="text-medium font-medium">Joshua T</h1>
                    <p className="text-gray-400 text-sm font-semibold">Criminal lawyer</p>
                </div>
            </div>
        </div>
    )
}

export default AdvocateCard
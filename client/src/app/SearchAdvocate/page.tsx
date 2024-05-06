import AdvocateCard from "../../components/AdvocateCard"

const Page = () => {
    return(
        <>
            <h1 className="text-lg mt-5 font-medium">Advocates</h1>
            <div className="grid grid-cols-3 gap-5">
               <AdvocateCard />
               <AdvocateCard />
               <AdvocateCard />
               <AdvocateCard />

            </div>
        </>
    )
}
export default Page
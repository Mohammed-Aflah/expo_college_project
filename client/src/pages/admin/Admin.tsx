
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { ExpoModal } from "./ExpoModal";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { getAllExpo } from "@/redux/actions/User/authAction";


const invoices = [
  {
    title: "malappuram",
    image:
      "https://www.visitdubai.com/-/media/gathercontent/article/u/ultimate-guide-to-expo-2020-dubai/media/dtcm-expo-2020-surreal-water-feature.jpg",
    date: "23/23/2023",
    time: "10:00AM",
    description: "aslkdfjaslkdjfklasdjflkasjdflkasjdlkfjaslkdfj",
  },
];
function AdminExpoList() {
const dispatch:AppDispatch=useDispatch()
  const {expos}=useSelector((state:RootState)=>state.expos)
  useEffect(()=>{
    dispatch(getAllExpo())
  },[dispatch,expos])
  return (
    <main className="w-full h-screen flex py-5 flex-col justify-start gap-10">
        <div className="w-[95%] sm:w-[70%] mx-auto flex justify-end border-t border-b py-5">
            {/* <Button className="">Add Expo</Button> */}
            <ExpoModal/>
        </div>
      <Table className="w-[95%] sm:w-[70%] mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead >Title of Expo</TableHead>
            <TableHead>Date of Expo</TableHead>
            <TableHead>District</TableHead>
            <TableHead >Image</TableHead>
            <TableHead className="text-right">description</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {expos?.map((expo) => (
            <TableRow key={expo._id}>
              <TableCell className="font-medium">{expo.title}</TableCell>
              <TableCell>{expo.date}</TableCell>
              <TableCell>{expo.district}</TableCell>
              <TableCell>
                <img src={expo.coverImage} className="h-12 rounded-full object-cover" alt="" />
              </TableCell>
              <TableCell className="text-right line-clamp-1">
                <span>{expo.description}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
export default AdminExpoList;

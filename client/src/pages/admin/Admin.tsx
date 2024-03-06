
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { ExpoModal } from "./ExpoModal";


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
  return (
    <main className="w-full h-screen flex py-5 flex-col justify-start gap-10">
        <div className="w-[95%] sm:w-[70%] mx-auto flex justify-end border-t border-b py-5">
            {/* <Button className="">Add Expo</Button> */}
            <ExpoModal/>
        </div>
      <Table className="w-[95%] sm:w-[70%] mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title of Expo</TableHead>
            <TableHead>Date of Expo</TableHead>
            <TableHead>Time of Expo</TableHead>
            <TableHead >Image</TableHead>
            <TableHead className="text-right">description</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.title}>
              <TableCell className="font-medium">{invoice.title}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.time}</TableCell>
              <TableCell>
                <img src={invoice.image} className="h-12 rounded-full object-cover" alt="" />
              </TableCell>
              <TableCell className="text-right line-clamp-1">
                <span>{invoice.description}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
export default AdminExpoList;

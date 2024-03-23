import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { format } from "date-fns";

interface ChildProp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expoData: any;
}
export function ExpoDetail({ expoData }: ChildProp) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full font-bold">View Details</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[35%]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between">
            <span>Expo detail</span>
            <AlertDialogCancel className="border-none p-0 bg-transparent">
              <X className="w-5" />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="w-full flex flex-col">
              <div className="w-full h-56 overflow-hidden">
                <img
                  src={expoData.coverImage}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-full flex justify-between mt-2">
                <div>
                  <h1 className="text-2xl">{expoData.title}</h1>
                </div>
                <div>
                  <h1 className="text-2xl">{format(expoData.date, "PPP")}</h1>
                </div>
                <div>
                  <h1 className="text-2xl">{expoData.district}</h1>
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-2 mt-3">
                {expoData.artForms.map((value) => {
                  return (
                    <div
                      className="w-full h-32 border flex justify-between rounded-lg overflow-hidden"
                      key={value._id}
                    >
                      <div className="h-full w-32">
                        <img
                          src={value.image}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                      <div className="h-full flex flex-col justify-between p-2 items-start w-52">
                        <div>
                          <h1 className="text-lg">{value.title}</h1>
                        </div>
                        <div>
                          <h1 className="text-lg">{value.seats} seats available</h1>
                        </div>
                        <div>
                          <h1 className="">{value.appliedseat} seats has been filled</h1>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

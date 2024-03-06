import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getIndiaState, getIndiaDistrict } from "india-state-district";
import upload from "../../assets/212.svg";
import upload2 from "../../assets/227.svg";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Upload, X } from "lucide-react";
import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { SelectGroup } from "@radix-ui/react-select";

export function ExpoModal() {
  const [date, setDate] = useState<Date>();
  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
  };
  const states = getIndiaState();
  console.log("Indian States:", states);

  const districts: string[] = getIndiaDistrict("KL");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Add new Expo</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[45%] h-[650px] overflow-y-auto">
        <AlertDialogHeader className="grid grid-cols-1  w-full ">
          <div className="grid grid-cols-2">
            <div>
              <AlertDialogTitle>Add Expo</AlertDialogTitle>
            </div>
            <div className="flex justify-end">
              <AlertDialogCancel className="p-0 h-auto w-5 border-none">
                <X />
              </AlertDialogCancel>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-1 gap-3">
          <div className="w-full h-28 border rounded-md overflow-hidden relative">
            <img src={upload} className="object-cover h-full mx-auto " alt="" />
            <button className="absolute right-0 bottom-0 border flex items-center justify-center rounded-full bg-white text-black h-7 w-7">
              <Upload className="w-5" />
            </button>
          </div>
          <div className="flex justify-between gap-3  w-full pr-2">
            <Input
              type="text"
              placeholder="Enter Title of the Expo"
              className="w-full"
            />

            {/* <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem> */}
            {/*  */}
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {districts.map((value: string, idx) => {
                    return (
                      <SelectItem value={value} key={idx}>
                        {value}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 ">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* <AlertDialogFooter className="grid grid-cols-1 w-full gap-3 p-0 "> */}
          <div className="w-full">
            <Textarea placeholder=" Description of expo" />
          </div>
          <div className="h-auto w-full rounded-md border grid-cols-1 p-4 ">
            <div className="flex justify-between w-full gap-3">
              <Input type="text" placeholder="Enter title of Artform" />
              <Input type="text" placeholder="Enter available seats" />
            </div>
            <div className="w-full h-28 border rounded-md overflow-hidden relative mt-3 items-center justify-center">
              <img src={upload2} className="object-cover h-full mx-auto " alt="" />
              <button className="absolute right-0 bottom-0 border flex items-center justify-center rounded-full bg-white text-black h-7 w-7">
                <Upload className="w-5" />
              </button>
            </div>
            <div className="mt-3 flex justify-end">
              <Button>Add artform </Button>
            </div>
          </div>
          <div className="w-full h-16">
            <Button type="submit" className="w-full font-semibold">Submit</Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

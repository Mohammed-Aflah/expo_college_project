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
import { getIndiaDistrict } from "india-state-district";
import upload from "../../assets/212.svg";
import upload2 from "../../assets/227.svg";
import { Input } from "@/components/ui/input";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  coverImge: yup.mixed().required('Cover Image is required'),
  description: yup.string().required('Description is required'),
  date: yup.date().required('Date is required'),
  district: yup.string().required('District is required'),
  artForms: yup.array().of(
    yup.object().shape({
      title: yup.string().required('Artform Title is required'),
      seats: yup.number().required('Artform Seats is required'),
      image: yup.mixed().required('Artform Image is required'),
    })
  ),
});
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
import {  useRef, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { SelectGroup } from "@radix-ui/react-select";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { uploadExpo } from "@/redux/actions/User/allUserAction";
export function ExpoModal() {
  const [date, setDate] = useState<Date>();
  // Validate the form data

  const [loading1,setLoading]=useState<boolean>(false)

  // https://api.cloudinary.com/v1_1/dzaoju6lr/image/upload
  // const imageUrl = response.data.secure_url

  const districts: string[] = getIndiaDistrict("KL");


  function handleTextInputChange(e) {
    setExpoDetails({ ...expoDetails, [e.target.name]: e.target.value });
  }
  const [expoDetails, setExpoDetails] = useState({
    title: "",
    coverImge: null,
    description: "",
    date: new Date(),
    district: "",
    artForms: [{ id: uuid(), title: "", seats: 0, image: null }],
  });
  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setExpoDetails({ ...expoDetails, date: new Date(selectedDate) });
  };
  const handleArtFormChange = (index, e) => {

    const newArtForms = expoDetails.artForms.map((artForm, artFormIndex) => {
      if (index === artFormIndex) {
        return { ...artForm, [e.target.name]: e.target.value };
      }
      return artForm;
    });

    setExpoDetails({ ...expoDetails, artForms: newArtForms });
  };

  const handleArtFormImageChange = (index, e) => {
    const file = e.target.files[0]; // Get the file
    const newArtForms = expoDetails.artForms.map((artForm, artFormIndex) => {
      if (index === artFormIndex) {
        return { ...artForm, image: file };
      }
      return artForm;
    });

    setExpoDetails({ ...expoDetails, artForms: newArtForms });
  };
  const addArtForm = () => {
    const newArtForm = {
      id: uuid(),
      title: "",
      seats: "",
      image: null,
    };
    setExpoDetails({
      ...expoDetails,
      artForms: [...expoDetails.artForms, newArtForm],
    });
  };

  const removeArtForm = (id) => {
    const filteredArtForms = expoDetails.artForms.filter(
      (artForm) => artForm.id !== id
    );
    if (filteredArtForms.length < 1) {
      toast.error("Need At least one artform");
      return;
    }
    setExpoDetails({
      ...expoDetails,
      artForms: filteredArtForms,
    });
  };

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset','ml_default')
  
    try {
      // 9d43f0bc549b13f9aed6c48d798762
      const response = await fetch('https://api.cloudinary.com/v1_1/dzaoju6lr/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return ''; // Handle the error appropriately
    }
  };
  const dispatch:AppDispatch=useDispatch()
  const Clsref=useRef<HTMLButtonElement>(null)
  const {loading}=useSelector((state:RootState)=>state.expos)
  const handleSubmit = async () => {
    try {
      await validationSchema.validate(expoDetails, { abortEarly: false });
    } catch (validationErrors) {
      console.error(validationErrors.errors);
      toast.error(validationErrors.errors)
      return;
    }
    console.log(expoDetails.artForms,' 99');
    
    setLoading(true)
    
    let coverImageUrl=""
    if(expoDetails.coverImge){
      coverImageUrl=await uploadImageToCloudinary(expoDetails.coverImge)
    }
    console.log(coverImageUrl)
    const artFormsWithUploadedImages = await Promise.all(expoDetails.artForms.map(async (artForm) => {
      let imageUrl = artForm.image ? await uploadImageToCloudinary(artForm.image) : null;
      return { ...artForm, image: imageUrl }; // Replace local image file with Cloudinary URL
    }));

    const updatedExpoDetails = {
      ...expoDetails,
      coverImage: coverImageUrl,
      artForms: artFormsWithUploadedImages,
    };

    const formData = new FormData();
    formData.append("title", updatedExpoDetails.title);
    formData.append("description", updatedExpoDetails.description);
    formData.append("date", updatedExpoDetails.date.toISOString()); // Assuming date handling on the server expects a string
    formData.append("district", updatedExpoDetails.district);
    // Append cover image if it exists
    if (coverImageUrl) {
      formData.append("coverImage", coverImageUrl);
    }
    // Append each art form data
    expoDetails.artForms.forEach((artForm, index) => {
      formData.append(`artForms[${index}][title]`, artForm.title);
      formData.append(`artForms[${index}][seats]`, Number(artForm.seats));
      if (artForm.image) {
        formData.append(`artForms[${index}][image]`, artForm.image);
      }
    });

    // Here you would submit formData to your server/API
    // For example: axios.post('/api/expo', formData);
    console.log([...formData]); // For demonstration; remove in production
    console.log(formData);
    console.log(updatedExpoDetails);
    setLoading(false)
    await dispatch(uploadExpo(updatedExpoDetails))
    toast.success(" Expo added ")
    Clsref.current?.click()
  };

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
              <AlertDialogCancel className="p-0 h-auto w-5 border-none" ref={Clsref}>
                <X />
              </AlertDialogCancel>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-1 gap-3">
          <div className="w-full h-28 border rounded-md overflow-hidden relative py-2">
            <img
              src={
                expoDetails.coverImge
                  ? URL.createObjectURL(expoDetails.coverImge)
                  : upload
              }
              className="object-cover h-full mx-auto "
              alt=""
            />
            <input
              type="file"
              className="hidden"
              id="cover"
              onChange={(e) => {
                if (e?.target?.files[0]) {
                  setExpoDetails({
                    ...expoDetails,
                    coverImge: e.target.files[0],
                  });
                }
              }}
            />
            <label
              htmlFor="cover"
              className="cursor-pointer absolute right-0 bottom-0 border flex items-center justify-center rounded-full bg-white text-black h-7 w-7"
            >
              <Upload className="w-5" />
            </label>
          </div>
          <div className="flex justify-between gap-3  w-full pr-2">
            <Input
              type="text"
              name="title"
              onChange={handleTextInputChange}
              placeholder="Enter Title of the Expo"
              className="w-full"
            />

            {/* <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem> */}
            {/*  */}
            <Select
              onValueChange={(value) => {
                setExpoDetails({ ...expoDetails, district: value });
              }}
            >
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
            <Textarea
              placeholder=" Description of expo"
              name="description"
              onChange={handleTextInputChange}
            />
          </div>
          {expoDetails.artForms.map((value, index) => {
            return (
              <div
                className="h-auto w-full rounded-md border grid-cols-1 p-4 "
                key={value.id}
              >
                <div className="flex justify-between w-full gap-3">
                  <Input
                    type="text"
                    placeholder="Enter title of Artform"
                    name="title"
                    onChange={(e) => handleArtFormChange(index, e)}
                  />
                  <Input
                    type="text"
                    placeholder="Enter available seats"
                    name="seats"
                    onChange={(e) => handleArtFormChange(index, e)}
                  />
                </div>
                <div className="w-full h-28 border rounded-md overflow-hidden relative mt-3 items-center justify-center py-2">
                  {value.image ? (
                    <>
                      <img
                        src={URL.createObjectURL(value.image)}
                        className="object-cover h-full mx-auto "
                        alt="Artform"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={upload2}
                        alt=""
                        className="object-cover h-full mx-auto"
                      />
                    </>
                  )}

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleArtFormImageChange(index, e)}
                    id={`art-form-image-${index}`}
                  />
                  <label
                    htmlFor={`art-form-image-${index}`}
                    className="absolute right-0 bottom-0 border flex items-center justify-center rounded-full bg-white text-black h-7 w-7"
                  >
                    <Upload className="w-5" />
                  </label>
                </div>
                <div className="mt-3 flex justify-end gap-3">
                  <Button onClick={addArtForm}>Add artform </Button>
                  <Button onClick={() => removeArtForm(value.id)}>
                    Remove artform{" "}
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="w-full h-16">
            <Button
              type="submit"
              className={`w-full font-semibold ${loading||loading1&&"pointer-events-none bg-gray-400"}`}
              onClick={handleSubmit}
            >
              {loading||loading1?"Processing":"Submit"}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

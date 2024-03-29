import { Button } from "@/components/ui/button";
import { getAllExpo } from "@/redux/actions/User/authAction";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSkelton from "./cardSkelton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getIndiaDistrict } from "india-state-district";
import { ExpoDetail } from "./ExpoDetail";
import { Filter } from "lucide-react";
function Chat() {
  const dispatch: AppDispatch = useDispatch();
  const { expos, loading } = useSelector((state: RootState) => state.expos);
  useEffect(() => {
    dispatch(getAllExpo({ district: "" }));
  }, [dispatch]);
  const districts: string[] = getIndiaDistrict("KL");
  const [Expos, setAllExpos] = useState();
  useEffect(() => {
    setAllExpos(expos);
  }, [expos]);
  const [filter, setIsFilter] = useState<boolean>(false);
  return (
    <main className="flex flex-col gap-5 p-5">
      <div className="w-full py-2 flex justify-end gap-2 border-t border-b mt-2">
        {filter && (
          <div className="h-10  flex items-center gap-3 px-2 border rounded-md bg-primary text-primary-foreground cursor-pointer" onClick={()=>{
            dispatch(getAllExpo({district:""}))
            setIsFilter(false)
          }}>
            <Filter className="w-5" />
            clear filter
          </div>
        )}
        <Select
          onValueChange={(selectedValue) => {
            dispatch(getAllExpo({ district: selectedValue }));
            setIsFilter(true)
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
      </div>
      <section className="w-full mx-auto h-screen   justify-between grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6   gap-3">
        {loading && (
          <>
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
            <CardSkelton />
          </>
        )}

        {!Expos || Expos.length === 0 ? (
          <h1>No Expo found</h1>
        ) : (
          Expos?.map((value) => {
            return (
              <div className="h-96 rounded-xl border flex flex-col overflow-hidden">
                <div className="w-full h-56 border flex items-center justify-center p-1">
                  <img
                    src={value.coverImage}
                    className="h-full object-cover w-full"
                    alt=""
                  />
                </div>
                <div className="h-full flex flex-col p-2 justify-between">
                  <div>
                    <h1 className="font-bold text-lg">{value.title}</h1>
                  </div>
                  <div className="line-clamp-2">
                    <p>{value.description}</p>
                  </div>
                  <div>
                    <ExpoDetail key={value._id} expoData={value} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}

export default Chat;

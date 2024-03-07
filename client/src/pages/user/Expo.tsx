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
function Chat() {
  const dispatch: AppDispatch = useDispatch();
  const { expos, loading } = useSelector((state: RootState) => state.expos);
  useEffect(() => {
    dispatch(getAllExpo());
  }, [dispatch]);
  const districts: string[] = getIndiaDistrict("KL");
  const [Expos, setAllExpos] = useState();
  useEffect(() => {
    setAllExpos(expos);
  }, [expos]);
  return (
    <main className="flex flex-col gap-5 p-5">
      <div className="w-full py-2 flex justify-end border-t border-b mt-2">
        <Select
          onValueChange={(selectedValue) => {
            console.log(JSON.stringify(Expos));
            setAllExpos(
              Expos?.filter((expo) => expo.district === selectedValue)
            );
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
      <section className="w-full mx-auto h-screen   justify-between grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5   gap-3">
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
                <div className="w-full h-56 border flex items-center justify-center">
                  <img
                    src={value.coverImage}
                    className="w-full object-cover"
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
                    <Button className="w-full font-bold">View Details</Button>
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

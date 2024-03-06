import { Button } from "@/components/ui/button";

function Chat() {
  return (
    <section className="w-full mx-auto h-screen   justify-between grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-5  gap-3">
      <div className="h-96 rounded-xl border flex flex-col overflow-hidden">
        <div className="w-full h-56 border flex items-center justify-center">
          <img src={"https://www.visitdubai.com/-/media/gathercontent/article/u/ultimate-guide-to-expo-2020-dubai/media/dtcm-expo-2020-surreal-water-feature.jpg"} 
          className="w-full object-cover"
          alt="" />
        </div>
        <div className="h-full flex flex-col p-2 justify-between">
          <div>
            <h1 className="font-bold text-lg">Malappuram Expo</h1>
          </div>
          <div className="line-clamp-2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic corrupti quam consectetur dolore aliquam molestias ab est veritatis minima ut?
            </p>
          </div>
          <div >
            <Button className="w-full font-bold">View Details</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chat;

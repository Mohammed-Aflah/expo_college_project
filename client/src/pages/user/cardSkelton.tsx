function CardSkelton() {
  return (
    <div className="h-96 rounded-xl border flex flex-col overflow-hidden animate-pulse">
      <div className="w-full h-56 bg-gray-300"></div>
      <div className="h-full flex flex-col p-2 justify-between space-y-4">
        <div>
          <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded-md w-full"></div>
          <div className="h-4 bg-gray-300 rounded-md w-5/6"></div>
        </div>
        <div>
          <div className="h-10 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default CardSkelton
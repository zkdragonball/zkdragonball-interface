const TimeItem = ({title,num}) => {

    return (
        <div className="flex flex-col items-center justify-center">
          <div
            className="w-16 h-16 bg-blue-300 text-black flex justify-center items-center rounded-2xl text-2xl font-bold">{num}
          </div>
          <p className="text-grey-400 text-xs">{title}</p>
        </div>
      )

}
export default TimeItem;
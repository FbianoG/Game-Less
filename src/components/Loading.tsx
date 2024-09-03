const Loading = () => {

    return (
        <div className="w-full gap-x-2 flex justify-center items-center animate-pulse">
            <div
                className="w-7 h-7 bg-lime-500 rounded-full animate-bounce"
            ></div>
            <div
                className="w-7 h-7 bg-green-500 rounded-full animate-bounce"
            ></div>
            <div
                className="w-7 h-7  bg-blue-500 rounded-full animate-bounce"
            ></div>
        </div>

    )
}

export default Loading
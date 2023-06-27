export default function Test() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className={`w-20 h-20 border-green-900 border-4 bg-gradient-to-br from-green-700 to-green-900 rounded-md shadow-lg`} ></div>
            <div className={`w-20 h-20 border-green-800 border-4 bg-gradient-to-br from-green-500 to-green-800 rounded-md shadow-lg`} ></div>
            <div className={`w-20 h-20 border-green-700 border-4 bg-gradient-to-br opacity-90 from-green-400 to-green-700 rounded-md shadow-lg`} ></div>
            <div className={`w-20 h-20 border-green-600 border-4 bg-gradient-to-br opacity-80  from-green-300 to-green-600 rounded-md shadow-lg`} ></div>
            
        </div>
    )
}
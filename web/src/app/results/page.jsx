'use client'
import React from "react"

export default function Results() {
    const [results,setResults] = React.useState([])
    const [loaded, setLoad] = React.useState(false)
    const safRef = React.useRef(null)
    const scrollToSaf = () => safRef.current.scrollIntoView();
    React.useEffect(() => {
        fetch("https://api.saforthis.xyz/results")
        .then(response => {
            return response.json()
        })
        .then(data => {
            setResults(data["data"])
            setLoad(true)
        })
    }, [])
    return(
    <div>
    { loaded ? ( 
        <div className="flex flex-col h-screen w-1/4 py-auto mx-auto space-y-4 font-mono text-white text-sm font-bold leading-6 max-w-xs justify-center">
            <div className="flex flex-col h-[50vh] overflow-y-auto">
                {
                    results.map((thing,index) => {
                        if (thing["name"] == "Saf") {
                            return (
                            <div ref={safRef} key={index} className="select-none p-4 rounded-lg flex items-center justify-center shadow-lg border-2 border-teal-500">
                                <div className="flex flex-grow justify-start">{index+1}.</div>
                                <div className="flex flex-grow justify-center">{thing["name"]}</div>
                                <div className="flex flex-grow justify-end">{thing["win_p"]}%</div>
                            </div>)
                        } else {
                            return (
                                <div key={index} className="select-none p-4 rounded-lg flex items-center justify-center shadow-lg">
                                    <div className="flex flex-grow justify-start">{index+1}.</div>
                                    <div className="flex flex-grow justify-center">{thing["name"]}</div>
                                    <div className="flex flex-grow justify-end">{thing["win_p"]}%</div>
                                </div>
                            )
                        }
                    })
                }
            </div>
                <div onClick={scrollToSaf} className="select-none p-4 rounded-lg flex items-center justify-center bg-sky-500 shadow-lg">See Saf!</div>
                <a href="/"><div className="select-none p-4 rounded-lg flex items-center justify-center border-2 border-indigo-500 shadow-lg">Vote</div></a>
        </div>
        ) : (<p>That dam saf.</p>)
    } </div>
    )
}
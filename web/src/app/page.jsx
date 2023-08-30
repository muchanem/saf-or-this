'use client' 
import React from "react"

export default function Home() {
    const [things, setThings] = React.useState([])
    const [currentThing,setCurrent] = React.useState({})
    const [loaded, setLoad] = React.useState("false")

    React.useEffect(() => {
        fetch("http://104.236.3.179:8000/things")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setThings(data["data"])
                setCurrent(data["data"][0]) 
                setLoad("loaded")
            })
    }, []);
    const vote = (win) => {
        if (win) {
            fetch("http://104.236.3.179:8000/vote/?" + new URLSearchParams({"thingid": currentThing["uuid"]}))
        } else {
            fetch("http://104.236.3.179:8000/appeared/?" + new URLSearchParams({"thingid": currentThing["uuid"]}))
        }
        setCurrent(things[1])
        setThings(things.slice(1))
        if (things.length < 3) {
            fetch("http://104.236.3.179:8000/things")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setThings(things.concat(data["data"]))
            })
        }
    }
    switch (loaded) {
        case "false": {
            return (
                <p>That dam saf.</p>
            )
        }
        case "loaded": {
            return (
            <main className="flex flex-col h-screen my-auto mx-auto space-y-4 font-mono text-white text-sm font-bold leading-6 max-w-xs justify-center">
                <div onClick={() => vote(false)} className="select-none p-4 rounded-lg flex items-center justify-center bg-sky-500 shadow-lg">Saf</div>
                <div onClick={() => vote(true)} className="select-none p-4 rounded-lg flex items-center justify-center bg-teal-500 shadow-lg">{currentThing["name"]}</div>
                <a href="results"><div className="select-none p-4 rounded-lg flex items-center justify-center border-2 border-indigo-500 shadow-lg">Results</div></a>
            </main>
            )
        }
    }
}
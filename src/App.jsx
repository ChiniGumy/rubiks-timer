import Scramble from "./components/Scramble";
import Buttons from "./container/Buttons";
import Timer from "./components/Timer";

function App() {
    return (
        <div className="p-24 bg-[#323437] h-screen flex flex-col items-center">

            <div className="h-[10%] flex flex-col items-center justify-start mb-16">
                <h1 className="mb-4 font-mono text-5xl text-[#e7c664]">Rubik&apos;s Timer</h1>
                <Scramble />
            </div>

            <div className="h-[50%] flex flex-col items-center justify-center">
                <Timer />
                <Buttons />
            </div>
        </div>
    );
}

export default App;
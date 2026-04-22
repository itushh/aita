import { BrowserRouter, Route, Routes } from "react-router-dom"
import Analyze from "./pages/Analyze"
import Header from "./components/Header"

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-315 px-11 fixed left-1/2 top-5 transform -translate-x-1/2 z-50 border-y border-border">
        <Header />
      </div>
      <div className="min-h-dvh max-w-300 mx-auto border-x border-border flex flex-col text-foreground font-sans pt-30">
        <Routes>
          <Route path="/" element={<div className="flex-1 flex justify-center items-center">Lander</div>} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/about" element={<div className="flex-1 flex justify-center items-center">About</div>} />
          <Route path="/contact" element={<div className="flex-1 flex justify-center items-center">Contact</div>} />
          <Route path="*" element={<div className="flex-1 flex justify-center items-center">404 | Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
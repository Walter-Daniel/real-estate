import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className=" bg-[#fafbfc] dark:bg-secondary">
        <h1>Mi primer coso</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ullam a nesciunt distinctio exercitationem, autem veniam harum quasi vitae earum quam quos ea numquam, debitis cumque necessitatibus. Quam, quia fugit?</p>
      </div>
    </div>
  )
}

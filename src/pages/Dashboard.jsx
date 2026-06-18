import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Card from "../components/Card"
import "./dashboard.css"

function Dashboard() {
    return (
        <>
            <Navbar />

            <main className="dashboard-content">
                <Card />
            </main>

            <Footer />
        </>
    )
}

export default Dashboard
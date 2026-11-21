import { Outlet } from "react-router-dom";
import Header from "../common/Header";

function MainLayout() {
    return (
        <div className="min-h-screen bg-background">

            <Header />

            <main>
                <Outlet />
            </main>

        </div>
    );
}

export default MainLayout;
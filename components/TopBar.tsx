"use client"
import { FaBars, FaSignOutAlt } from "react-icons/fa";

const TopBar = () => {
    return (
        <div className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3">
                <button
                    aria-label="toggle sidebar"
                    // onClick={() => setSidebarOpen((s) => !s)}
                    className="p-2 rounded-lg hover:bg-white/5"
                >
                    <FaBars />
                </button>
                <h2 className="text-xl font-semibold tracking-tight">BWB — Control Room</h2>
                <span className="ml-3 text-sm text-gray-400">Live FEED</span>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-right mr-3">
                    <div className="text-sm text-gray-300">Operator</div>
                    <div className="text-xs text-gray-400">Novahiwa M.</div>
                </div>
                <button
                    // onClick={() => {
                    //     setLoggedIn(false);
                    // }}
                    className="bg-white/6 px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                >
                    <FaSignOutAlt /> Sign out
                </button>
            </div>
        </div>
    );
}

export default TopBar;
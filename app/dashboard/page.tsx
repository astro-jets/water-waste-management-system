'use client'

import React, { JSX, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
    FaTachometerAlt,
    FaFlask,
    FaWaveSquare,
    FaThermometerHalf,
    FaTint,
    FaCogs,
    FaHistory,
    FaBell,
    FaFileDownload,
    FaSignOutAlt,
    FaBars,
} from "react-icons/fa";
import TopBar from "@/components/TopBar";
import MetricCard from "@/components/MetricCard";

// Single-file full UI preview for the "Scientific Control Room" dashboard.
// Designed for Next.js + TypeScript + Tailwind + Framer Motion + GSAP.
// This is a single React component that simulates multiple pages (Dashboard, Sensors, Alerts, Dosing, Reports, Settings, Login)

type Page =
    | "dashboard"
    | "sensors"
    | "alerts"
    | "dosing"
    | "reports"
    | "settings"
    | "login";

type Sensor = {
    id: string;
    name: string;
    key: string;
    value: number;
    unit: string;
    status: "normal" | "warning" | "critical";
    lastUpdated: string;
};

const initialSensors: Sensor[] = [
    { id: "ph", name: "pH Level", key: "ph", value: 7.12, unit: "", status: "normal", lastUpdated: new Date().toISOString() },
    { id: "turb", name: "Turbidity", key: "turbidity", value: 3.8, unit: "NTU", status: "normal", lastUpdated: new Date().toISOString() },
    { id: "temp", name: "Temperature", key: "temperature", value: 24.6, unit: "°C", status: "normal", lastUpdated: new Date().toISOString() },
    { id: "chlor", name: "Residual Chlorine", key: "chlorine", value: 1.18, unit: "mg/L", status: "normal", lastUpdated: new Date().toISOString() },
];

export default function ControlRoomUI(): JSX.Element {
    const [page, setPage] = useState<Page>("dashboard");
    const [sensors, setSensors] = useState<Sensor[]>(initialSensors);
    const [alerts, setAlerts] = useState<string[]>([]);
    const [dosingAuto, setDosingAuto] = useState<boolean>(false);

    // Simulate incoming sensor updates (replace later with real Socket.IO hook)
    useEffect(() => {
        const id = setInterval(() => {
            setSensors((prev) =>
                prev.map((s) => {
                    // gently vary values
                    const jitter = (Math.random() - 0.5) * (s.key === "ph" ? 0.05 : 0.25);
                    const newVal = Math.max(0, +(s.value + jitter).toFixed(2));
                    return { ...s, value: newVal, lastUpdated: new Date().toISOString() };
                })
            );

            // randomly spawn an alert for demo
            if (Math.random() > 0.985) {
                setAlerts((a) => [`Sensor anomaly detected — check dosing`, ...a].slice(0, 8));
            }
        }, 2400);
        return () => clearInterval(id);
    }, []);


    const avgPh = +(sensors.find((s) => s.key === "ph")?.value || 0).toFixed(2);
    const activeAlerts = alerts.length;

    return (
        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col gap-6">
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#071014]/50 to-[#041217]/30 border border-gray-800 flex items-center justify-between">
                            <div>
                                <div className="text-xs text-gray-400">pH (avg)</div>
                                <div className="text-3xl font-bold">{avgPh}</div>
                                <div className="text-sm text-gray-500">Last 1hour</div>
                            </div>
                            <div className="text-4xl text-emerald-300">{<FaFlask />}</div>
                        </div>

                        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#071014]/50 to-[#041217]/30 border border-gray-800 flex items-center justify-between">
                            <div>
                                <div className="text-xs text-gray-400">Active Alerts</div>
                                <div className="text-3xl font-bold">{activeAlerts}</div>
                                <div className="text-sm text-gray-500">Need attention</div>
                            </div>
                            <div className="text-4xl text-red-400">{<FaBell />}</div>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#091014]/60 border border-gray-800 min-h-[260px] flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <div className="text-sm text-gray-400">Realtime Chart</div>
                                <div className="text-xs text-gray-500">pH · Turbidity · Temperature</div>
                            </div>
                            <div className="text-xs text-gray-400">Streaming • {new Date().toLocaleTimeString()}</div>
                        </div>

                        <div className="flex-1 flex items-center justify-center text-gray-600">[Charts placeholder — integrate Recharts or Chart.js]</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {sensors.map((s) => (
                            <MetricCard key={s.id} sensor={s} />
                        ))}
                    </div>
                </div>

                <aside className="flex flex-col gap-4">
                    <div className="p-4 rounded-2xl bg-[#091014]/60 border border-gray-800 min-h-[120px]">
                        <div className="text-sm text-gray-400">Quick Controls</div>
                        <div className="mt-3 flex flex-col gap-2">
                            <button
                                onClick={() => setDosingAuto(true)}
                                className="px-4 py-2 rounded-xl bg-emerald-600/10 border border-emerald-600/30 text-emerald-300 hover:bg-emerald-600/20"
                            >
                                Start Auto Dosing
                            </button>
                            <button
                                onClick={() => setDosingAuto(false)}
                                className="px-4 py-2 rounded-xl bg-red-600/10 border border-red-600/30 text-red-300 hover:bg-red-600/20"
                            >
                                Stop Dosing
                            </button>
                            <button className="px-4 py-2 rounded-xl bg-yellow-600/10 border border-yellow-600/30 text-yellow-300 hover:bg-yellow-600/20">
                                Calibrate Sensors
                            </button>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#071014]/60 border border-gray-800 flex-1 flex flex-col">
                        <div className="text-sm text-gray-400">Alerts</div>
                        <div className="mt-3 overflow-auto flex-1">
                            {alerts.length === 0 ? (
                                <div className="text-sm text-gray-500">No active alerts ✅</div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {alerts.map((a, i) => (
                                        <div key={i} className="text-sm p-2 rounded-md bg-red-900/10 border border-red-800">
                                            {a}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </aside>
            </section>
        </motion.div>
    );
}

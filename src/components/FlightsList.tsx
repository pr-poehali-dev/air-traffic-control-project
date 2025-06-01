import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface FlightInfo {
  callSign: string;
  origin: string;
  destination: string;
  altitude: number;
  speed: number;
  status: "normal" | "warning" | "emergency" | "approaching" | "landing";
  eta: string;
  landingPermission?: boolean;
}

const FlightsList = () => {
  const [flights, setFlights] = useState<FlightInfo[]>([
    {
      callSign: "AFL1205",
      origin: "SVO",
      destination: "LED",
      altitude: 10500,
      speed: 850,
      status: "normal",
      eta: "16:45",
    },
    {
      callSign: "SU2156",
      origin: "VKO",
      destination: "KZN",
      altitude: 2800,
      speed: 420,
      status: "approaching",
      eta: "17:20",
      landingPermission: false,
    },
    {
      callSign: "DP405",
      origin: "ROV",
      destination: "SVO",
      altitude: 8200,
      speed: 780,
      status: "warning",
      eta: "15:30",
    },
    {
      callSign: "UN1848",
      origin: "AER",
      destination: "DME",
      altitude: 1500,
      speed: 380,
      status: "approaching",
      eta: "18:15",
      landingPermission: false,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlights((prev) =>
        prev.map((flight) => ({
          ...flight,
          altitude: Math.max(
            1000,
            flight.altitude + (Math.random() - 0.5) * 500,
          ),
          speed: Math.max(200, flight.speed + (Math.random() - 0.5) * 50),
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "emergency":
        return "text-red-400";
      case "warning":
        return "text-yellow-400";
      case "approaching":
        return "text-blue-400";
      case "landing":
        return "text-green-500";
      default:
        return "text-green-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "emergency":
        return "🚨";
      case "warning":
        return "⚠️";
      case "approaching":
        return "🛬";
      case "landing":
        return "✈️";
      default:
        return "✅";
    }
  };

  const handleLandingPermission = (callSign: string) => {
    setFlights((prev) =>
      prev.map((flight) =>
        flight.callSign === callSign
          ? { ...flight, status: "landing", landingPermission: true }
          : flight,
      ),
    );
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-violet-400">✈️ Активные рейсы</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left p-2 text-slate-400">Рейс</th>
                <th className="text-left p-2 text-slate-400">Маршрут</th>
                <th className="text-left p-2 text-slate-400">Высота</th>
                <th className="text-left p-2 text-slate-400">Скорость</th>
                <th className="text-left p-2 text-slate-400">Статус</th>
                <th className="text-left p-2 text-slate-400">ETA</th>
                <th className="text-left p-2 text-slate-400">Действия</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr
                  key={flight.callSign}
                  className="border-b border-slate-700 hover:bg-slate-700/50"
                >
                  <td className="p-2 font-mono text-violet-300">
                    {flight.callSign}
                  </td>
                  <td className="p-2 text-slate-300">
                    {flight.origin} → {flight.destination}
                  </td>
                  <td className="p-2 text-slate-300">
                    {flight.altitude.toFixed(0)} м
                  </td>
                  <td className="p-2 text-slate-300">
                    {flight.speed.toFixed(0)} км/ч
                  </td>
                  <td className={`p-2 ${getStatusColor(flight.status)}`}>
                    {getStatusIcon(flight.status)} {flight.status}
                  </td>
                  <td className="p-2 text-slate-300">{flight.eta}</td>
                  <td className="p-2">
                    {flight.status === "approaching" &&
                    !flight.landingPermission ? (
                      <button
                        onClick={() => handleLandingPermission(flight.callSign)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        🛬 Разрешить посадку
                      </button>
                    ) : flight.status === "landing" ? (
                      <span className="text-green-400 text-sm">
                        ✅ Посадка разрешена
                      </span>
                    ) : (
                      <span className="text-slate-500 text-sm">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightsList;

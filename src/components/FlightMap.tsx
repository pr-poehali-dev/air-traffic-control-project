import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface Flight {
  id: string;
  callSign: string;
  x: number;
  y: number;
  status: "normal" | "warning" | "emergency";
}

const FlightMap = () => {
  const [flights, setFlights] = useState<Flight[]>([
    { id: "1", callSign: "AFL1205", x: 20, y: 30, status: "normal" },
    { id: "2", callSign: "SU2156", x: 60, y: 45, status: "normal" },
    { id: "3", callSign: "DP405", x: 35, y: 70, status: "warning" },
    { id: "4", callSign: "UN1848", x: 80, y: 25, status: "normal" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlights((prev) =>
        prev.map((flight) => ({
          ...flight,
          x: Math.max(5, Math.min(95, flight.x + (Math.random() - 0.5) * 8)),
          y: Math.max(5, Math.min(95, flight.y + (Math.random() - 0.5) * 8)),
        })),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getFlightColor = (status: string) => {
    switch (status) {
      case "emergency":
        return "bg-red-500 animate-pulse";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-violet-400">🗺️ Карта полетов</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 bg-slate-900 rounded-lg border border-slate-600 overflow-hidden">
          {/* Аэропорт в центре */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center">
              🏢
            </div>
          </div>

          {/* Рейсы */}
          {flights.map((flight) => (
            <div
              key={flight.id}
              className={`absolute w-3 h-3 rounded-full transition-all duration-1000 ${getFlightColor(flight.status)}`}
              style={{
                left: `${flight.x}%`,
                top: `${flight.y}%`,
              }}
              title={flight.callSign}
            >
              <div className="absolute -top-6 -left-4 text-xs text-white bg-slate-800 px-1 rounded">
                {flight.callSign}
              </div>
            </div>
          ))}

          {/* Сетка радара */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-violet-500/10 to-transparent opacity-30"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightMap;

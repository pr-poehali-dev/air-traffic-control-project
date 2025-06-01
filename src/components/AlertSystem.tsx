import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface Alert {
  id: string;
  type: "info" | "warning" | "critical";
  message: string;
  time: string;
}

const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "warning",
      message: "Рейс DP405 запрашивает экстренную посадку",
      time: "14:23",
    },
    {
      id: "2",
      type: "info",
      message: "Погодные условия: ветер 15 км/ч",
      time: "14:20",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const emergencyMessages = [
        "Обнаружена птица в зоне взлетной полосы",
        "Техническая неисправность у рейса SU2156",
        "Метеоусловия ухудшаются",
        "Перегрузка воздушного пространства",
        "Запрос на внеочередную посадку",
      ];

      if (Math.random() < 0.3) {
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: Math.random() < 0.3 ? "critical" : "warning",
          message:
            emergencyMessages[
              Math.floor(Math.random() * emergencyMessages.length)
            ],
          time: new Date().toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setAlerts((prev) => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-l-red-500 bg-red-500/10";
      case "warning":
        return "border-l-yellow-500 bg-yellow-500/10";
      default:
        return "border-l-blue-500 bg-blue-500/10";
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-violet-400">📢 Уведомления</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded border-l-4 ${getAlertColor(alert.type)} animate-fade-in`}
          >
            <div className="flex justify-between items-start">
              <p className="text-sm text-white">{alert.message}</p>
              <span className="text-xs text-slate-400 ml-2">{alert.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AlertSystem;

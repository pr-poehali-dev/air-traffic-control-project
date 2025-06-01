import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ControlPanel = () => {
  const [rescueStatus, setRescueStatus] = useState<Record<string, boolean>>({});

  const handleRescueCall = (type: string) => {
    setRescueStatus((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setRescueStatus((prev) => ({ ...prev, [type]: false }));
    }, 3000);
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-violet-400">🚨 Экстренные службы</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => handleRescueCall("fire")}
          disabled={rescueStatus.fire}
        >
          {rescueStatus.fire ? "🚒 Пожарные в пути..." : "🚒 Вызвать пожарных"}
        </Button>

        <Button
          variant="outline"
          className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
          onClick={() => handleRescueCall("medical")}
          disabled={rescueStatus.medical}
        >
          {rescueStatus.medical ? "🚑 Медики в пути..." : "🚑 Скорая помощь"}
        </Button>

        <Button
          variant="outline"
          className="w-full border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
          onClick={() => handleRescueCall("security")}
          disabled={rescueStatus.security}
        >
          {rescueStatus.security
            ? "👮 Охрана в пути..."
            : "👮 Служба безопасности"}
        </Button>

        <Button
          variant="outline"
          className="w-full border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
          onClick={() => handleRescueCall("technical")}
          disabled={rescueStatus.technical}
        >
          {rescueStatus.technical
            ? "🔧 Техники в пути..."
            : "🔧 Техническая служба"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;

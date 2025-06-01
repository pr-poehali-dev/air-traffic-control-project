import FlightMap from "@/components/FlightMap";
import ControlPanel from "@/components/ControlPanel";
import FlightsList from "@/components/FlightsList";
import AlertSystem from "@/components/AlertSystem";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-center text-violet-400">
            🛩️ Диспетчерская аэропорта
          </h1>
          <p className="text-center text-slate-400 mt-2">
            Контролируйте воздушное движение и обеспечивайте безопасность
            полетов
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FlightMap />
          </div>

          <div className="space-y-6">
            <ControlPanel />
            <AlertSystem />
          </div>
        </div>

        <div className="mt-6">
          <FlightsList />
        </div>
      </div>
    </div>
  );
};

export default Index;

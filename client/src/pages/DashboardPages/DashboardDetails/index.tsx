import React, { useEffect } from "react";
import { DashboardStats } from "./components/DashboardStatsProps";
import { AnimalDistributionChart } from "./components/AnimalDistributionChart";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { statsThunk } from "@/features/stats/statsThunk";
import LoadingState from "@/types/LoadingState";
import LoadingSpinner from "@/components/LoadingSpinner";
import { cropTypeLabels, speciesLabels } from "./components/helpers";

const FarmDashboard: React.FC = () => {
  const { data, state } = useAppSelector(state => state.stats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(statsThunk.getStats());
  }, []);

  if (state.loading === LoadingState.PENDING) {
    return <LoadingSpinner />;
  }

  if (state.loading === LoadingState.SUCCEEDED) {
    return (
      <div className="p-6 h-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard Gospodarstwa</h1>

        {/* Górne kafelki ze statystykami */}
        <DashboardStats
          machinesCount={data.machinesCount}
          animalsCount={data.animalsCount}
          thisYearYield={data.thisYearYield}
          plantedFieldsCount={data.plantedFieldsCount}
        />

        {/* Dolne sekcje */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          <AnimalDistributionChart
            animals={data.animalsByType}
            labes={speciesLabels}
            header="Procetowa ilość zwierząt po gatunku"
          />
          <AnimalDistributionChart
            animals={data.cropsByType}
            labes={cropTypeLabels}
            header="Procetowa ilość upraw po type"
          />
        </div>
      </div>
    );
  }
};

export default FarmDashboard;

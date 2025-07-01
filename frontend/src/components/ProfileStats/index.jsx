import {Star} from 'lucide-react';
import React from 'react';


const StatsCard = ({ icon: Icon, label, value, color, type, totalPredictions }) => {
  const qualifyingPredictions = 18
  const stars = []
  for(let i = 0; i < qualifyingPredictions; i++) {
    stars.push(
      <Star key={i} color={i < totalPredictions ? "green" : "green"} fill={i < totalPredictions ? "green" : "none"} size={14}></Star>
    )
  }
  const chunkedStars = [];
  const chunkSize = 6;
  for (let i = 0; i < stars.length; i += chunkSize) {
    chunkedStars.push(stars.slice(i, i + chunkSize));
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 w-[250px] space-y-4">

      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>

        {type === "Ranking" && totalPredictions < qualifyingPredictions && (
          <div className="flex flex-wrap max-w-[96px] gap-[2px]">
            {chunkedStars.map((row, idx) => (
              <div key={idx} className="flex space-x-[2px]">
                {row}
              </div>
            ))}
          </div>
        )}
      </div>

      {type === "Ranking" ? (
        <>
          {totalPredictions < qualifyingPredictions ? (
            <p className="text-center text-sm text-slate-300">
              <span className="font-bold text-yellow-400">
                {qualifyingPredictions - totalPredictions}
              </span>{" "}
              predictions to qualify
            </p>
          ) : (
            <div className="flex flex-col items-end">
              <p className="text-slate-400 text-sm">Ranking</p>
              <p className="text-2xl font-bold text-yellow-500">{value}</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col">
          <p className="text-slate-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      )}
    </div>
  );
};

export default StatsCard
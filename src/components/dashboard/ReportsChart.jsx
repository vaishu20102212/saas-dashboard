import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function ReportsChart() {
  const points = [
    { time: '10am', value: 54, sales: '1,840' },
    { time: '11am', value: 31, sales: '1,120' },
    { time: '12am', value: 57, sales: '2,150' },
    { time: '01am', value: 35, sales: '1,420' },
    { time: '02am', value: 22, sales: '890' },
    { time: '03am', value: 49, sales: '2,678' },
    { time: '04am', value: 13, sales: '640' },
    { time: '05am', value: 34, sales: '1,320' },
    { time: '06am', value: 67, sales: '2,910' },
    { time: '07am', value: 55, sales: '3,100' },
  ];

  const [activeIdx, setActiveIdx] = useState(5); // 03am is index 5

  const getX = (i) => 45 + i * 53;
  const getY = (val) => 205 - (val / 100) * 175;

  // Build smooth bezier path
  let pathD = `M ${getX(0)} ${getY(points[0].value)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const x0 = getX(i);
    const y0 = getY(points[i].value);
    const x1 = getX(i + 1);
    const y1 = getY(points[i + 1].value);
    const mx = (x0 + x1) / 2;
    pathD += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }

  const activePoint = points[activeIdx];
  const activeX = getX(activeIdx);
  const activeY = getY(activePoint.value);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xs border border-gray-100/60 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-[#1E1B3A]">Reports</h2>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="relative w-full aspect-[2.4/1] min-h-[220px]">
        {/* Tooltip Card matching screenshot */}
        {activePoint && (
          <div
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(activeX / 600) * 100}%`,
              top: `${(activeY / 240) * 100 - 4}%`,
            }}
          >
            <div className="bg-[#0B132B] text-white px-3.5 py-1.5 rounded-xl shadow-xl flex flex-col items-center">
              <span className="text-[10px] text-gray-300 font-medium">Sales</span>
              <span className="text-xs font-bold tracking-wide">{activePoint.sales}</span>
              {/* Tooltip caret */}
              <div className="w-2 h-2 bg-[#0B132B] transform rotate-45 -mb-1 mt-0.5" />
            </div>
          </div>
        )}

        <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="reportsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5BC4FF" />
              <stop offset="50%" stopColor="#A58BFF" />
              <stop offset="100%" stopColor="#F052E8" />
            </linearGradient>

            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5BC4FF" stopOpacity="0.035" />
              <stop offset="100%" stopColor="#F052E8" stopOpacity="0.035" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 20, 40, 60, 80, 100].map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1="35"
                  y1={y}
                  x2="590"
                  y2={y}
                  stroke="#F1F3F9"
                  strokeWidth="1"
                />
                <text
                  x="15"
                  y={y + 4}
                  fontSize="11"
                  fill="#A0A5BA"
                  textAnchor="start"
                  fontFamily="inherit"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Dotted guideline for active point */}
          <line
            x1={activeX}
            y1={activeY}
            x2={activeX}
            y2={getY(0)}
            stroke="#6366F1"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Area under curve */}
          <path
            d={`${pathD} L ${getX(points.length - 1)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`}
            fill="url(#areaGradient)"
          />

          {/* The smooth spline curve */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#reportsGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Emphasize the points shown in the reference chart. */}
          {points.map((p, idx) => {
            const px = getX(idx);
            const py = getY(p.value);
            const isSelected = idx === activeIdx;
            const showMarker = idx === 5 || isSelected || [2, 3, 7, 8].includes(idx);

            return (
              <g
                key={idx}
                className="cursor-pointer group"
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
              >
                <circle cx={px} cy={py} r="14" fill="transparent" />

                {showMarker && (
                  <circle
                    cx={px}
                    cy={py}
                    r={isSelected ? "6" : "4.5"}
                    fill="white"
                    stroke="#A58BFF"
                    strokeWidth="2.5"
                    className="transition-all duration-200"
                  />
                )}
              </g>
            );
          })}

          {/* X Axis labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={getX(idx)}
              y="230"
              fontSize="11"
              fill={idx === activeIdx ? "#1E1B3A" : "#A0A5BA"}
              fontWeight={idx === activeIdx ? "600" : "400"}
              textAnchor="middle"
              fontFamily="inherit"
            >
              {p.time}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

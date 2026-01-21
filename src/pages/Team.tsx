import React from 'react';
import { organizationData, Section } from '../data/organizationData';

interface TeamProps { activeSectionId: string; setActiveSectionId: (id: string) => void; }

export const Team: React.FC<TeamProps> = ({ activeSectionId, setActiveSectionId }) => {
  const section = organizationData.sections.find((s: Section) => s.id === activeSectionId) || organizationData.sections[0];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#448a76] to-[#5a7a54] rounded-xl p-8 text-white">
        <p className="text-sm opacity-80">Director</p>
        <h3 className="text-4xl font-black">{organizationData.director.name}</h3>
      </div>
      <div className="flex border-b-2 overflow-x-auto">
        {organizationData.sections.map((s: Section) => (
          <button key={s.id} onClick={() => setActiveSectionId(s.id)} 
            className={`px-10 py-4 font-black text-sm ${activeSectionId === s.id ? "text-[#448a76] border-b-4 border-[#448a76]" : "text-slate-400"}`}>
            {s.id}
          </button>
        ))}
      </div>
      <div className="bg-white p-8 rounded-xl border border-[#e2ece9]">
        <h4 className="text-2xl font-black">{section.id} Section (SMG: {section.smg})</h4>
        <p className="mt-4 text-slate-600">{section.desc}</p>
      </div>
    </div>
  );
};
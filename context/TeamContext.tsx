import { Member } from "@/types/Member";
import React, { createContext, useContext, useState } from "react";

type TeamContextType = {
  members: Member[];
  addMember: (member: Member) => void;
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [members, setMembers] = useState<Member[]>([]);

  const addMember = (newMember: Member) => {
    setMembers((prev) => [...prev, newMember]);
  };

  return (
    <TeamContext.Provider value={{ members, addMember }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error("useTeam must be used within TeamProvider");
  return context;
};

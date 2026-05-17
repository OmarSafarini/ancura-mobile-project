import { IDoctor } from "@/types/IDoctor";
import React, { createContext, useContext, useMemo, useState } from "react";


type DoctorContextType = {
  doctorData: Partial<IDoctor>;
  setDoctorData: React.Dispatch<
    React.SetStateAction<Partial<IDoctor>>
  >;
};

const DoctorContext = createContext<DoctorContextType | null>(null);

export function DoctorProvider({ children }: any) {
  const [doctorData, setDoctorData] = useState<Partial<IDoctor>>({});
     const value = useMemo(
    () => ({
      doctorData,
      setDoctorData,
    }),
    [doctorData]
  );
  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctor() {
  const context = useContext(DoctorContext);

  if (!context) {
    throw new Error("useDoctor must be used within DoctorProvider");
  }

  return context;
}
import React from "react";
import { useNavigate } from "react-router-dom";

export function EmployeeLanding() {
  const navigate = useNavigate();

  return (
    <main className="flex-1 flex flex-col justify-center items-center text-center">
      <div className="px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenue dans la Gestion des Employés
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Simplifiez la gestion de votre équipe avec notre plateforme intuitive. 
          Accédez rapidement aux informations sur vos employés et suivez leur évolution.
        </p>
        <button
          onClick={() => navigate("/dashboard/employees")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
        >
          Découvrir la liste des employés
        </button>
      </div>
    </main>
  );
}

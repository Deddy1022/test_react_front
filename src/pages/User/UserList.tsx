import { Pagination, PaginationContent } from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { ChangeEvent, useState } from "react";
import apiClient from "@/intercceptor/tokenInterceptor";
import { TUser, UserStateType } from "@/core/types/TUser";
import { generatePaginationLinks } from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

export default function UserList() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [input, setInput] = useState({
    username: ''
  });

  const [filteredEmp, setFilteredEmp] = useState<TUser[]>([]);

  const { isError, isPending, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await apiClient.get<UserStateType>(`/api/users`);
      setFilteredEmp(response.data.data);
      return response.data.data;
    },
  });

  const formatUserName = (username: string): string => {
    return username
      .split(".")
      .map((user) => user[0].toUpperCase() + user.slice(1))
      .join(" ");
  };

  const table = useReactTable({
    data: filteredEmp || [],
    columns: [
      {
        header: "Index",
        accessorFn: (_row, index) => index + 1,
        id: "index",
      },
      {
        header: "Nom d’utilisateur",
        accessorFn: (row) => formatUserName(row!.username),
        id: "username",
      },
    ],
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: data ? Math.ceil(data.length / pagination.pageSize) : 0,
    manualPagination: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSearch = () => {
    const searchData = filteredEmp.filter(emp => emp.username.toLowerCase().includes(input.username.toLowerCase()));
    setFilteredEmp(searchData);
  };

  if (isPending)
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (isError)
    return (
      <div className="w-full p-4 text-center text-red-500">
        Une erreur est survenue lors du chargement des données.
      </div>
    );

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 p-5">
      <div className="p-4 flex justify-between items-center">
        <div className='flex items-center gap-2'>
          <Input 
            onChange={handleInputChange} 
            value={input.username} 
            name='username' 
            placeholder='Nom' 
          />
          <Button 
            onClick={handleSearch}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Rechercher
          </Button>
        </div>
        <Link
          to="/dashboard/employees/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Ajouter
        </Link>
      </div>
      <div className="flex flex-col gap-3 justify-center">
        {table.getRowModel().rows.map((row) => (
          <div key={row.id} className="flex justify-between items-center rounded-lg shadow-sm p-4 w-full">
            <span>{row.getValue("index")}</span>
            <span>{row.getValue("username")}</span>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-700 mb-2 md:mb-0">
            Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
          </div>
          
          <Pagination>
            <PaginationContent>
              {generatePaginationLinks<TUser>(table, pagination)}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

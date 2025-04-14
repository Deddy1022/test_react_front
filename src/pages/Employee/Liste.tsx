import Modal from '@/components/shared/Dialog';
import { generatePaginationLinks } from '@/components/shared/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createColumns } from '@/core/data/columns';
import { EmployeeStateType, TEmployees } from '@/core/types/TEmployees';
import { useNotification } from '@/hooks/NotificationContext';
import apiClient from '@/intercceptor/tokenInterceptor';
import { useMutation, useQuery } from '@tanstack/react-query';
import { 
  flexRender, 
  getCoreRowModel, 
  getPaginationRowModel, 
  useReactTable, 
  PaginationState 
} from '@tanstack/react-table';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ListeEmploye() {
  const navigate = useNavigate();
  const { showNotification } = useNotification()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [totalPages, setTotalPages] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [input, setInput] = useState({
    firstname: '',
    lastname: ''
  });
  const [searchQuery, setSearchQuery] = useState({
    firstname: '',
    lastname: ''
  });

  const { isError, isPending, data, refetch } = useQuery({
    queryKey: ['employees', pagination.pageIndex, searchQuery],
    queryFn: async () => {
      const response = await apiClient
        .get<EmployeeStateType>(
          `/api/employees?page=${pagination.pageIndex}&firstName=${searchQuery.firstname}&lastName=${searchQuery.lastname}`
        );
      const { items, totalPages: pages } = response.data.data;
      setTotalPages(pages);
      return items;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async(id: string) => {
      await apiClient.delete(`api/employees/${id}`);
      refetch()
    },
    onSuccess() {
      showNotification('success', 'Données supprimées définitivement')
    },
    onError() {
      showNotification('warning', 'Impossible d\'effectuer cette opération');
    }
  });

  const columns = createColumns<TEmployees>(
    [
      { accessorKey: 'firstName', header: 'Nom' },
      { accessorKey: 'lastName', header: 'Prénom' },
      { accessorKey: 'dateOfBirth', header: 'Date de Naissance' },
      { accessorKey: 'entryDate', header: "Date d'entrée" },
      { accessorKey: 'exitDate', header: 'Date de sortie' },
    ],
    {
      onUpdate: (employee) => handleUpdateEmployee(employee),
      onDelete: (id) => {
        setSelectedItem(id);
        setIsModalOpen(true);
      },
    }
  );

  const handleUpdateEmployee = (employee: TEmployees) => {
    navigate(`/dashboard/employees/update/${employee.id}`, { state: data!.filter(emp => emp.id === employee.id)[0] });
  };

  const handleDeleteEmployee = (id: string) => {
    mutate(id);
    setIsModalOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSearch = () => {
    setSearchQuery(input);
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: totalPages,
    manualPagination: true,
  });

  const headers = table.getHeaderGroups().map((headerGroup) => (
    <TableRow key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <TableHead key={header.id} className="text-gray-600 text-left bg-gray-200 p-4">
          {header.column.columnDef.header?.toString()}
        </TableHead>
      ))}
    </TableRow>
  ));

  const content = table.getRowModel().rows.map((row) => (
    <TableRow key={row.id} className="hover:bg-gray-100">
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="p-4">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));

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
    <>
      <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirmation de suppression"
          onConfirm={() => handleDeleteEmployee(selectedItem)}
        >
        <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
      </Modal>

      <div className='w-full'>
        <div className='text-center'>
          <h2>Gestion des Employé(e)s</h2>
        </div>
        <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-lg">
          <div className="p-4 flex justify-between items-center">
            <div className='flex items-center gap-2'>
              <Input 
                onChange={handleInputChange} 
                value={input.firstname} 
                name='firstname' 
                placeholder='Nom' 
              />
              <Input 
                onChange={handleInputChange} 
                value={input.lastname} 
                name='lastname' 
                placeholder='Prénom' 
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
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>{headers}</TableHeader>
              <TableBody>
                {content.length > 0 ? (
                  content
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-8">
                      Aucun employé trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-700 mb-2 md:mb-0">
                Page {pagination.pageIndex + 1} sur {totalPages || 1}
              </div>

              <Pagination>
                <PaginationContent>
                  {generatePaginationLinks<TEmployees>(table, pagination)}
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
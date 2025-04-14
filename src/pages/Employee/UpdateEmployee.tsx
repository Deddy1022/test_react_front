import { ErrorMessage } from "@/components/error/errorMessage";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TEmployees } from "@/core/types/TEmployees";
import { employeeSchema } from "@/core/Validations/EmployeeValidation";
import { useNotification } from "@/hooks/NotificationContext";
import apiClient from "@/intercceptor/tokenInterceptor";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { ValidationError } from "yup";

export default function UpdateEmployee() {
  const location = useLocation(); 
  const { showNotification } = useNotification();
  const [errors, setErrors] = useState<TEmployees>({} as TEmployees);
  const navigate = useNavigate()
  const employee = location.state;

  const { mutate } = useMutation({
    mutationFn: async(employee: TEmployees) => {
      try {
        await apiClient.put(`/api/employees/${employee.id}`, employee);
        return true;
      } catch (error) {
        const Errors = Object.create(null);
        (error as ValidationError).inner.forEach(err => {
          Errors[err.path!] = err.message;
        });
        setErrors(Errors);
      }
    },
    onSuccess() {
      showNotification('success', 'Données modifiées');
      navigate(-1);
    },
    onError() {
      showNotification('error', 'Un problème d\'effectuer cette opération')
    }
  })
  
  
  const form = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues: employee
    
  });

  const triggerSubmit = (data: TEmployees) => {
    mutate(data);
  }

  
  return (
      <Card className=" flex flex-col justify-center">
        <CardHeader className="text-14 font-semibold">Modifier employé(e)</CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(triggerSubmit)}>
              <FormField
                // control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    { errors.firstName && (<ErrorMessage errMessage={ errors.firstName } />) }
                  </FormItem>
                )}
              />
              <FormField
                // control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre prénom" {...field} />
                    </FormControl>
                    { errors.lastName && (<ErrorMessage errMessage={ errors.lastName } />) }
                  </FormItem>
                )}
              />
              <FormField
                // control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de naissance</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Entrez votre date de naissance" {...field} />
                    </FormControl>
                    { errors.dateOfBirth && (<ErrorMessage errMessage={ errors.dateOfBirth.toString() } />) }
                  </FormItem>
                )}
              />
              <FormField
                // control={form.control}
                name="entryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de naissance</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Entrez votre arrivé" {...field} />
                    </FormControl>
                    { errors.entryDate && (<ErrorMessage errMessage={ errors.entryDate.toString() } />) }
                  </FormItem>
                )}
              />
              <FormField
                // control={form.control}
                name="exitDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de sortie</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Entrez votre date de sortie" {...field} />
                    </FormControl>
                    { errors.exitDate && (<ErrorMessage errMessage={ errors.exitDate.toString() } />) }
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-center">
                <Button 
                  className="bg-blue-500 w-[40%] rounded-2xl" type="submit">
                    ENREGISTRER
                  </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
  )
}

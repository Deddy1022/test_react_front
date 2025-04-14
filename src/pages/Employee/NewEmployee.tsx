import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { employeeSchema } from "@/core/Validations/EmployeeValidation";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TEmployees } from "@/core/types/TEmployees";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/intercceptor/tokenInterceptor";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ValidationError } from "yup";
import { ErrorMessage } from "@/components/error/errorMessage";
import { useNotification } from "@/hooks/NotificationContext";

export function NewEmploye() {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [errors, setErrors] = useState<TEmployees>({} as TEmployees);
  const form = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(''),
      entryDate: new Date(''),
      exitDate: new Date(''),
    }
    
  });

  const { mutate } = useMutation({
    mutationFn: async(data: Partial<TEmployees>) => {
      try {
        await employeeSchema.validate(data, { abortEarly: false })
        await apiClient.post(`/api/employees`, data);
      } catch (error) {
        const Errors = Object.create(null);
        (error as ValidationError).inner.forEach(err => {
          Errors[err.path!] = err.message
        });
        setErrors(Errors);
        throw error
      }
    },
    onSuccess() {
      showNotification('success', 'Employé(e) ajouté(e)');
      navigate(-1);
    },
    onError() {
      showNotification('error', 'Un problème dans l\'insertion des données')
    }
  })

  const addEmp = (employee: TEmployees) => {
    mutate(employee);
  }
  return (
      <Card className="w-full flex flex-col justify-center">
        <CardHeader>Ajout de nouvel employé(e)</CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(addEmp)}>
              <FormField
                // control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez votre nom" {...field} />
                    </FormControl>
                    { errors.firstName && (<ErrorMessage errMessage={ errors.firstName } />) }
                    <FormMessage />
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
                      <Input placeholder="Entrez votre prénom" {...field} />
                    </FormControl>
                    { errors.lastName && (<ErrorMessage errMessage={ errors.lastName } />) }
                    <FormMessage />
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
                    <FormMessage />
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
                      <Input type="date" placeholder="Entrez votre date d'arrivée" {...field} />
                    </FormControl>
                    { errors.entryDate && (<ErrorMessage errMessage={ errors.entryDate.toString() } />) }
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                // control={form.control}
                name="exitDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de naissance</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Entrez votre date de sortie" {...field} />
                    </FormControl>
                    { errors.exitDate && (<ErrorMessage errMessage={ errors.exitDate.toString() } />) }
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-center">
                <Button className="bg-blue-500 w-[40%] rounded-2xl" type="submit">ENREGISTRER</Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
  )
}
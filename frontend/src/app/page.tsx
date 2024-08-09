"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import InvoiceCard from "@/components/InvoiceCard";
import axios from "axios";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);

  const fetchAllInvoices = async () => {
    try {
      const response = await axios.get("/api/getAllInvoices");
      if (response.status === 200) {
        setInvoiceData(response.data.data.data);
        console.log(response.data.data.data);
      }
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchAllInvoices();
  }, []);

  const formSchema = z.object({
    customerName: z.string().min(2, {
      message: "Customer name must be at least 2 characters.",
    }),
    invoiceNumber: z.string().min(2, {
      message: "Invoice number must be at least 2 characters.",
    }),
    date: z.string().nonempty({
      message: "Date cannot be empty",
    }),
    totalAmount: z.number().default(0),
    paymentStatus: z.string().nonempty({
      message: "Payment Status cannot be empty",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      invoiceNumber: "",
      date: "",
      totalAmount: 0,
      paymentStatus: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsDialogOpen(false);
  }

  return (
    <main className="p-4 md:p-5">
      <div>
        <h1 className="mb-4 text-3xl font-bold">Invoice Management System</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <div className="p-4 text-center text-white rounded-tl-lg rounded-tr-lg bg-dark-green">
              <p className="text-base">Total Invoices</p>
            </div>
            <div className="p-4 text-center text-white rounded-bl-lg rounded-br-lg bg-light-green">
              <h2 className="mb-2 text-2xl font-bold">{invoiceData?.length}</h2>
            </div>
          </div>

          <div>
            <div className="p-4 text-center text-white rounded-tl-lg rounded-tr-lg bg-dark-green">
              <p className="text-base">Paid Invoices</p>
            </div>
            <div className="p-4 text-center text-white rounded-bl-lg rounded-br-lg bg-light-green">
              <h2 className="mb-2 text-2xl font-bold">10</h2>
            </div>
          </div>

          <div>
            <div className="p-4 text-center text-white rounded-tl-lg rounded-tr-lg bg-dark-green">
              <p className="text-base">Unpaid Invoices</p>
            </div>
            <div className="p-4 text-center text-white rounded-bl-lg rounded-br-lg bg-light-green">
              <h2 className="mb-2 text-2xl font-bold">10</h2>
            </div>
          </div>

          <div></div>
        </div>

        <div className="my-8 border-t border-gray-400"></div>

        <h1 className="mb-4 text-3xl font-bold">Your Invoices</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="flex gap-2 items-center justify-center px-4 py-2 bg-dark-green rounded-md hover:cursor-pointer hover:bg-dark-green/90">
            <p className="text-base font-bold text-white">Create new Invoice</p>
            <BsFileEarmarkPlusFill className="w-5 h-5 text-white" />
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader className="gap-0">
              <DialogTitle className="text-xl font-bold">
                Create Form
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Create a new form to start collecting responses
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Customer Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the customer name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-color-bright-red" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Invoice Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the Invoice Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-color-bright-red" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Date</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the Date" {...field} />
                      </FormControl>
                      <FormMessage className="text-color-bright-red" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Total Amount
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the Total Amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-color-bright-red" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Payment Status
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the Payment Status"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-color-bright-red" />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <div className="my-8 border-t border-gray-400"></div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {invoiceData?.map((invoice: any) => (
            <InvoiceCard
              key={invoice.id}
              id={invoice.id}
              customerName={invoice.customerName}
              invoiceNumber={invoice.invoiceNumber}
              dateCreated={invoice.date}
              paymentStatus={invoice.paymentStatus}
              files={[
                {
                  fileName: "invoice1",
                  filePath: "https://tersoo.netlify.app/",
                },
                {
                  fileName: "invoice2",
                  filePath: "https://tersoo.netlify.app/",
                },
              ]}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

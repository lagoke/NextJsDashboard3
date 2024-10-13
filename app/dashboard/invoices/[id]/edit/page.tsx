import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
//import { GetServerSideProps } from 'next';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};
 

/*interface PageProps {
  params: { id: string };
}
*/



interface PageProps {
  params: Promise<{ id: string }>;
}


//export default async function Page({ params }: { params: { id: string } }) {

//export default function EditInvoicePage({ params }: PageProps) {

//export default async function Page({ params }: PageProps) {

export default async function Page({ params }: PageProps) {

    //const id = params.id;

    //const { id } = params;

    const { id } = await params; // await the params if they are a promise

    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
      ]);

      if (!invoice) {
        notFound();
      }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}


import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CommissionTable() {
  return (
    <section id="comisiones" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Tabla de Comisiones</h2>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableCaption>La comisión se calcula automáticamente según el monto enviado.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Monto enviado (WLD)</TableHead>
                <TableHead className="w-1/2">Comisión aplicada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">1 – 10</TableCell>
                <TableCell>35%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">11 – 20</TableCell>
                <TableCell>30%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">21 – 30</TableCell>
                <TableCell>25%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Más de 30</TableCell>
                <TableCell>20%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}

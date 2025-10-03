import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Store, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import PedidoForm from '@/components/PedidoForm';
import InventarioControl from '@/components/InventarioControl';

const Vendedor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    toast.success('Sesión cerrada exitosamente');
    navigate('/login');
  };

  // Datos para gráficos
  const ventasPorCategoria = [
    { name: 'Electrónica', value: 1250000, cantidad: 28 },
    { name: 'Ropa', value: 680000, cantidad: 35 },
    { name: 'Alimentos', value: 920000, cantidad: 42 },
    { name: 'Hogar', value: 580000, cantidad: 18 },
    { name: 'Otros', value: 320000, cantidad: 12 },
  ];

  const comparacionMensual = [
    { mes: 'Ene', ventas: 32, monto: 2150000 },
    { mes: 'Feb', ventas: 38, monto: 2420000 },
    { mes: 'Mar', ventas: 45, monto: 2850000 },
    { mes: 'Abr', ventas: 42, monto: 2650000 },
    { mes: 'May', ventas: 52, monto: 3750000 },
  ];

  const saldoCuenta = [
    { fecha: '01/Ene', saldo: 1200000 },
    { fecha: '15/Ene', saldo: 1650000 },
    { fecha: '01/Feb', saldo: 1450000 },
    { fecha: '15/Feb', saldo: 1880000 },
    { fecha: '01/Mar', saldo: 2150000 },
    { fecha: '15/Mar', saldo: 2420000 },
  ];

  const pedidosGanados = [
    { id: 1, cliente: 'Empresa XYZ S.A.', producto: 'Laptop Dell x10', monto: 5200000, fecha: '2025-10-01', estado: 'Aprobado' },
    { id: 2, cliente: 'Tech Corp', producto: 'Monitores LG 24" x15', monto: 3850000, fecha: '2025-10-02', estado: 'En Proceso' },
    { id: 3, cliente: 'Office Solutions', producto: 'Sillas Ergonómicas x20', monto: 2780000, fecha: '2025-10-03', estado: 'Aprobado' },
    { id: 4, cliente: 'Retail Plus', producto: 'Tablets Samsung x25', monto: 4120000, fecha: '2025-09-28', estado: 'Completado' },
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-CO')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Store className="w-8 h-8 text-success" />
            <div>
              <h1 className="text-2xl font-bold text-success">Panel de Vendedor</h1>
              <p className="text-sm text-muted-foreground">Sistema de Gestión de Ventas</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard">Visualización de Ventas</TabsTrigger>
            <TabsTrigger value="actividad">Seguimiento de Actividad</TabsTrigger>
            <TabsTrigger value="inventario">Control de Inventario</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Ventas</CardTitle>
                  <Store className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">135</div>
                  <p className="text-xs text-muted-foreground">+18% desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(3750000)}</div>
                  <p className="text-xs text-muted-foreground">Mes actual</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saldo en Cuenta</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(2420000)}</div>
                  <p className="text-xs text-muted-foreground">Actualizado hoy</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ventas por Categoría</CardTitle>
                  <CardDescription>Distribución de ventas según tipo de producto</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ventasPorCategoria}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ventasPorCategoria.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Comparación Mensual</CardTitle>
                  <CardDescription>Ventas y montos por mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={comparacionMensual}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Bar dataKey="monto" fill="hsl(var(--chart-2))" name="Monto ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Evolución del Saldo de Cuenta</CardTitle>
                <CardDescription>Saldo acumulado a lo largo del tiempo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={saldoCuenta}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="saldo" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Saldo ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pedidos Ganados</CardTitle>
                <CardDescription>Resumen de ventas aprobadas y en proceso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Cliente</th>
                        <th className="text-left p-4">Producto</th>
                        <th className="text-right p-4">Monto</th>
                        <th className="text-left p-4">Fecha</th>
                        <th className="text-left p-4">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidosGanados.map((pedido) => (
                        <tr key={pedido.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">{pedido.cliente}</td>
                          <td className="p-4">{pedido.producto}</td>
                          <td className="text-right p-4 font-medium">{formatCurrency(pedido.monto)}</td>
                          <td className="p-4">{pedido.fecha}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              pedido.estado === 'Aprobado' ? 'bg-success/10 text-success' :
                              pedido.estado === 'Completado' ? 'bg-primary/10 text-primary' :
                              'bg-yellow-500/10 text-yellow-600'
                            }`}>
                              {pedido.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actividad">
            <PedidoForm userType="vendedor" />
          </TabsContent>

          <TabsContent value="inventario">
            <InventarioControl userType="vendedor" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Vendedor;

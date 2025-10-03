import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Package, AlertTriangle, Check } from 'lucide-react';
import { toast } from 'sonner';

interface InventarioControlProps {
  userType: 'comprador' | 'vendedor';
}

interface ProductoInventario {
  id: number;
  nombre: string;
  categoria: string;
  cantidad: number;
  minimo: number;
  precio: number;
  estado: 'disponible' | 'bajo' | 'agotado';
}

const InventarioControl = ({ userType }: InventarioControlProps) => {
  const [productos, setProductos] = useState<ProductoInventario[]>([
    { id: 1, nombre: 'Laptop Dell Inspiron', categoria: 'Electrónica', cantidad: 15, minimo: 10, precio: 2500000, estado: 'disponible' },
    { id: 2, nombre: 'Monitor LG 27"', categoria: 'Electrónica', cantidad: 8, minimo: 10, precio: 980000, estado: 'bajo' },
    { id: 3, nombre: 'Teclado Mecánico', categoria: 'Accesorios', cantidad: 25, minimo: 15, precio: 320000, estado: 'disponible' },
    { id: 4, nombre: 'Mouse Inalámbrico', categoria: 'Accesorios', cantidad: 3, minimo: 20, precio: 85000, estado: 'bajo' },
    { id: 5, nombre: 'Audífonos Bluetooth', categoria: 'Accesorios', cantidad: 0, minimo: 10, precio: 150000, estado: 'agotado' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    categoria: '',
    cantidad: '',
    minimo: '',
    precio: ''
  });

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('es-CO')}`;
  };

  const handleAgregarProducto = () => {
    if (!nuevoProducto.nombre || !nuevoProducto.categoria || !nuevoProducto.cantidad || !nuevoProducto.minimo || !nuevoProducto.precio) {
      toast.error('Por favor complete todos los campos');
      return;
    }

    const cantidad = parseInt(nuevoProducto.cantidad);
    const minimo = parseInt(nuevoProducto.minimo);
    const estado: 'disponible' | 'bajo' | 'agotado' = 
      cantidad === 0 ? 'agotado' : 
      cantidad < minimo ? 'bajo' : 
      'disponible';

    const producto: ProductoInventario = {
      id: productos.length + 1,
      nombre: nuevoProducto.nombre,
      categoria: nuevoProducto.categoria,
      cantidad: cantidad,
      minimo: minimo,
      precio: parseInt(nuevoProducto.precio),
      estado: estado
    };

    setProductos([...productos, producto]);
    setNuevoProducto({ nombre: '', categoria: '', cantidad: '', minimo: '', precio: '' });
    setOpenDialog(false);
    toast.success('Producto agregado al inventario');
  };

  const productosQueFaltan = productos.filter(p => p.estado === 'bajo' || p.estado === 'agotado');

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return <Badge className="bg-success/10 text-success hover:bg-success/20"><Check className="w-3 h-3 mr-1" />Disponible</Badge>;
      case 'bajo':
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"><AlertTriangle className="w-3 h-3 mr-1" />Stock Bajo</Badge>;
      case 'agotado':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Agotado</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productos.length}</div>
            <p className="text-xs text-muted-foreground">En inventario</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productos.filter(p => p.estado === 'bajo').length}</div>
            <p className="text-xs text-muted-foreground">Requieren reabastecimiento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agotados</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productos.filter(p => p.estado === 'agotado').length}</div>
            <p className="text-xs text-muted-foreground">Sin stock disponible</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Inventario Completo</CardTitle>
              <CardDescription>Listado de todos los productos en stock</CardDescription>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Producto
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Nuevo Producto</DialogTitle>
                  <DialogDescription>
                    Agregue un nuevo producto al inventario
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre del Producto</Label>
                    <Input
                      id="nombre"
                      value={nuevoProducto.nombre}
                      onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoría</Label>
                    <Input
                      id="categoria"
                      value={nuevoProducto.categoria}
                      onChange={(e) => setNuevoProducto({...nuevoProducto, categoria: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cantidad">Cantidad</Label>
                      <Input
                        id="cantidad"
                        type="number"
                        value={nuevoProducto.cantidad}
                        onChange={(e) => setNuevoProducto({...nuevoProducto, cantidad: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minimo">Stock Mínimo</Label>
                      <Input
                        id="minimo"
                        type="number"
                        value={nuevoProducto.minimo}
                        onChange={(e) => setNuevoProducto({...nuevoProducto, minimo: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="precio">Precio ($)</Label>
                    <Input
                      id="precio"
                      type="number"
                      value={nuevoProducto.precio}
                      onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})}
                    />
                  </div>
                  <Button onClick={handleAgregarProducto} className="w-full">
                    Agregar Producto
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Stock Mínimo</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productos.map((producto) => (
                  <TableRow key={producto.id}>
                    <TableCell className="font-medium">{producto.nombre}</TableCell>
                    <TableCell>{producto.categoria}</TableCell>
                    <TableCell className="text-right">{producto.cantidad}</TableCell>
                    <TableCell className="text-right">{producto.minimo}</TableCell>
                    <TableCell className="text-right">{formatCurrency(producto.precio)}</TableCell>
                    <TableCell>{getEstadoBadge(producto.estado)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Productos que Faltan</CardTitle>
          <CardDescription>
            Lista de productos con stock bajo o agotado que requieren reabastecimiento
          </CardDescription>
        </CardHeader>
        <CardContent>
          {productosQueFaltan.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Check className="w-12 h-12 mx-auto mb-2 text-success" />
              <p>No hay productos con stock bajo o agotado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Cantidad Actual</TableHead>
                    <TableHead className="text-right">Cantidad Necesaria</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productosQueFaltan.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell className="font-medium">{producto.nombre}</TableCell>
                      <TableCell>{producto.categoria}</TableCell>
                      <TableCell className="text-right">{producto.cantidad}</TableCell>
                      <TableCell className="text-right">{producto.minimo - producto.cantidad}</TableCell>
                      <TableCell>{getEstadoBadge(producto.estado)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventarioControl;
